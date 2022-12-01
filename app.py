from flask import Flask, render_template, url_for, request
from flask_sqlalchemy import SQLAlchemy
from model import *
from flask import session
import os








@app.route('/', methods=['post', 'get'])
def main():



    goods = db.session.query(Good.good_id, Good.title,  Good.price, Good.photo).all()

    if 'cart' not in session:
        keys = [str(i.good_id) for i in goods]
        session['cart'] = dict.fromkeys(keys, 0)
        session.modified = True

    if request.method == 'POST':
        goodID = request.form['good_id']
        newDict = session['cart']
        newDict[goodID] += 1
        session['cart'] = newDict



    return render_template('main.html', goods=goods)


@app.route('/product-page', methods=['post', 'get'])
def productPage():
    goodID = ''
    if request.method == 'GET':
        goodID = request.args.get('good_id')

    if request.method == 'POST':
        goodID = request.form['good_id']
        newDict = session['cart']
        newDict[goodID] += 1
        session['cart'] = newDict



    #good = db.session.query(Good).filter(Good.good_id == f'{goodID}')

    #good = Good.query.all()
    """
    good = [i.__dict__ for i in good][0]
    good.pop('_sa_instance_state')
    good.pop('photo')
    good.pop('good_id')"""
    good = db.session.query(Good).filter(Good.good_id == f'{goodID}').all()[0]

    return render_template('product_page.html', good=good)


@app.route('/cart', methods=['post', 'get'])
def cartPage():
    goods = []
    try:
        for key in list(session['cart'].keys()):
            if session['cart'][key] > 0:
                good = db.session.query(Good).filter(Good.good_id == key).all()
                good.append(session['cart'][key])
                goods.append(good)
    except KeyError:
        pass

    if request.method == 'POST':
        if 'cart-good-id' in request.json:
            goodID = request.json['cart-good-id']
            newDict = session['cart']
            newDict[goodID] = 0
            session['cart'] = newDict
        if 'good-id' in request.json:
            goodID = request.json['good-id']
            count = request.json['count-cart']
            newDict = session['cart']
            newDict[goodID] = int(count)
            session['cart'] = newDict


    return render_template('cart_page.html', goods=goods)


if __name__ == '__main__':
    app.run()

