import React from 'react'
import './payment.css'
import { useCart } from "react-use-cart";
import axiosAll from '../../other/axiosAll';

const Payment = () => {
    const {
        items,
        cartTotal,
    } = useCart();

    const userId = localStorage.hasOwnProperty('user') ? (JSON.parse(localStorage.getItem("user") || '{}')).id : '';
    const orderItems = JSON.stringify(items);

    const handleClick = () => {
        try {
            axiosAll.post('orderitem',
                JSON.stringify({ orderItems, cartTotal, userId }),
            );
            localStorage.removeItem('react-use-cart')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        < div className='payment-container' >
            <div className="payment-total">
                <h1>Total: ${cartTotal} </h1>
            </div>
            <div className="payment">
                <div className="payment-wrapper">
                    <div className="outer-card">
                        <img src='https://www.theorchardcottage.co.nz/wp-content/uploads/2018/09/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos.png' />
                        <div className="forms">
                            <div className="input-items">
                                <span>Card Number</span>
                                <input placeholder=".... .... .... ...." data-slots="." data-accept="\d" />
                            </div>
                            <div className="input-items">
                                <span>Name on card</span>
                                <input placeholder="Name on card" />
                            </div>
                            <div className="one-line">
                                <div className="input-items">
                                    <span>Expiry Date</span>
                                    <input placeholder="mm/yyyy" data-slots="my" />
                                </div> <div className="input-items">
                                    <span>CVV</span>
                                    <input placeholder="..." data-slots="." data-accept="\d" />
                                </div>
                            </div>

                            <div className="input-buttons">
                                <button onClick={handleClick}><a href="/paysuccessful">Save Changes</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Payment