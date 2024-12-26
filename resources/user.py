from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from werkzeug.security import generate_password_hash

from extensions import db
from models.user import UserModel, Role
from schemas import UserSchema , UserUpdateSchema
from flask_jwt_extended import jwt_required, get_jwt_identity
from resources.decorators import role_required

blp = Blueprint("Users","users",description="Operations on users(only for admins)")



@blp.route("/user/<int:user_id>")
class User(MethodView):
    @blp.response(200, UserSchema)
    @jwt_required()
    @role_required('admin')
    def get(self, user_id):
        """Retrieve a single user by ID."""
        user = UserModel.query.get(user_id)
        if not user:
            abort(404, message="User not found.")
        return user
    @jwt_required()
    @role_required('admin')
    @blp.response(200, UserSchema)
    def delete(self, user_id):
        """Delete a user by ID."""
        user = UserModel.query.get(user_id)
        if not user:
            abort(404, message="User not found.")
        try:
            db.session.delete(user)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while deleting the user.")
        return {"message": "User deleted successfully."}
    @jwt_required()
    @role_required('admin')
    @blp.arguments(UserUpdateSchema)
    @blp.response(200, UserSchema)
    def put(self, user_data, user_id):
        "Update a user infos by id"
        user = UserModel.query.get(user_id)
        if not user:
            abort(404, message="User not found.")

        if "password" in user_data:
            user_data["password"] = generate_password_hash(user_data["password"])

        if "role_id" in user_data:
            role = Role.query.get(user_data["role_id"])
            if not role:
                abort(400, message="Role with the given ID does not exist.")
            user.role_id = user_data["role_id"]

        for key, value in user_data.items():
            if key != "role_id":  
                setattr(user, key, value)

        try:
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while updating the user.")

        return user


@blp.route("/user")
class UserList(MethodView):
    @jwt_required()
    @role_required('admin')
    @blp.response(200, UserSchema(many=True))
    def get(self):
        """Retrieve all users"""
        return UserModel.query.all()
    
    @jwt_required()
    @role_required('admin')
    @blp.arguments(UserSchema)
    @blp.response(201, UserSchema)
    def post(self, user_data):
        """Create a new admin"""
        hashed_password = generate_password_hash(user_data['password'])
        user = UserModel(
            name=user_data['name'],
            email=user_data['email'],
            password=hashed_password,
            age=user_data['age'],
            role_id=1 
        )

        try:
            db.session.add(user)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while creating the user.")

        return user
