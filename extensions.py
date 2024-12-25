from flask_sqlalchemy import SQLAlchemy
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
db = SQLAlchemy()