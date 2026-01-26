# app.py - Flask Backend
from flask import Flask, render_template, url_for
from urllib.parse import quote

app = Flask(__name__)

@app.template_filter('urlencode')
def urlencode_filter(s):
    return quote(s)

@app.route('/')
@app.route('/about')
def about():
    """Landing page - About Me section"""
    
    experience = [
        {
            'role': 'Project Trainee',
            'company': 'ISRO',
            'duration': 'Oct 2024 - Feb 2025',
            'description': 'Developed a Django-based web application to manage SSM-data and generate visualisations based on user-specified date ranges. The application\'s security was enhanced using Django\'s built-in security features, and robust data management practices were implemented.'
        },
        {
            'role': 'Web Development Intern',
            'company': 'Fidrox Technologies',
            'duration': 'Apr 2025 - Jul 2025',
            'description': 'As part of a 7-member team and lead, I worked on updating visitor statuses—Scheduled, Rescheduled, and Cancelled—along with managing appointment validity dates. Developed a responsive user interface using AdminLTE, jqGrid, and Bootstrap, and integrated the system with .NET Core 8, Entity Framework and MSSQL.'
        }
    ]
    
    return render_template('about.html', active_page='about', experience=experience)

@app.route('/projects')
def projects():
    """Projects page"""
    # Sample project data - you can move this to a database later
    projects_data = [
        {
            'title': 'CodeAtEase',
            'description': 'CodeAtEase is an AI-powered developer assistant built with FastAPI, designed to simplify your workflow, integrate with GitHub, and give smart insights into your repositories.',
            'tech': ['Python', 'FastAPI', 'GitHub-Oauth', 'QwenCoderAPI', 'JavaScript'],
            'github': 'https://github.com/Abishek-Kumar-GHub/CodeAtEase1',
            'info_link': ['https://codeatease.onrender.com/','https://youtu.be/q4ZQFZPz7KE'], 
            'category': 'Web Development'
        },
        {
            'title': 'Gemini Chatbot Application',
            'description': 'GraphQL-based chatbot with Flask framework for query handling and content summarization. Includes comprehensive API security analysis',
            'tech': ['Python', 'Flask', 'GraphQL', 'Gemini API', 'JavaScript'],
            'github': 'https://github.com/Abishek-Kumar-GHub/Gemini-ChatBot',
            'category': 'Web Development'
        },
        {
            'title': 'ISRO SSM Visualization App',
            'description': 'Django-based web application for SSM-data management with date-range visualizations. Enhanced with Django security features',
            'tech': ['Python', 'Django', 'Data Visualization', 'Plotly.js'],
            'github': 'https://github.com/Abishek-Kumar-GHub/ISRO-Vizualization-App',
            'category': 'Full Stack Development'
        },
        {
            'title': 'Visitor Management System',
            'description': 'A visitor management system built using AdminLTE and .NET COre 8 for managing visitor information and tracking',
            'tech': ['AdminLTE', 'Jquery', '.NET Core 8', 'Entity Framework', 'MSSQL'],
            'github': 'https://github.com/Abishek-Kumar-GHub/Visitor-Management-System',
            'category': 'Web Development'
        },
        {
            'title': 'Vehicle Tracking IoT System',
            'description': 'GNSS-based tracking system using ESP32, Neo 6M GPS, OLED display, and ThingSpeak for cloud analytics',
            'tech': ['C++', 'Arduino IDE', 'ESP32', 'IoT', 'ThingSpeak'],
            'github': 'https://github.com/Abishek-Kumar-GHub/Vehicle-Tracking-IoT',
            'category': 'IoT'
        },
        {
            'title': 'Vulnerable Application Lab for SQL Injection',
            'description': 'Educational cybersecurity applications demonstrating SQL injection (Django) with mitigation solutions',
            'tech': ['Python', 'Django', 'MySQL', 'Cybersecurity'],
            'github': 'https://github.com/Abishek-Kumar-GHub/SQL-vul',
            'category': 'Cyber Security'
        },
        {
            'title': 'Vulnerable Application Lab for XSS',
            'description': 'Educational cybersecurity applications demonstrating XSS (Flask) with mitigation solutions',
            'tech': ['Python', 'JavaScript', 'Flask', 'Cybersecurity'],
            'github': 'https://github.com/Abishek-Kumar-GHub/XSS-vul',
            'category': 'Cyber Security'
        },
        {
            'title': 'COVID Prediction Model',
            'description': 'Machine learning model using Java and Weka for COVID-19 case trend prediction and classification analysis',
            'tech': ['Java', 'Weka', 'Machine Learning', 'Data Analysis'],
            'github': 'https://github.com/Abishek-Kumar-GHub/Covid-Prediciton',
            'category': 'Machine Learning'
        },
        {
            'title': 'Ransomware Simulation Lab using Flask',
            'description': 'Educational Flask-based ransomware simulation demonstrating encryption/decryption mechanics in controlled environment',
            'tech': ['Python', 'Flask', 'Cryptography', 'Security'],
            'github': 'https://github.com/Abishek-Kumar-GHub/Ransome-Flask',
            'category': 'Cyber Security'
        },
        {
            'title': 'University Management using Angular',
            'description': 'A Unversity management system built using Anglular Framework with Typescript for managing university\'s department, student, faculty informations',
            'tech': ['Python', 'Typescript', 'Angular', 'Postgresql'],
            'github': 'https://github.com/Abishek-Kumar-GHub/University-Management',
            'category': 'Full Stack Development'
        },
        {
            'title': 'Student Management using Django',
            'description': 'A Student management system built using Django Framework with JavaScript for managing student\'s department, course, faculty informations',
            'tech': ['Python', 'JavaScript', 'Django', 'Postgresql'],
            'github': 'https://github.com/Abishek-Kumar-GHub/Student-Management',
            'category': 'Full Stack Development'
        },
        {
            'title': 'Tensorflow Image Prediction',
            'description': 'Using 15+ functions in TensorFlow, explored the prediction of Abalone dataset, Image prediciton and Iris Classification',
            'tech': ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas'],
            'github': 'https://github.com/Abishek-Kumar-GHub/Tensorflow-Functions',
            'category': 'Machine Learning'
        },
        {
            'title': 'Stock Market Prediction using KNN Model',
            'description': 'Developed a K-Nearest Neighbors (KNN) based prediction model to analyze stock datasets including HDFC, Yes Bank, and three others',
            'tech': ['Python', 'Prediction', 'Scikit-learn', 'Pandas'],
            'github': '#',
            'category': 'Machine Learning'
        },
        {
            'title': 'Action monitor usnig Github Webhook',
            'description': 'Used Github Webhook to get the push, pull, merge and commit messages into the action webpage',
            'tech': ['Python', 'Git', 'HTML', 'JavaScript'],
            'github': 'https://github.com/Abishek-Kumar-GHub/webhook-repo',
            'category': 'Web Development'
        }
    ]
    return render_template('projects.html', active_page='projects', projects=projects_data)

