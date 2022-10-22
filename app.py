from flask import Flask, render_template, url_for, request
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config ['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shop.db'
db = SQLAlchemy(app)


#console comands
"""
python
from app import db
db.create_all()
exit()
"""

class Good(db.Model):
    good_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    photo = db.Column(db.String(50), nullable=False)







@app.route('/', methods=['post', 'get'])
@app.route('/home', methods=['post', 'get'])
def main():
    goods = db.session.query(Good.good_id, Good.title,  Good.price, Good.photo).all()
    return render_template('main.html', goods=goods)


@app.route('/product-page', methods=['post', 'get'])
def productPage():
    goodID = ''
    if request.method == 'POST':
        goodID = request.form.get('good_id')

    good = db.session.query(Good.good_id, Good.title,  Good.price, Good.photo).filter(Good.good_id == f'{goodID}').all()
    return render_template('product_page.html', good=good)


if __name__ == '__main__':

    app.run(debug=True)
