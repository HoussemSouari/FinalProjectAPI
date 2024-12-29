from flask_sqlalchemy import SQLAlchemy
from passlib.context import CryptContext
from flask_migrate import Migrate

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
db = SQLAlchemy()
migrate = Migrate()
