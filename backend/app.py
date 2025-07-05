from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__) # part of the configurations 
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL',
    'sqlite:///friends.db'
)  #this will be created locally
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False # for faster performance
db = SQLAlchemy(app)

import routes

with app.app_context(): # configuration you shd add so that sqlalchemy will do its job in an optimised way 
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000) # the debug true helps us have a better debugging in our console 


@app.route("/")
def home():
    return "Flask backend is running!"
