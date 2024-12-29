from flask import Flask
from flask_smorest import Api
from flask_jwt_extended import JWTManager
from extensions import db , migrate
from models import UserModel, PromiseModel, RegionModel, CategoryModel
from resources.user import blp as UserBlueprint
from resources.promise import blp as PromiseBlueprint
from resources.auth import blp as AuthBlueprint
from resources.category import blp as CategoryBlueprint
from resources.region import blp as RegionBlueprint
import secrets

from flask_cors import CORS



secret_key = secrets.token_hex(32)
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


# Configuration
app.config["PROPAGATE_EXCEPTIONS"] = True
app.config["API_TITLE"] = "Government Promise Monitoring API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.3"
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
app.config[
    "OPENAPI_SWAGGER_UI_URL"
] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = secret_key

jwt = JWTManager(app)


db.init_app(app)
migrate.init_app(app,db)
api = Api(app)

# Register Blueprints
api.register_blueprint(UserBlueprint)
api.register_blueprint(PromiseBlueprint)
api.register_blueprint(AuthBlueprint)
api.register_blueprint(CategoryBlueprint)
api.register_blueprint(RegionBlueprint)



if __name__ == "__main__":
    with app.app_context():
        db.create_all()  
    app.run(debug=True)