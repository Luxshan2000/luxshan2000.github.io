# Portfolio System with Tailwind CSS and JSON Data

## Overview
This is a professional portfolio website that uses separate JSON files for different sections of content. This approach makes it easy to update specific parts of your portfolio without having to modify the HTML.

## File Structure
- `index.html` - The main HTML file with Tailwind CSS styling
- `portfolio.js` - JavaScript code to load and display data from JSON files
- JSON data files:
  - `personal.json` - Personal details, education, and about me information
  - `skills.json` - Technical and soft skills
  - `experience.json` - Work experience and professional journey
  - `projects.json` - Projects, achievements, and certifications
  - `contact.json` - Contact information and social media links

## How to Update Your Portfolio
Simply edit the corresponding JSON file to update a specific section of your portfolio:

### To update personal information:
Edit `personal.json` to change your name, title, about section, or education history.

### To update skills:
Edit `skills.json` to modify your technical skills by category or update your soft skills.

### To update work experience:
Edit `experience.json` to add, remove, or modify your work history.

### To update projects, achievements, or certifications:
Edit `projects.json` to update your projects, add new achievements, or update certification information.

### To update contact information:
Edit `contact.json` to change your contact details or social media links.

## Viewing Your Portfolio
To view your portfolio, simply open the `index.html` file in a web browser. 

**Note:** Some browsers have security restrictions that prevent loading local JSON files. If you encounter issues, you'll need to use a local web server. You can do this easily with tools like:
- Python: `python -m http.server`
- Node.js: `npx serve`

## Customization
The portfolio uses Tailwind CSS for styling. If you want to modify the appearance while keeping the same structure, you can edit the Tailwind classes in the `index.html` file.
