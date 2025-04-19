# Grocery List Manager

A simple Django-based grocery list management application.

## System Requirements

- Operating System: Windows, macOS, or Linux
- Python 3.8 or higher
- pip (Python package installer)
- Git
- Web browser (Chrome, Firefox, Safari, or Edge)
- At least 100MB of free disk space
- Internet connection (for CDN resources and package installation)

## Prerequisites

1. Install Python:
   - Windows: Download from [python.org](https://www.python.org/downloads/)
   - macOS: `brew install python` (using Homebrew)
   - Linux: `sudo apt install python3 python3-pip` (Ubuntu/Debian)

2. Verify installation:
```bash
python --version  # Should show 3.8 or higher
pip --version
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd grocery_project
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:

On Windows:
```bash
venv\Scripts\activate
```

On macOS/Linux:
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run database migrations:
```bash
python manage.py migrate
```

6. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

7. Start the development server:
```bash
python manage.py runserver
```

The application will be available at `http://127.0.0.1:8000/`

## Project Settings

1. Create a .env file in the project root:
```bash
touch .env  # For Unix-based systems
# OR
type nul > .env  # For Windows
```

2. Add the following environment variables:
```
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
```

## Project Structure

- `grocery/` - Main application directory
  - `static/` - Static files (CSS, JavaScript)
  - `templates/` - HTML templates
  - `models.py` - Database models
  - `views.py` - View logic
  - `urls.py` - URL routing

## Features

- Add, edit, and delete grocery items
- Mark items as complete
- Search functionality
- Drag and drop reordering
- Department organization
- Responsive design

## Development

To set up the project for development:

1. Install development dependencies:
```bash
pip install black flake8 pytest
```

2. Run tests:
```bash
python manage.py test
```

3. Collect static files:
```bash
python manage.py collectstatic
```

## Troubleshooting

Common issues and solutions:

1. Static files not loading:
```bash
python manage.py collectstatic --clear
```

2. Database errors:
```bash
python manage.py makemigrations
python manage.py migrate --run-syncdb
```

3. Permission issues (Unix-based systems):
```bash
chmod +x manage.py
```

4. Port already in use:
```bash
# Use a different port
python manage.py runserver 8001
```

## Dependencies

The project requires the following main packages:
- Django 5.2
- python-dotenv
- All JavaScript dependencies are loaded via CDN

## Notes

- The project uses SQLite by default for development
- Static files are served using Django's development server
- For production deployment, configure appropriate settings for database, static files, and security
