from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime, timedelta

from extensions import db

class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column("password", db.String(255), nullable=False)
    age= db.Column(db.String(2), nullable=False)
    promises = db.relationship('PromiseModel', back_populates='user')
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)  
    roles = db.relationship("Role", back_populates="users")
    auth_tokens = db.relationship('AuthTokenModel', back_populates='user', lazy='dynamic')


class AuthTokenModel(db.Model):
    __tablename__ ='auth_tokens'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    access_token = db.Column(db.String(500), nullable=False)
    refresh_token = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship('UserModel', back_populates='auth_tokens')





class Role(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(36), nullable=False)
    slug = db.Column(db.String(36), nullable=False, unique=True)

    users = db.relationship("UserModel", back_populates="roles")




