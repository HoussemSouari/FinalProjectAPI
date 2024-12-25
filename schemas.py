from marshmallow import Schema, fields, validate


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()
    email = fields.Str()
    password = fields.Str(required=True,load_only=True)
    age = fields.Str(required=True)
    role_id = fields.Int()


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

class CategorySchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True) 


class UserUpdateSchema(Schema):
    name = fields.Str(required= False)
    email = fields.Str(required=False)
    password = fields.Str(required=False, validate=validate.Length(min=6))
    age = fields.Str(required=False)
    role_id = fields.Int()
