from app import db 
from datetime import datetime
import json

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(20), nullable=False)
    role = db.Column(db.String(20), nullable=False, default="user")


    ##when you send data to client you want to make it json
    def to_json(self):
        return {
            "id":self.id,
            "name":self.name,
            "password":self.password,
            "email":self.email,
            "role":self.role
        }
    
class MenuItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=True)
    image = db.Column(db.String(255), nullable=True)
    price = db.Column(db.Float, nullable=False)
    availability = db.Column(db.Boolean, nullable=False, default=True)
    # drink = db.Column(db.Boolean, nullable=True, default=True)


    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "price": self.price,
            "availability": self.availability
            # "drink":self.drink
        }
    

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String, nullable=False)
    items = db.Column(db.Text, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    addressDetails = db.Column(db.Text, nullable=True)
    transaction_reference = db.Column(db.String(100), nullable=True)
    deliveryMode = db.Column(db.String, nullable=True)
    hidden = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_json(self):
        return {
            "id": self.id,
            "user_email": self.user_email,
            "items": json.loads(self.items),
            "total_amount": self.total_amount,
            "comment": self.comment,
            "deliveryMode": self.deliveryMode,
            "addressDetails": self.addressDetails,
            "transaction_reference": self.transaction_reference,
            "hidden": self.hidden,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }