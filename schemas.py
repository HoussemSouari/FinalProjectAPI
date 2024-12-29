from marshmallow import Schema, fields, validate


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()
    email = fields.Str()
    password = fields.Str(required=True,load_only=True)
    age = fields.Int(required=True)
    role_id = fields.Int()

class ReturnPromiseSchema(Schema) :
    id = fields.Int(dump_only=True)
    status = fields.Str()
    description = fields.Str()  
    title = fields.Str() 
    category_name = fields.String(attribute='category.name', dump_only=True)
    region_name = fields.String(attribute='region.name', dump_only=True)  

class PromiseSchema(Schema):
    id = fields.Int(dump_only=True) 
    status = fields.Str()
    description = fields.Str()  
    title = fields.Str()  
    user_id = fields.Int() 
    category_id = fields.Int()
    region_id = fields.Int() 


class PromiseUpdateSchema(Schema):
    status = fields.Str(required=True)


class RegionSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)  
    latitude = fields.Float(required=True)  
    longitude = fields.Float(required=True)
class CategorySchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)

class CategoryUpdateSchema(Schema):
    name = fields.Str(required=False)


class UserUpdateSchema(Schema):
    name = fields.Str(required= False)
    email = fields.Str(required=False)
    password = fields.Str(required=False, validate=validate.Length(min=6))
    age = fields.Str(required=False)
    role_id = fields.Int()
