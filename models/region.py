from extensions import db

class RegionModel(db.Model):
    __tablename__ = 'regions'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)
    latitude = db.Column(db.Float, nullable=False)  
    longitude = db.Column(db.Float, nullable=False)

    promises = db.relationship('PromiseModel', back_populates='region')

