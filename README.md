
# Abishek Kumar - Portfolio Website
LINK - www.theabishek.space

A modern, responsive portfolio website built with Flask, showcasing my projects, academic background, research work, and professional experience.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Multi-page Navigation**: Clean navigation between About, Projects, Academics, Research, and Contact pages
- **Interactive Elements**: Project filtering, hover effects, and smooth animations
- **Modern UI**: Built with Tailwind CSS for a contemporary look
- **Contact Integration**: Direct email integration and social media links

## Technologies Used

- **Backend**: Python Flask
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome
- **Deployment Ready**: Gunicorn for production deployment

## Quick Start

1. **Clone or create the project structure**
   ```bash
   mkdir portfolio
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run the application**
   ```bash
   python app.py
   # Or alternatively:
   python run.py
   ```

5. **Open in browser**
   Navigate to `http://localhost:5000`

## Project Structure

```
portfolio/
├── app.py              # Main Flask application with routes
├── requirements.txt    # Python dependencies
├── templates/         # Jinja2 HTML templates
│   ├── base.html     # Base template with navigation
│   ├── about.html    # Landing page
│   ├── projects.html # Projects showcase
│   ├── academics.html# Education & skills
│   ├── research.html # Research & publications
│   └── contact.html  # Contact information
└── static/           # Static files (optional)
    ├── css/
    ├── js/
    └── images/
```

## Customization

### Adding New Projects
Edit the `projects_data` list in `app.py`:
```python
{
    'title': 'Your Project Name',
    'description': 'Project description',
    'tech': ['Technology', 'Stack'],
    'github': 'https://github.com/your-repo',
    'category': 'Category'
}
```

### Updating Contact Information
Modify the `contact_info` dictionary in the contact route in `app.py`.

### Adding New Pages
1. Create a new route in `app.py`
2. Create corresponding HTML template in `templates/`
3. Add navigation link to `base.html`

## Deployment Options

### Local Development
```bash
python app.py
```

### Production with Gunicorn
```bash
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

### Deploy to Heroku
1. Create `Procfile`: `web: gunicorn app:app`
2. Push to Heroku git repository

### Deploy to Railway/Render
- Connect your GitHub repository
- Set build command: `pip install -r requirements.txt`
- Set start command: `gunicorn app:app`

## Features Breakdown

### About Page (Landing)
- Professional summary
- Contact information
- Core competencies
- Quick stats

### Projects Page
- Interactive project filtering
- GitHub integration
- Technology stack display
- Featured project spotlight

### Academics Page
- Educational timeline
- Skills acquired
- Coursework details
- Academic achievements

### Research Page
- Research projects
- Publications list
- Research interests
- Impact metrics

### Contact Page
- Contact form
- Professional experience
- Availability status
- Social media links

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
This project is open source and available under the [MIT License](LICENSE).

## Contact
- **Email**: abishek.techy@gmail.com
- **LinkedIn**: [Abishek Kumar](https://www.linkedin.com/in/abishek--kumar/)
- **GitHub**: [Abishek-Kumar-GHub](https://github.com/Abishek-Kumar-GHub)

---
