from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from extensions import db
from models import UserModel
from werkzeug.security import check_password_hash
from schemas import UserSchema

blp = Blueprint("Auth", "auth", description="Authentication operations")

# Login endpoint to authenticate the user and issue a token
@blp.route("/login")
class Login(MethodView):
    def post(self):
        """Login and return a JWT token"""
        # Extract email and password from the request body
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        
        if not email or not password:
            abort(400, message="Email and password are required.")

        # Find the user by email
        user = UserModel.query.filter_by(email=email).first()

        if not user:
            abort(401, message="Invalid credentials.")
        
        # Check if the password matches
        if not check_password_hash(user.password, password):
            abort(401, message="Invalid credentials.")

        # Create JWT token
        access_token = create_access_token(identity=user.id)
        return {"access_token": access_token}, 200

# Protected endpoint that requires authentication
@blp.route("/protected")
class Protected(MethodView):
    @jwt_required()  # This ensures that the user must be authenticated to access this endpoint
    def get(self):
        """Get the current user's information"""
        # Get the user ID from the token
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)

        if not user:
            abort(404, message="User not found.")

        # Return user data
        return UserSchema().dump(user), 200
