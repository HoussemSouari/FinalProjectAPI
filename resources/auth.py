from flask import request , jsonify
from datetime import datetime, timedelta

from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token
from extensions import db
from models.user import UserModel
from werkzeug.security import check_password_hash
from schemas import UserSchema

blp = Blueprint("Auth", "auth", description="Authentication operations")

@blp.route("/login")
class Login(MethodView):
    def post(self):
        """Login and return a JWT token"""
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        
        if not email or not password:
            abort(400, message="Email and password are required.")

        user = UserModel.query.filter_by(email=email).first()

        if not user:
            abort(401, message="Invalid credentials.")
        
        if not check_password_hash(user.password, password):
            abort(401, message="Invalid credentials.")

        access_token = create_access_token(identity=str(user.id))
        return {"access_token": access_token}, 200

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