@app.route('/academics')
def academics():
    """Academics page"""
    education_data = [
        {
            'degree': 'Master of Computer Applications',
            'specialization': 'Cyber Security',
            'institution': 'Chanakya University',
            'duration': 'Nov 2023 - Jul 2025',
            'cgpa': '9.3',
            'coursework': [
                'Full Stack Development with Angular Framework',
                'Data Structures with C',
                'Python Advanced',
                'Bash Scripting',
                'Java with OOP',
                'Ethical Hacking',
                'AWS',
                'Machine Learning',
                'DBMS and NoSQL(MongoDB)'
            ]
        },
        {
            'degree': 'Bachelor of Computer Applications',
            'specialization': '',
            'institution': 'Scott Christian College',
            'duration': 'June 2020 - May 2023',
            'cgpa': '8.7',
            'coursework': [
                'HTML, CSS',
                'JavaScript',
                'PHP',
                'SQL',
                'C, C++',
                'Visual Basics',
                'Python for beginners',
                'Shell Scripting'
            ]
        }
    ]
    
    skills_data = {
        'Programming Languages': ['Python', 'C', 'C#', 'PHP', 'Java', 'HTML', 'CSS', 'JavaScript', 'C++', 'Visual Basics'],
        'Tools & Frameworks': ['Angular', 'Django', 'Flask', 'FastAPI', 'REST API', '.Net Core 8', 'Entity', 'Burp Suite', 'Nmap', 'Wireshark', 'MongoDb', 'MSSQL', 'OracleSQL', 'Postgresql', 'MySQL', 'Scikit-Learn', 'Weka'],
        'Cloud Platforms': ['AWS (S3, EC2, IAM, Lambda)', 'Docker', 'Kubernetes', 'Prowler', 'Flaws.Cloud'],
        'Cyber Security Expertise': ['Vulnerability analysis', 'API security', 'SQL injection', 'XSS', 'Hash functions', 'JWT', 'Encryption and Decryption algorithms']
    }
    
    return render_template('academics.html', active_page='academics', education=education_data, skills=skills_data)

