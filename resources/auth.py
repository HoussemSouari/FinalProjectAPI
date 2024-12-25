from flask import request , jsonify
from datetime import datetime, timedelta

from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token
from extensions import db
from models.user import UserModel, AuthTokenModel
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

        # Create access and refresh tokens
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)

        # Token expiration (adjust as needed)
        access_token_expires = datetime.utcnow() + timedelta(minutes=30)  # Example: 30 minutes
        refresh_token_expires = datetime.utcnow() + timedelta(days=7)  # Example: 7 days

        # Save tokens in the database
        auth_token = AuthTokenModel(
            user_id=user.id,
            access_token=access_token,
            refresh_token=refresh_token,
            created_at=datetime.utcnow(),
            expires_at=access_token_expires,
        )

        try:
            db.session.add(auth_token)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(500, message="An error occurred while saving the token.")

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "expires_at": access_token_expires.isoformat(),
        }, 200

@blp.route("/protected")
class Protected(MethodView):
    @jwt_required()
    def get(self):
        """Get the current user's information"""
        # Get the user's ID from the JWT token
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)

        if not user:
            abort(404, message="User not found.")

        # Check if the access token exists in the AuthTokenModel
        access_token = request.headers.get("Authorization", "").replace("Bearer ", "")
        token_record = AuthTokenModel.query.filter_by(user_id=user_id, access_token=access_token).first()

        if not token_record:
            abort(401, message="Invalid or expired token.")

        # Prepare user data for the response
        user_data = UserSchema().dump(user)
        user_data["role"] = user.roles.name  # Assuming 'roles' relationship has 'name' field
        user_data["token_created_at"] = token_record.created_at
        user_data["token_expires_at"] = token_record.expires_at

        return user_data, 200
