# Government Promise Monitoring System

This project is a Government Promise Monitoring System built with a Flask backend and a React frontend. The system allows users to track government promises, view details about them, and manage categories and regions. Administrators have additional privileges to add, update, and delete promises, categories, and regions.

## Features

- **User Authentication**: Users can sign up, log in, and update their credentials.
- **Promise Management**: Users can view promises, and administrators can add, update, and delete promises.
- **Category Management**: Users can view categories, and administrators can add, update, and delete categories.
- **Region Management**: Users can view regions, and administrators can add, update, and delete regions.
- **Profile Management**: Users can view and update their profile information.
- **Admin Dashboard**: Administrators have access to a dashboard to manage promises, categories, regions, and users.

## Technologies Used

### Backend
- **Flask**: A micro web framework for Python.
- **Flask-SQLAlchemy**: An ORM for Flask applications.
- **Flask-JWT-Extended**: JWT integration for Flask.
- **Flask-Migrate**: Database migration tool for Flask.
- **Flask-Smorest**: A Flask extension for building REST APIs.
- **SQLite**: A lightweight database used for development.

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **React Router**: A library for routing in React applications.
- **Axios**: A promise-based HTTP client for making API requests.
- **Leaflet**: An open-source JavaScript library for interactive maps.
- **React-Leaflet**: React components for Leaflet maps.

## Project Structure

FinalProjectAPI/ ├── pycache/ ├── add_data.py ├── app.py ├── docker-compose.yml ├── Dockerfile ├── extensions.py ├── frontend/ │ ├── .gitignore │ ├── eslint.config.js │ ├── index.html │ ├── package.json │ ├── public/ │ ├── README.md │ ├── src/ │ ├── vite.config.js ├── instance/ ├── key.py ├── migrations/ ├── models/ │ ├── __init__.py │ ├── category.py │ ├── promise.py │ ├── region.py │ ├── user.py ├── README.md ├── requirements.txt ├── resources/ │ ├── auth.py │ ├── category.py │ ├── decorators.py │ ├── promise.py │ ├── region.py │ ├── user.py ├── schemas.py ├── seed/ │ ├── roles.sql │ ├── user.sql ├── seed.py


## Getting Started

### Prerequisites

- Python 3.11
- Node.js
- Docker (optional)

### Backend Setup

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd FinalProjectAPI

2. Create a virtual environment and activate it:
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

3. Install the required packages: 
    pip install -r requirements.txt

4. Set up the database:
    flask db init
    python add_data.
    
5. Run the application:
    flask run