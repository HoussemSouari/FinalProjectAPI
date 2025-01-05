from extensions import db

class PromiseModel(db.Model):
    __tablename__ = 'promises'

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(20), default='Pending')
    description = db.Column(db.String(255), nullable=True) 
    title = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.Date,nullable=False)
    expected_to_end= db.Column(db.Date,nullable=False)
    budget = db.Column(db.Float,nullable=False) 
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  

    user = db.relationship('UserModel', back_populates='promises')  
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    region_id = db.Column(db.Integer, db.ForeignKey('regions.id'), nullable=False)

    category = db.relationship('CategoryModel', back_populates='promises')
    region = db.relationship('RegionModel', back_populates='promises')

