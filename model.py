from flask import Flask, render_template, url_for, request
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(30).hex()
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shop.db'
db = SQLAlchemy(app)
app.secret_key = os.urandom(30).hex()

class Good(db.Model):
    good_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    photo = db.Column(db.String(50), nullable=False)

    weight = db.Column(db.String(100), nullable=False)
    connection = db.Column(db.String(100), nullable=False)
    os = db.Column(db.String(100), nullable=False)
    cardSlot = db.Column(db.String(100), nullable=False)
    processor = db.Column(db.String(100), nullable=False)
    battery = db.Column(db.String(100), nullable=False)
    camera = db.Column(db.String(100), nullable=False)
    memory = db.Column(db.String(100), nullable=False)
    ram = db.Column(db.String(100), nullable=False)
    display = db.Column(db.String(100), nullable=False)


class sale_good(db.Model):
    good_id = db.Column(db.Integer, db.ForeignKey('good.good_id'), primary_key=True)
    id = db.Column(db.Integer,  db.ForeignKey('sale_info.id'), primary_key=True)
    count = db.Column(db.Integer)


class sale_info(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    sum = db.Column(db.Integer)
    username = db.Column(db.String(100), nullable=False)
    adress = db.Column(db.String(100), nullable=False)
    method = db.Column(db.String(100), nullable=False)
    telefhone = db.Column(db.String(100), nullable=False)
