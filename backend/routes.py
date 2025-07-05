from app import app, db
from flask import request, jsonify, url_for
from models import User, MenuItem, Order
import json
import os
from werkzeug.utils import secure_filename

# Define upload folder and ensure it exists
UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# ------------------- User Routes -------------------

@app.route("/api/users", methods=["GET"])
def get_users():
    users = User.query.all()
    result = [user.to_json() for user in users]
    return jsonify(result), 200

@app.route("/api/users", methods=["POST"])
def create_user():
    try:
        data = request.json
        required_fields = ["name", "password", "email"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f'missing required field {field}'}), 400

        new_user = User(
            name=data.get("name"),
            password=data.get("password"),
            email=data.get("email"),
            role=data.get("role")
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "user created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route("/api/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    try:
        user = User.query.get(id)
        if user is None:
            return jsonify({"error": "user not found"}), 404

        db.session.delete(user)
        db.session.commit()
        return jsonify({"msg": "user deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route("/api/users/<int:id>", methods=["PATCH"])
def update_user(id):
    try:
        user = User.query.get(id)
        if user is None:
            return jsonify({"error": "user not found"}), 404

        data = request.json
        user.name = data.get("name", user.name)
        user.email = data.get("email", user.email)
        user.password = data.get("password", user.password)
        user.role = data.get("role", user.role)

        db.session.commit()
        return jsonify(user.to_json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# ------------------- MenuItem Routes -------------------

@app.route("/api/menu-items", methods=["GET"])
def get_menu_items():
    items = MenuItem.query.all()
    return jsonify([item.to_json() for item in items]), 200

@app.route("/api/menu-items", methods=["POST"])
def add_menu_item():
    data = request.form
    file = request.files.get("image")

    image_url = None
    if file:
        try:
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            image_url = url_for('static', filename=f'uploads/{filename}', _external=True)
        except Exception as e:
            return jsonify({"error": f"File save failed: {str(e)}"}), 500

    new_item = MenuItem(
        name=data.get('name'),
        price=data.get('price'),
        availability=data.get('availability') == "true",
        image=image_url
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify(new_item.to_json()), 201

@app.route("/api/menu-items/<int:id>", methods=["DELETE"])
def delete_menu_item(id):
    try:
        menu_item = MenuItem.query.get(id)
        if menu_item is None:
            return jsonify({"error": "user not found"}), 404

        db.session.delete(menu_item)
        db.session.commit()
        return jsonify({"msg": "menu deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route("/api/menu-items/<int:id>", methods=["PATCH"])
def update_menu_item(id):
    try:
        menu_item = MenuItem.query.get(id)
        if menu_item is None:
            return jsonify({"error": "menu item not found"}), 404

        data = request.form
        file = request.files.get("image")

        if file:
            try:
                filename = secure_filename(file.filename)
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                menu_item.image = url_for('static', filename=f'uploads/{filename}', _external=True)
            except Exception as e:
                return jsonify({"error": f"File save failed: {str(e)}"}), 500

        menu_item.name = data.get("name", menu_item.name)
        menu_item.price = data.get("price", menu_item.price)
        if "availability" in data:
            menu_item.availability = data["availability"] == "true"

        db.session.commit()
        return jsonify(menu_item.to_json()), 200

    except Exception as e:
        print("ERROR", e)
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# ------------------- Orders Route ---------------------

@app.route("/api/orders", methods=["GET"])
def get_orders():
    email = request.args.get("email")
    if not email:
        return jsonify({"error": "Email required"}), 400

    orders = Order.query.filter_by(user_email=email).all()
    return jsonify([o.to_json() for o in orders]), 200

# @app.route("/api/orders", methods=["GET"])
# def get_orders():
#     email = request.args.get("email")
#     if email:
#         orders = Order.query.filter_by(user_email=email).all()  # No hidden filter for users
#     else:
#         orders = Order.query.filter_by(hidden=False).all()  # Admin sees only unhidden orders

#     return jsonify([o.to_json() for o in orders]), 200


# dedicated route for admin to see all orders

@app.route("/api/admin/orders", methods=["GET"])
def get_all_orders():
    orders = Order.query.all()
    return jsonify([o.to_json() for o in orders]), 200

# patching to hide the order 

@app.route("/api/orders/<int:order_id>/hide", methods=["PATCH"])
def hide_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404

    order.hidden = True
    db.session.commit()

    return jsonify({"msg": f"Order {order_id} hidden successfully"})


# posting an order 
@app.route("/api/orders", methods=["POST"])
def create_order():
    try:
        data = request.get_json()

        # Validate
        if "user_email" not in data or "items" not in data or "total_amount" not in data:
            return jsonify({"error": "Missing required fields"}), 400

        # Convert items to JSON string
        items_json = json.dumps(data["items"])

        new_order = Order(
            user_email=data["user_email"],
            items=items_json,
            total_amount=data["total_amount"],
            comment=data.get("comment"),
            addressDetails=data.get("addressDetails"),
            deliveryMode=data.get("deliveryMode"),
        )

        db.session.add(new_order)
        db.session.commit()

        return jsonify(new_order.to_json()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# ------------------- Admin Routes ---------------------

@app.route("/admin/fix-images", methods=["POST"])
def fix_images():
    secret = request.headers.get("X-ADMIN-SECRET")
    if secret != "your-secret-key":
        return jsonify({"error": "Unauthorized"}), 401
    try:
        items = MenuItem.query.all()
        count = 0
        for item in items:
            if item.image and "127.0.0.1" in item.image:
                filename = item.image.split("/")[-1]
                item.image = f"https://online-food-order-o3j3.onrender.com/static/uploads/{filename}"
                count += 1
                print(f"Updated item {item.id}: {item.image}")
        db.session.commit()
        return jsonify({"msg": "Image URLs updated.", "updated_count": count}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
