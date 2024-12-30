from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from extensions import db
from models import PromiseModel, UserModel, CategoryModel, RegionModel
from schemas import PromiseSchema, PromiseUpdateSchema, ReturnPromiseSchema
from flask_jwt_extended import jwt_required, get_jwt_identity
from resources.decorators import role_required


blp = Blueprint("Promises", "promises", description="Operations on promises")


@blp.route("/promise")
class PromiseList(MethodView):
    @blp.response(200, ReturnPromiseSchema(many=True))
    def get(self):
        """Retrieve all promises"""
        return PromiseModel.query.all()

    @jwt_required()
    @role_required('admin')
    @blp.arguments(PromiseSchema)
    @blp.response(201, PromiseSchema)
    def post(self, promise_data):
        """Create a new promise(admins only)"""
        promise = PromiseModel(**promise_data)
        try:
            db.session.add(promise)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while inserting the promise.")
        return promise
    

    

@blp.route("/promise/<int:promise_id>")
class Promise(MethodView):
    @blp.response(200, ReturnPromiseSchema)
    def get(self, promise_id):
        """Retrieve a single promise by ID."""
        promise = PromiseModel.query.get(promise_id)
        if not promise:
            abort(404, message="Promise not found.")
        return promise
    
@blp.route("/promise/category/<int:category_id>")
class PromisesByCategory(MethodView):
    @blp.response(200, ReturnPromiseSchema(many=True))
    def get(self, category_id):
        """Retrieve promises by category ID"""
        category = CategoryModel.query.filter_by(id=category_id).first()
        if not category:
            abort(404, message="Category not found.")
        
        promises = PromiseModel.query.filter_by(category_id=category.id).all()
        return promises

@blp.route("/promise/region/<int:region_id>")
class PromisesByRegion(MethodView):
    @blp.response(200, ReturnPromiseSchema(many=True))
    def get(self, region_id):
        """Retrieve promises by region ID"""
        region = RegionModel.query.filter_by(id=region_id).first()
        if not region:
            abort(404, message="Region not found.")
        
        promises = PromiseModel.query.filter_by(region_id=region.id).all()
        return promises
    

    

    @jwt_required()
    @role_required('admin')
    @blp.response(200,PromiseSchema)
    def delete(self,promise_id):
        "Delete a promise by id(admins only)"
        promise = PromiseModel.query.get(promise_id)
        if not promise:
            abort(404, message="Promise not found.")       
        try:
            db.session.delete(promise)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while deleting the promise.")
        return {"message": "Promise deleted successfully."}
    
    @jwt_required()
    @role_required('admin')
    @blp.arguments(PromiseUpdateSchema)
    @blp.response(200,PromiseSchema)
    def put(self,promise_data,promise_id):
        """Update a Promise Status(admins only)"""
        promise = PromiseModel.query.get(promise_id)

        if promise :
            promise.status = promise_data["status"]
        else:
            promise = PromiseModel(id=promise_id, **promise_data)
        try :
            db.session.add(promise)
            db.session.commit()
        except SQLAlchemyError :
            abort(500, message="An error occurred while updating the promise.")

        return promise


