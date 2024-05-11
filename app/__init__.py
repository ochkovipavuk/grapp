from flask import Flask # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///grapp.db'
db = SQLAlchemy(app)

from app import routes
