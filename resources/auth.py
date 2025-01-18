from flask import request , jsonify
from datetime import datetime, timedelta
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token, get_jti
from extensions import db
from models.user import UserModel,Role
from werkzeug.security import check_password_hash, generate_password_hash
from schemas import UserSchema
from resources.decorators import role_required

blp = Blueprint("Auth", "auth", description="Authentication operations")
revoked_tokens = set()


@blp.route("/signup")
class SignUp(MethodView):
    @blp.arguments(UserSchema)
    @blp.response(201, UserSchema)
    def post(self, user_data):
        """Create a new user"""

        hashed_password = generate_password_hash(user_data['password'])
        user = UserModel(
            name=user_data['name'],
            email=user_data['email'],
            password=hashed_password,
            age=user_data['age'],
            role_id=2 
        )

        try:
            db.session.add(user)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while creating the user.")

        return user
    
@blp.route("/update")
class UpdateUser (MethodView):
    @jwt_required()
    @blp.arguments(UserSchema(partial=True)) 
    @blp.response(200, UserSchema)
    def put(self, user_data):
        """Update user's email or password"""
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)

        if not user:
            abort(404, message="User  not found.")
        
        if 'name' in user_data :
            user.name = user_data['name']

        if 'email' in user_data:
            user.email = user_data['email']

        if 'password' in user_data:
            user.password = generate_password_hash(user_data['password'])

        try:
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while updating the user.")

        return user, 200
    


@blp.route("/delete")
class Delete(MethodView):
    @blp.arguments(UserSchema(only=["password"]))
    @blp.response(200)
    @jwt_required()
    def delete(self, user_data):
        """Delete user account"""
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)

        if not user:
            abort(404, message="User not found.")
        
        password = user_data.get("password")

        if not password:
            abort(400, message="Password is required to delete the account.")
        
        if not check_password_hash(user.password, password):
            abort(401, message="Invalid password.")

        try:
            db.session.delete(user)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while deleting the user.")
        
        return {"message": "User account has been deleted successfully."}, 200





@blp.route("/login")
class Login(MethodView):
    @blp.arguments(UserSchema(only=["email", "password"]))
    @blp.response(200)
    def post(self, user_data):
        """Login and return a JWT token"""
        email = user_data.get("email")
        password = user_data.get("password")
        
        if not email or not password:
            abort(400, message="Email and password are required.")

        user = UserModel.query.filter_by(email=email).first()

        if not user:
            abort(401, message="Invalid credentials.")
        
        if not check_password_hash(user.password, password):
            abort(401, message="Invalid credentials.")

        access_token = create_access_token(identity=str(user.id))
        is_admin = True if user.role_id==1 else False 
        return {"access_token": access_token,
                "isAdmin":is_admin}, 200
    
@blp.route("/logout")
class Logout(MethodView):
    @jwt_required()
    def post(self):
        """Logout by revoking the token"""
        jti = get_jti(request.headers.get("Authorization").split()[1])  # Get the unique identifier of the token
        revoked_tokens.add(jti)
        return {"message": "Token has been revoked."}, 200

@blp.route("/protected")
class Protected(MethodView):
    @jwt_required() 
     
    def get(self):
        """Get the current user's information"""
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)

        if not user:
            abort(404, message="User not found.")

        user_data = UserSchema().dump(user)
        user_data['role'] = user.roles.name

        return user_data , 200
    
# Middleware to check revoked tokens
def is_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return jti in revoked_tokens

from flask_jwt_extended import JWTManager
jwt = JWTManager()
jwt.token_in_blocklist_loader(is_token_revoked)