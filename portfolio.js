// Function to fetch JSON data
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return null;
    }
}

// Function to load all data
async function loadAllData() {
    const personal = await fetchData('./assets/personal.json');
    const skills = await fetchData('./assets/skills.json');
    const experience = await fetchData('./assets/experience.json');
    const projects = await fetchData('./assets/projects.json');
    const contact = await fetchData('./assets/contact.json');

    if (personal) populatePersonalInfo(personal);
    if (skills) populateSkills(skills);
    if (experience) populateExperience(experience);
    if (projects) populateProjects(projects);
    if (contact) populateContact(contact);

    // Set footer copyright
    document.getElementById('footer-copyright').textContent = `© ${new Date().getFullYear()} ${personal ? personal.name : 'Portfolio'}. All rights reserved.`;
}

// Function to populate personal information
function populatePersonalInfo(data) {
    // Set name in navigation and hero section
    document.getElementById('nav-name').textContent = data.name;
    document.getElementById('hero-name').textContent = data.name;
    document.getElementById('hero-title').textContent = data.title;
    
    // Set about text
    document.getElementById('about-text').textContent = data.about;
    
    // Set profile image if available
    if (data.photo) {
        document.getElementById('hero-image').innerHTML = `<img src="${data.photo}" alt="${data.name}" class="w-full h-full object-cover rounded-full">`;
    }
    
    // Populate education
    const educationContainer = document.getElementById('education-items');
    educationContainer.innerHTML = '';
    
    data.education.forEach(edu => {
        const eduElement = document.createElement('div');
        eduElement.className = 'border-l-4 border-blue-500 pl-4';
        eduElement.innerHTML = `
            <h4 class="text-xl font-semibold text-gray-800">${edu.degree}</h4>
            <p class="text-blue-600">${edu.institution}, ${edu.location}</p>
            <p class="text-gray-500">${edu.duration}</p>
            <p class="text-gray-600 mt-2">${edu.description}</p>
        `;
        educationContainer.appendChild(eduElement);
    });
}

// Function to populate skills
function populateSkills(data) {
    // Populate technical skills
    const technicalContainer = document.getElementById('technical-skills-container');
    technicalContainer.innerHTML = '';
    
    data.technical_skills.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'bg-white p-6 rounded-lg shadow-md';
        
        let skillsHtml = '';
        category.skills.forEach(skill => {
            skillsHtml += `<span class="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">${skill}</span>`;
        });
        
        categoryElement.innerHTML = `
            <h3 class="text-xl font-semibold text-gray-800 mb-4">${category.category}</h3>
            <div class="flex flex-wrap">${skillsHtml}</div>
        `;
        
        technicalContainer.appendChild(categoryElement);
    });
    
    // Populate soft skills
    const softSkillsContainer = document.getElementById('soft-skills-container');
    softSkillsContainer.innerHTML = '';
    
    data.soft_skills.forEach(skill => {
        const skillElement = document.createElement('span');
        skillElement.className = 'inline-block bg-indigo-100 text-indigo-700 rounded-full px-4 py-2 text-base font-semibold';
        skillElement.textContent = skill;
        softSkillsContainer.appendChild(skillElement);
    });
}

// Function to populate experience
function populateExperience(data) {
    const timelineContainer = document.getElementById('experience-timeline');
    timelineContainer.innerHTML = '';
    
    data.work_experience.forEach((job, index) => {
        const isEven = index % 2 === 0;
        const jobElement = document.createElement('div');
        jobElement.className = 'relative';
        
        // Create responsibilities list
        let responsibilitiesList = '';
        job.responsibilities.forEach(responsibility => {
            responsibilitiesList += `<li class="mb-2">${responsibility}</li>`;
        });
        
        // Create technologies list
        let technologiesList = '';
        job.technologies.forEach(tech => {
            technologiesList += `<span class="inline-block bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">${tech}</span>`;
        });
        
        jobElement.innerHTML = `
            <div class="flex items-center mb-4">
                <div class="z-10 flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full left-1/2 transform -translate-x-1/2 absolute">
                    <i class="fas fa-briefcase text-white"></i>
                </div>
            </div>
            <div class="ml-0 md:ml-${isEven ? '6' : '0'} mr-0 md:mr-${isEven ? '0' : '6'} md:${isEven ? 'text-left' : 'text-right'} bg-white p-6 rounded-lg shadow-md relative md:w-5/6 md:${isEven ? 'ml-auto' : 'mr-auto'}">
                <span class="text-blue-500 font-semibold">${job.duration}</span>
                <h3 class="text-xl font-bold text-gray-800 mt-1">${job.title}</h3>
                <h4 class="text-lg text-blue-600">${job.company}, ${job.location}</h4>
                <ul class="list-disc list-inside mt-4 text-gray-600 text-left">
                    ${responsibilitiesList}
                </ul>
                <div class="mt-4 flex flex-wrap ${isEven ? '' : 'justify-end'}">
                    ${technologiesList}
                </div>
            </div>
        `;
        
        timelineContainer.appendChild(jobElement);
    });
}

