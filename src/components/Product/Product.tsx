import React, { useState, useEffect, useContext } from 'react'
import './product.css'
import axiosAll from '../../other/axiosAll'
import { useCart } from 'react-use-cart'
import { Link } from 'react-router-dom';
import { products } from '../../other/model'
import NotificationContext from '../../other/NotificationContext';
import Notification from '../Notification/Notification';

const Product = () => {
    const { addItem } = useCart();
    const [products, setProducts] = useState<products>([] as any)
    const { notificationHandler } = useContext(NotificationContext);

    useEffect(() => {
        try {
            axiosAll.get("getSixproduct")
                .then((response => {
                    setProducts(response.data)
                }))

        } catch (error) {
            console.log(error)
        }
    }, [])

    return (

        <section className="products" id="products">
            <Notification />
            <h1 className="heading"><a href='/product'><span>our products</span></a></h1>
            <div className="box-container">
                {products.map((product) => {
                    return (
                        <div className="box" key={product.id}>
                            <div className="icons">
                                <a className="fas fa-shopping-cart" onClick={() => {
                                    addItem(product);
                                    notificationHandler({ type: 'success', message: 'Add Product successfully' });
                                }}></a>
                                <a href="#" className="fas fa-heart"></a>
                                <a href="#" className="fas fa-eye"></a>
                            </div>
                            <Link to={'product/' + product.id} className="image">
                                <img src={product.image} alt={product.productName} />
                            </Link>
                            <div className="content">
                                <h3>{product.productName}</h3>
                                <div className="stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                </div>
                                <div className="price">$ {product.price} <span>$20.99</span></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>

    )
}

export default Product