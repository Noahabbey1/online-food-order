from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL',
    'sqlite:///friends.db'
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Try importing routes with debug
try:
    import routes
    print("✅ Routes imported successfully.")
except Exception as e:
    print("❌ Error importing routes:", e)

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return "Flask backend is running!"

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)