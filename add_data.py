from app import app, db
from models import RegionModel, CategoryModel, PromiseModel, UserModel

# Open Flask application context to use the database
with app.app_context():


    # Add Tunisia States with Latitude and Longitude
    regions = [
        RegionModel(name='Tunis', latitude=36.8065, longitude=10.1815),
        RegionModel(name='Ariana', latitude=36.8664, longitude=10.1411),
        RegionModel(name='Ben Arous', latitude=36.7341, longitude=10.1505),
        RegionModel(name='Manouba', latitude=36.7985, longitude=9.9876),
        RegionModel(name='Bizerte', latitude=37.2761, longitude=9.8734),
        RegionModel(name='Nabeul', latitude=36.4567, longitude=10.7323),
        RegionModel(name='Zaghouan', latitude=36.4024, longitude=10.1024),
        RegionModel(name='Beja', latitude=36.7303, longitude=9.1834),
        RegionModel(name='Jendouba', latitude=36.5000, longitude=8.7800),
        RegionModel(name='Kairouan', latitude=35.6753, longitude=10.0981),
        RegionModel(name='Kasserine', latitude=35.1667, longitude=8.6000),
        RegionModel(name='Sidi Bouzid', latitude=35.0333, longitude=9.4667),
        RegionModel(name='Sfax', latitude=34.7405, longitude=10.7601),
        RegionModel(name='Gabes', latitude=33.8833, longitude=10.0999),
        RegionModel(name='Medinine', latitude=33.3583, longitude=10.5025),
        RegionModel(name='Tataouine', latitude=32.9300, longitude=10.5014),
        RegionModel(name='Tozeur', latitude=33.9167, longitude=8.1333),
        RegionModel(name='Gafsa', latitude=34.4250, longitude=8.7783),
        RegionModel(name='Sousse', latitude=35.8256, longitude=10.6367),
        RegionModel(name='Monastir', latitude=35.7719, longitude=10.8231),
        RegionModel(name='Mahdia', latitude=35.5069, longitude=11.0623),
        RegionModel(name='Siliana', latitude=36.0749, longitude=9.3761),
        RegionModel(name='Kebili', latitude=33.7089, longitude=8.9761),
    ]

    db.session.add_all(regions)

    # Add categories (assuming you have a Category model similar to Region)
    categories = [
        CategoryModel(name='Health'),
        CategoryModel(name='Education'),
        CategoryModel(name='Infrastructure'),
        CategoryModel(name='Security')
    ]
    db.session.add_all(categories)

    users = [
        UserModel(name='houssem',email='houssem@gmail.com',password='123456',age=23,role_id=1)
    ]
    db.session.add_all(users)
    # Commit to the database
    db.session.commit()

    print("Sample data added successfully!")
