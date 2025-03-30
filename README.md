# Professional Portfolio with Modular JSON Data Structure

## Overview
This is a professional portfolio/resume system that separates data into modular JSON files for easy maintenance. The portfolio displays information from these JSON files using HTML, CSS, and JavaScript.

## Directory Structure
- `index.html` - The main HTML file that displays the portfolio
- `data/` - Directory containing all JSON data files
  - `about.json` - Personal details and introduction
  - `education.json` - Educational background information
  - `skills.json` - Skills and expertise details
  - `experience.json` - Professional work experience
  - `projects.json` - Projects, certifications, publications, and awards
  - `contact.json` - Contact information and social media links
- `css/` - Directory containing CSS files
  - `styles.css` - Main stylesheet
- `js/` - Directory containing JavaScript files
  - `main.js` - Script to load and display JSON data

## How It Works
1. The HTML file provides the structure and layout
2. The CSS file provides styling and responsiveness
3. The JavaScript file loads the JSON data files and populates the HTML

## How to Update the Portfolio
To update any section of your portfolio, simply edit the corresponding JSON file:

### Updating Personal Information
Edit `data/about.json` to update:
- Name
- Title
- Summary
- Personal details (date of birth, nationality, languages, interests)

### Updating Education
Edit `data/education.json` to update your educational background:
- Add, edit, or remove educational institutions
- Update degrees, fields of study, dates, locations, etc.

### Updating Skills
Edit `data/skills.json` to update your skills:
- Technical skills (categorized by type with proficiency levels)
- Soft skills
- Languages

### Updating Professional Experience
Edit `data/experience.json` to update your work history:
- Add new positions
- Update responsibilities and achievements
- Change employment dates

### Updating Projects, Certifications, etc.
Edit `data/projects.json` to update:
- Projects (with descriptions, technologies used, etc.)
- Certifications (with issuers, dates, etc.)
- Publications
- Awards and recognition

### Updating Contact Information
Edit `data/contact.json` to update:
- Email address
- Phone number
- Location
- Social media links
- Availability status
