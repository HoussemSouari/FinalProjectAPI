from flask import Flask
from flask_smorest import Api
from flask_jwt_extended import JWTManager
from extensions import db
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
api = Api(app)

# Register Blueprints
api.register_blueprint(UserBlueprint)
api.register_blueprint(PromiseBlueprint)
api.register_blueprint(AuthBlueprint)
api.register_blueprint(CategoryBlueprint)
api.register_blueprint(RegionBlueprint)


# Function to populate the database with initial data
def populate_db():
    """Populate the database with initial data."""
    # Populate Regions if empty

    if RegionModel.query.count() > 0:
        db.session.query(RegionModel).delete()
        db.session.commit()

    if RegionModel.query.count() == 0:
        regions =  [
            "Tunis", "Ariana", "Ben Arous", "Bizerte", "Beja", "Jendouba", "Kairouan", "Kasserine", 
            "Kebili", "Kef", "Mahdia", "Manouba", "Medenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", 
            "Siliana", "Sousse", "Tataouine", "Tozeur", "Zaghouan","Gafsa","Gabes"
        ]
        for region in regions:
            db.session.add(RegionModel(name=region))
        db.session.commit()
    
    # Populate Categories if empty
    if CategoryModel.query.count() == 0:
        categories = ["Education", "Health", "Infrastructure", "Security"]
        for category in categories:
            db.session.add(CategoryModel(name=category))
        db.session.commit()
    


if __name__ == "__main__":
    with app.app_context():
        db.create_all()  
        populate_db()    
    app.run(debug=True)
