from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from extensions import db
from models.region import RegionModel
from schemas import RegionSchema
from flask_jwt_extended import jwt_required, get_jwt_identity
from resources.decorators import role_required

blp = Blueprint("Regions", "regions", description="Operations on regions")

@blp.route("/region")
class RegionList(MethodView):
    @blp.response(200, RegionSchema(many=True))
    def get(self):
        """Retrieve all regions"""
        try:
            regions = RegionModel.query.all()
            return regions
        except SQLAlchemyError:
            abort(500, message="An error occurred while retrieving regions.")

@blp.route("/region/<int:region_id>")
class Region(MethodView):

    @blp.response(200, RegionSchema)
    def get(self, region_id):
        """Retrieve a region by id"""
        try:
            region = RegionModel.query.get_or_404(region_id)
            return region
        except SQLAlchemyError:
            abort(500, message="An error occurred while retrieving the region.")