// Function to populate projects, achievements and certifications
function populateProjects(data) {
    // Populate projects
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';
    
    data.projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'bg-white rounded-lg shadow-md overflow-hidden';
        
        // Create technologies list
        let technologiesList = '';
        project.technologies.forEach(tech => {
            technologiesList += `<span class="inline-block bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">${tech}</span>`;
        });
        
        projectElement.innerHTML = `
            <div class="h-48 bg-gray-300 relative">
                ${project.image ? `<img src="${project.image}" alt="${project.name}" class="w-full h-full object-cover">` : ''}
            </div>
            <div class="p-6">
                <h4 class="text-xl font-semibold text-gray-800">${project.name}</h4>
                <p class="text-blue-600 text-sm mb-2">${project.duration}</p>
                <p class="text-gray-600 mb-4">${project.description}</p>
                <div class="flex flex-wrap mb-4">
                    ${technologiesList}
                </div>
                <a href="${project.link}" target="_blank" class="text-blue-500 hover:text-blue-700 font-semibold">
                    View Project <i class="fas fa-external-link-alt ml-1"></i>
                </a>
            </div>
        `;
        
        projectsContainer.appendChild(projectElement);
    });
    
    // Populate achievements
    const achievementsContainer = document.getElementById('achievements-container');
    achievementsContainer.innerHTML = '';
    
    data.achievements.forEach(achievement => {
        const achievementElement = document.createElement('li');
        achievementElement.className = 'text-gray-700';
        achievementElement.textContent = achievement;
        achievementsContainer.appendChild(achievementElement);
    });
    
    // Populate certifications
    const certificationsContainer = document.getElementById('certifications-container');
    certificationsContainer.innerHTML = '';
    
    data.certifications.forEach(cert => {
        const certElement = document.createElement('div');
        certElement.className = 'bg-white p-5 rounded-lg shadow-md border-t-4 border-blue-500';
        certElement.innerHTML = `
            <h4 class="text-lg font-semibold text-gray-800">${cert.name}</h4>
            <p class="text-blue-600 mb-2">${cert.issuer}</p>
            <p class="text-gray-500 text-sm mb-3">${cert.date}</p>
            <a href="${cert.link}" target="_blank" class="text-blue-500 hover:text-blue-700 text-sm font-semibold">
                Verify <i class="fas fa-external-link-alt ml-1"></i>
            </a>
        `;
        
        certificationsContainer.appendChild(certElement);
    });
}

// Function to populate contact information
function populateContact(data) {
    // Populate quick facts in about section
    const quickFactsContainer = document.getElementById('contact-quick-facts');
    quickFactsContainer.innerHTML = `
        <li class="flex items-center"><i class="fas fa-envelope text-blue-500 mr-2 w-5"></i> ${data.email}</li>
        <li class="flex items-center"><i class="fas fa-phone text-blue-500 mr-2 w-5"></i> ${data.phone}</li>
        <li class="flex items-center"><i class="fas fa-map-marker-alt text-blue-500 mr-2 w-5"></i> ${data.location}</li>
    `;
    
    // Populate contact info
    const contactInfoContainer = document.getElementById('contact-info');
    contactInfoContainer.innerHTML = `
        <div class="flex items-center">
            <div class="bg-blue-100 rounded-full p-3 mr-4">
                <i class="fas fa-envelope text-blue-500"></i>
            </div>
            <div>
                <p class="text-sm text-gray-500">Email</p>
                <a href="mailto:${data.email}" class="text-gray-800 hover:text-blue-500">${data.email}</a>
            </div>
        </div>
        <div class="flex items-center">
            <div class="bg-blue-100 rounded-full p-3 mr-4">
                <i class="fas fa-phone text-blue-500"></i>
            </div>
            <div>
                <p class="text-sm text-gray-500">Phone</p>
                <a href="tel:${data.phone}" class="text-gray-800 hover:text-blue-500">${data.phone}</a>
            </div>
        </div>
        <div class="flex items-center">
            <div class="bg-blue-100 rounded-full p-3 mr-4">
                <i class="fas fa-map-marker-alt text-blue-500"></i>
            </div>
            <div>
                <p class="text-sm text-gray-500">Location</p>
                <p class="text-gray-800">${data.location}</p>
            </div>
        </div>
    `;
    
    // Populate availability information
    document.getElementById('availability-status').textContent = `Status: ${data.availability.status}`;
    document.getElementById('preferred-contact').textContent = `Preferred contact method: ${data.availability.preferred_contact}`;
    
    // Populate social media links
    const socialLinksContainer = document.getElementById('social-media-links');
    socialLinksContainer.innerHTML = '';
    
    data.social_media.forEach(social => {
        const socialElement = document.createElement('a');
        socialElement.href = social.url;
        socialElement.target = '_blank';
        socialElement.className = 'bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full p-4 transition';
        socialElement.innerHTML = `<i class="${social.icon} text-xl"></i>`;
        socialLinksContainer.appendChild(socialElement);
    });
}

// Handle mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Load all data when page loads
    loadAllData();
});
