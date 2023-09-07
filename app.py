from flask import Flask, render_template, url_for, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from model import *
from flask import session
import os
import re


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
    """good = [i.__dict__ for i in good][0]
    good.pop('_sa_instance_state')
    good.pop('photo')
    good.pop('good_id')"""
    good = db.session.query(Good).filter(Good.good_id == f'{goodID}').all()[0]

    return render_template('product_page.html', good=good)


@app.route('/cart', methods=['post', 'get'])
def cartPage():
    goods = []
    errors = []

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
        if 'username' in request.json:
            session['errors'] = []

            username = request.json['username']
            validation_username = re.findall(r'[А-Я][а-я]*', username)
            if len(validation_username) == 2:
                username = ' '.join(validation_username)
            else:
                errors.append('username')

            phone = request.json['phone']
            validation_phone = re.findall(r'\d{11}', phone)
            if len(validation_phone) != 1:
                errors.append('phone')

            address = request.json['address']
            method = request.json['method']

            if len(address) <= 0:
                errors.append('address')

            if len(errors) == 0:
                ids = [i[0].good_id for i in goods]
                titles = [i[0].title for i in goods]
                prices = [i[0].price for i in goods]
                counts = [i[1] for i in goods]
                fullPrice = 0
                for i in range(len(prices)):
                    fullPrice += prices[i] * counts[i]

                sale_info_item = sale_info(
                    sum=fullPrice,
                    username=username,
                    adress=address,
                    method=method,
                    telefhone=phone,
                )
                db.session.add(sale_info_item)
                db.session.commit()
                saleID = sale_info_item.id

                for i in range(len(ids)):
                    sale_good_item = sale_good(
                        good_id=ids[i],
                        id=saleID,
                        count=counts[i],
                    )
                    db.session.add(sale_good_item)
                    db.session.commit()

                if 'order' in session:
                    sessionOrder = session['order']
                    sessionOrder.append(saleID)
                    session['order'] = sessionOrder
                else:
                    session['order'] = [saleID]
                    session.modified = True
            else:
                session['errors'] = errors

    return render_template('cart_page.html', goods=goods)

@app.route('/order', methods=['post', 'get'])
def orderPage():
    orders = []
    if 'order' in session:
        for i in range(len(session['order'])):
            orders.append(
                [
                    db.session.query(
                        sale_info.sum,
                        sale_info.username,
                        sale_info.adress,
                        sale_info.method,
                        sale_info.telefhone,
                    ).filter(sale_info.id == f"{session['order'][i]}").all()[0]
                ]
            )
            orders[-1].append(
                    db.session.query(
                        sale_good.good_id,
                        sale_good.count,
                        Good.title,
                        Good.price,
                        Good.photo,
                    ).filter(
                        sale_good.id == f"{session['order'][i]}", sale_good.good_id == Good.good_id
                    ).group_by(
                        sale_good.good_id
                    ).all()
            )



    return render_template('order_page.html', orders=orders)


@app.route('/validationOrder', methods=['post', 'get'])
def validationOrder():
    if 'errors' in session:
        errors = {
            "errors": session['errors'],
        }
        return jsonify(errors)
    else:
        errors = {
            "errors": [],
        }
        return jsonify(errors)


if __name__ == '__main__':
    app.run()

