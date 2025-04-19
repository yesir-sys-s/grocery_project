# Grocery List Manager

A simple Django-based grocery list management application.

## System Requirements

- Operating System: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+, Debian 10+)
- Python 3.8.1 to 3.11.x (3.8.1 recommended for maximum compatibility)
- pip 20.0.2 or higher
- Git
- Web browser (Chrome, Firefox, Safari, or Edge)
- 512MB RAM
- 1GB free disk space
- Internet connection for initial setup

## Prerequisites Installation

### Windows
1. Download Python 3.8.1 from [python.org](https://www.python.org/downloads/release/python-381/)
2. During installation:
   - Check "Add Python to PATH"
   - Check "Install pip"
   - Check "Install for all users"

### macOS
```bash
# Using Homebrew
brew install python@3.8
brew link python@3.8

# Verify installation
python3.8 --version
python3.8 -m pip --version
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install -y python3.8 python3.8-venv python3-pip
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd grocery_project
```

2. Create a virtual environment:

Windows:
```bash
python -m venv venv --prompt grocery
venv\Scripts\activate
python -m pip install --upgrade pip setuptools wheel
```

macOS/Linux:
```bash
python3.8 -m venv venv --prompt grocery
source venv/bin/activate
python -m pip install --upgrade pip setuptools wheel
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run database migrations:
```bash
python manage.py migrate
```

5. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

6. Start the development server:
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

## Troubleshooting Common Issues

1. Static files not loading:
```bash
python manage.py collectstatic --clear
```

2. Package installation errors:
```bash
# Clear pip cache
pip cache purge
# Install with verbose output
pip install -r requirements.txt -v
```

3. Permission errors:
```bash
# Windows (run as administrator)
python -m pip install --user -r requirements.txt

# Linux/macOS
sudo chown -R $USER:$USER venv/
```

4. Python version conflicts:
```bash
# Verify Python version
python --version
# Should show Python 3.8.x
```

5. Database errors:
```bash
# Reset database
rm db.sqlite3
python manage.py migrate --run-syncdb
```

6. Permission issues (Unix-based systems):
```bash
chmod +x manage.py
```

7. Port already in use:
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
