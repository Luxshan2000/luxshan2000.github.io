
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load all JSON files
    Promise.all([
        fetchJSON('assets/about.json'),
        fetchJSON('assets/education.json'),
        fetchJSON('assets/skills.json'),
        fetchJSON('assets/experience.json'),
        fetchJSON('assets/projects.json'),
        fetchJSON('assets/contact.json')
    ])
    .then(([aboutData, educationData, skillsData, experienceData, projectsData, contactData]) => {
        // Populate each section with data
        populateAboutSection(aboutData);
        populateEducationSection(educationData);
        populateSkillsSection(skillsData);
        populateExperienceSection(experienceData);
        populateProjectsSection(projectsData);
        populateContactSection(contactData);
        
        // Hide loading spinners
        document.querySelectorAll('.loading').forEach(loader => {
            loader.style.display = 'none';
        });
        
        // Show content
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'block';
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
        document.querySelectorAll('.loading').forEach(loader => {
            loader.innerHTML = '<p>Error loading data. Please refresh the page.</p>';
        });
    });
});

// Function to fetch JSON data
async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

// Populate About section
function populateAboutSection(data) {
    document.getElementById('profile-name').textContent = data.name;
    document.getElementById('profile-title').textContent = data.title;
    document.getElementById('profile-summary').textContent = data.summary;
    
    if (data.photo) {
        document.getElementById('profile-img').src = data.photo;
        document.getElementById('profile-img').alt = data.name;
    }
    
    const personalDetails = document.getElementById('personal-details');
    if (data.personal_details) {
        const detailsHTML = `
            <p><strong>Date of Birth:</strong> ${data.personal_details.date_of_birth}</p>
            <p><strong>Nationality:</strong> ${data.personal_details.nationality}</p>
            <p><strong>Languages:</strong> ${data.personal_details.languages.map(lang => `${lang.name} (${lang.proficiency})`).join(', ')}</p>
            <p><strong>Interests:</strong> ${data.personal_details.interests.join(', ')}</p>
        `;
        personalDetails.innerHTML = detailsHTML;
    }
}

// Populate Education section
function populateEducationSection(data) {
    const educationContainer = document.getElementById('education-container');
    
    data.education.forEach(edu => {
        const startDate = new Date(edu.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        const endDate = edu.end_date === 'Present' ? 'Present' : 
            new Date(edu.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        
        const achievementsHTML = edu.achievements && edu.achievements.length > 0 ? 
            `<ul class="achievement-list">
                ${edu.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>` : '';
        
        const educationItem = document.createElement('div');
        educationItem.className = 'education-item';
        educationItem.innerHTML = `
            <div class="education-header">
                <h3 class="education-degree">${edu.degree} in ${edu.field}</h3>
                <span class="education-date">${startDate} - ${endDate}</span>
            </div>
            <div class="education-institution">${edu.institution}, ${edu.location}</div>
            <p class="education-description">${edu.description}</p>
            ${achievementsHTML}
        `;
        
        educationContainer.appendChild(educationItem);
    });
}

// Populate Skills section
function populateSkillsSection(data) {
    // Technical Skills
    const techSkillsContainer = document.getElementById('technical-skills-container');
    data.technical_skills.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'skill-category';
        
        let skillsHTML = `<h3>${category.category}</h3>`;
        
        category.skills.forEach(skill => {
            skillsHTML += `
                <div class="skill-item">
                    <div class="skill-name">
                        <span>${skill.name}</span>
                        <span>${skill.level}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: ${skill.level}%"></div>
                    </div>
                </div>
            `;
        });
        
        categoryElement.innerHTML = skillsHTML;
        techSkillsContainer.appendChild(categoryElement);
    });
    
    // Soft Skills
    const softSkillsContainer = document.getElementById('soft-skills-container');
    const softSkillsHTML = data.soft_skills.map(skill => `<div class="soft-skill">${skill}</div>`).join('');
    softSkillsContainer.innerHTML = softSkillsHTML;
    
    // Languages
    if (data.languages && data.languages.length > 0) {
        const languagesContainer = document.getElementById('languages-container');
        const languageHTML = `
            <h3>Languages</h3>
            ${data.languages.map(lang => `
                <div class="skill-item">
                    <div class="skill-name">
                        <span>${lang.name}</span>
                        <span>${lang.level}</span>
                    </div>
                </div>
            `).join('')}
        `;
        
        const langElement = document.createElement('div');
        langElement.className = 'skill-category';
        langElement.innerHTML = languageHTML;
        languagesContainer.appendChild(langElement);
    }
}

