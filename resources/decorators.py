from functools import wraps
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_smorest import abort
from models import UserModel

def role_required(role):
    """
    Decorator to restrict access to certain roles.
    Usage: @role_required('admin') to restrict access to admins only.
    """
    def decorator(fn):
        @wraps(fn)
        @jwt_required()
        def wrapper(*args, **kwargs):
            user_id = get_jwt_identity()
            user = UserModel.query.get(user_id)
            if user is None:
                abort(401, message="User not found.")
            if user.roles.slug != role:
                abort(403, message="Forbidden: You do not have the required role.")
            return fn(*args, **kwargs)
        wrapper.__name__ = fn.__name__

        return wrapper
    return decorator
