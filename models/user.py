from sqlalchemy.ext.hybrid import hybrid_property

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




class Role(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(36), nullable=False)
    slug = db.Column(db.String(36), nullable=False, unique=True)

    users = db.relationship("UserModel", back_populates="roles")