@app.route('/research')
def research():
    """Research page"""
    research_projects = [
        {
            'title': 'Research on Cloud Security',
            'department': 'Department of Chanakya University',
            'duration': '2023-2024',
            'description': 'Flaws.Cloud: Explored vulnerabilities in cloud security and devised mitigation techniques using AWS CLI commands.'
        },
        {
            'title': 'Research on Database Forensic Investigation',
            'department': 'Department of Chanakya University',
            'duration': '2023-2024',
            'description': 'Collaborated with a research team to explore database forensic investigation methodologies. Conducted experiments on Oracle databases and gained practical insights into real-world forensic scenarios. Delivered a seminar on findings and shared knowledge with peers and faculty.'
        },
        {
            'title': 'Research on Cyber Security',
            'department': 'Department of Chanakya University',
            'duration': '2023-2024',
            'description': 'Analyzed vulnerabilities in the Cosmos Bank attack and presented causes and mitigation strategies.'
        }
    ]
    
    publications = [
        {
            'title': 'OWASP top 10',
            'description': 'A summary of the ten most critical web application security risks, aimed at raising developer awareness',
            'platform': 'Medium',
            'url': 'https://medium.com/@abishektechy/owasp-top-ten-8b2f1005abca'
        },
        {
            'title': 'Cookie Headers',
            'description': 'An exploration of HTTP cookie header fields—how they work and best practices for secure session implementation.',
            'platform': 'Medium',
            'url': 'https://medium.com/@abishektechy/cookie-headers-cef87d3dc437'
        },
        {
            'title': 'How to capture mobile traffic',
            'description': 'A guide on intercepting and analyzing mobile app network requests using tools like Burp Suite',
            'platform': 'Medium',
            'url': 'https://medium.com/@abishektechy/capture-mobile-traffic-2156171b48cc'
        },
        {
            'title': 'Android Debug Bridge',
            'description': 'A walkthrough of using Android Debug Bridge shell commands to access and control Android devices for debugging and development.',
            'platform': 'Medium',
            'url': 'https://medium.com/@abishektechy/android-debug-bridge-452c221dda6f'
        }
    ]
    
    return render_template('research.html', active_page='research', research_projects=research_projects, publications=publications)

@app.route('/research/articles')
def articles():
    """Articles listing page"""
    return render_template('articles.html', active_page='research')

@app.route('/research/articles/ctf-round-1')
def article_ctf_round2():
    """CTF Round 2 article page"""
    return render_template('articles/article_ctf_round1.html', active_page='research')

@app.route('/research/articles/boot-sequence')
def article_boot_sequence():
    """Boot Sequence article page"""
    return render_template('articles/article_boot_sequence.html', active_page='research')

@app.route('/contact')
def contact():
    """Contact page"""
    contact_info = {
        'email': 'abishek.techy@gmail.com',
        'phone': '+91 6380138198',
        'location': 'Bengaluru, Karnataka, IN',
        'linkedin': 'https://www.linkedin.com/in/abishek--kumar/',
        'github': 'https://github.com/Abishek-Kumar-GHub',
        'medium': 'https://medium.com/@abishektechy'
    }
    
    return render_template('contact.html', active_page='contact', contact_info=contact_info)

if __name__ == '__main__':
    app.run(debug=True)
    