// Populate Experience section
function populateExperienceSection(data) {
    const experienceContainer = document.getElementById('experience-container');
    
    data.work_experience.forEach(exp => {
        const startDate = new Date(exp.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        const endDate = exp.end_date === 'Present' ? 'Present' : 
            new Date(exp.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        
        const responsibilitiesHTML = exp.responsibilities && exp.responsibilities.length > 0 ? 
            `<h4>Responsibilities:</h4>
            <ul class="responsibilities-list">
                ${exp.responsibilities.map(item => `<li>${item}</li>`).join('')}
            </ul>` : '';
        
        const achievementsHTML = exp.achievements && exp.achievements.length > 0 ? 
            `<h4>Key Achievements:</h4>
            <ul class="achievements-list">
                ${exp.achievements.map(item => `<li>${item}</li>`).join('')}
            </ul>` : '';
        
        const technologiesHTML = exp.technologies && exp.technologies.length > 0 ? 
            `<div class="tech-list">
                ${exp.technologies.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
            </div>` : '';
        
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        experienceItem.innerHTML = `
            <div class="experience-header">
                <h3 class="experience-position">${exp.position}</h3>
                <span class="experience-date">${startDate} - ${endDate}</span>
            </div>
            <div class="experience-company">${exp.company}, ${exp.location}</div>
            <p class="experience-description">${exp.description}</p>
            ${responsibilitiesHTML}
            ${achievementsHTML}
            ${technologiesHTML}
        `;
        
        experienceContainer.appendChild(experienceItem);
    });
}

// Populate Projects section
function populateProjectsSection(data) {
    // Projects
    const projectsContainer = document.getElementById('projects-container');
    data.projects.forEach(project => {
        const startDate = new Date(project.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        const endDate = project.end_date === 'Present' ? 'Present' : 
            new Date(project.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        
        const techHTML = project.technologies && project.technologies.length > 0 ? 
            `<div class="project-tech">
                ${project.technologies.map(tech => `<span class="project-tech-item">${tech}</span>`).join('')}
            </div>` : '';
        
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            ${project.image ? `<img src="${project.image}" alt="${project.name}" class="project-img">` : ''}
            <div class="project-info">
                <h3 class="project-title">${project.name}</h3>
                <div class="project-role">${project.role} | ${startDate} - ${endDate}</div>
                <p class="project-description">${project.description}</p>
                ${techHTML}
                ${project.url ? `<a href="${project.url}" target="_blank" class="project-link">View Project</a>` : ''}
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
    
    // Certifications
    const certContainer = document.getElementById('certifications-container');
    if (data.certifications && data.certifications.length > 0) {
        data.certifications.forEach(cert => {
            const certItem = document.createElement('div');
            certItem.className = 'cert-item';
            certItem.innerHTML = `
                <h3 class="cert-title">${cert.name}</h3>
                <div class="cert-issuer">${cert.issuer}</div>
                <div class="cert-date">Issued: ${new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    ${cert.expires && cert.expires !== 'None' ? ` | Expires: ${new Date(cert.expires).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}` : ''}
                </div>
                <p class="cert-description">${cert.description}</p>
                ${cert.url ? `<a href="${cert.url}" target="_blank" class="cert-link">View Certificate</a>` : ''}
            `;
            
            certContainer.appendChild(certItem);
        });
    }
    
    // Awards
    const awardsContainer = document.getElementById('awards-container');
    if (data.awards && data.awards.length > 0) {
        data.awards.forEach(award => {
            const awardItem = document.createElement('div');
            awardItem.className = 'award-item';
            awardItem.innerHTML = `
                <h3 class="award-title">${award.title}</h3>
                <div class="award-issuer">${award.issuer}</div>
                <div class="award-date">${new Date(award.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</div>
                <p class="award-description">${award.description}</p>
            `;
            
            awardsContainer.appendChild(awardItem);
        });
    }
    
    // Publications
    const pubContainer = document.getElementById('publications-container');
    if (data.publications && data.publications.length > 0) {
        data.publications.forEach(pub => {
            const pubItem = document.createElement('div');
            pubItem.className = 'cert-item'; // Reusing cert styling for publications
            pubItem.innerHTML = `
                <h3 class="cert-title">${pub.title}</h3>
                <div class="cert-issuer">${pub.publisher}</div>
                <div class="cert-date">${new Date(pub.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</div>
                <p class="cert-description">${pub.description}</p>
                ${pub.co_authors ? `<p><strong>Co-authors:</strong> ${pub.co_authors.join(', ')}</p>` : ''}
                ${pub.url ? `<a href="${pub.url}" target="_blank" class="cert-link">View Publication</a>` : ''}
            `;
            
            pubContainer.appendChild(pubItem);
        });
    }
}

// Populate Contact section
function populateContactSection(data) {
    // Email
    if (data.email) {
        document.getElementById('contact-email').innerHTML = `
            <div class="contact-icon">
                <i class="fas fa-envelope"></i>
            </div>
            <div class="contact-info">
                <h3>Email</h3>
                <a href="mailto:${data.email}">${data.email}</a>
            </div>
        `;
    }
    
    // Phone
    if (data.phone) {
        document.getElementById('contact-phone').innerHTML = `
            <div class="contact-icon">
                <i class="fas fa-phone"></i>
            </div>
            <div class="contact-info">
                <h3>Phone</h3>
                <a href="tel:${data.phone}">${data.phone}</a>
            </div>
        `;
    }
    
    // Location
    if (data.location) {
        const location = `${data.location.city}, ${data.location.state}, ${data.location.country}`;
        document.getElementById('contact-location').innerHTML = `
            <div class="contact-icon">
                <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="contact-info">
                <h3>Location</h3>
                <p>${location}</p>
            </div>
        `;
    }
    
    // Website
    if (data.website) {
        document.getElementById('contact-website').innerHTML = `
            <div class="contact-icon">
                <i class="fas fa-globe"></i>
            </div>
            <div class="contact-info">
                <h3>Website</h3>
                <a href="${data.website}" target="_blank">${data.website}</a>
            </div>
        `;
    }
    
    // Social Media Links
    const socialContainer = document.getElementById('social-links');
    if (data.social_media && data.social_media.length > 0) {
        const socialHTML = data.social_media.map(social => 
            `<a href="${social.url}" target="_blank" class="social-link" title="${social.platform}">
                <i class="${social.icon}"></i>
            </a>`
        ).join('');
        
        socialContainer.innerHTML = socialHTML;
    }
    
    // Availability
    if (data.availability) {
        document.getElementById('availability-status').textContent = data.availability.status;
    }
}
