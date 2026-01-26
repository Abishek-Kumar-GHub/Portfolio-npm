# wsgi.py
from app import app  # import your Flask app instance

application = app  # expose 'application' for Gunicorn
