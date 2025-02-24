from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from extensions import db

from models.category import CategoryModel
from schemas import CategorySchema, CategoryUpdateSchema

from flask_jwt_extended import jwt_required, get_jwt_identity
from resources.decorators import role_required

blp = Blueprint("Categories","categories", description="Operations on categories")


@blp.route("/category")
class CategoryList(MethodView):
    @blp.response(200, CategorySchema(many=True))
    def get(self):
        """Retrieve all categories"""
        return CategoryModel.query.all()
    
    @jwt_required()
    @role_required('admin')
    @blp.arguments(CategorySchema)
    @blp.response(201, CategorySchema)
    def post(self, category_data):
        """Create a category(admins only)"""
        category = CategoryModel(**category_data)
        try:
            db.session.add(category)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while inserting the category.")
        return category
    
@blp.route("/category/<int:category_id>")
class Category(MethodView):

    @blp.response(200, CategorySchema)
    def get(self, category_id):
        """Retrieve a category by id"""
        category = CategoryModel.query.get_or_404(category_id)
        return category
    

    @jwt_required()
    @role_required('admin')
    @blp.arguments(CategoryUpdateSchema)
    @blp.response(200, CategorySchema)
    def put(self, category_data, category_id):
        """Update a category by id(admins only)"""
        category = CategoryModel.query.get_or_404(category_id)
        for key, value in category_data.items():
            setattr(category, key, value)
            try:
                db.session.commit()
            except SQLAlchemyError:
                abort(500, message="An error occurred while updating the category.")
        return category
    
    @jwt_required()
    @role_required('admin')
    @blp.response(200, CategorySchema)
    def delete(self,category_id):
        """Delete a category by id(admins only)"""
        category = CategoryModel.query.get_or_404(category_id)
        if not category:
            abort(404, message="Category not found.")
        try:
            db.session.delete(category)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while deleting the category.")
        return {"message": "Category deleted successfully."}