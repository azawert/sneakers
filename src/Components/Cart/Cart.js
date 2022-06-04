import styles from './Cart.module.scss'
import React from "react";
import Info from "../Info";
import AppContext from "../../context/context";
import axios from "axios";
import '../../index.scss'

const delay = () => new Promise((resolve)=> setTimeout(resolve,1000));

const Cart = ({onClose,sneakers,onRemove}) => {
    const {sneakersInCart,setSneakersInCart} = React.useContext(AppContext)
    const [orderId,setOrderId] = React.useState(null);
    const [isOrderCompleted,setIsOrderCompleted] = React.useState(false);
    const [isLoading,setIsLoading] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post('https://6290d5cc665ea71fe13bc34b.mockapi.io/orders', {items: sneakersInCart})
            setOrderId(data.id);
            setIsOrderCompleted(true);
            setSneakersInCart([]);

            for (let i = 0; i<sneakersInCart.length;i++) {
                const sneaker = sneakersInCart[i];
                await axios.delete('https://6290d5cc665ea71fe13bc34b.mockapi.io/cart/'+sneaker.id)
                await delay();
            }

        } catch {
            alert('Unlucky :(')
        }
        setIsLoading(false);
    }

    return <div className={styles.overlay}>
        <div className={styles.cart}>
            <h2 className='mb-30 d-flex justify-between align-center'>Корзина
                <svg onClick={onClose} width="25" height="25" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.0799 7.61553L6.6311 5.16673L9.07982 2.71801C10.0241 1.77376 8.55964 0.309342 7.61539 1.25359L5.16668 3.70231L2.71787 1.2535C1.77384 0.309466 0.309467 1.77384 1.2535 2.71787L3.70231 5.16668L1.25359 7.61539C0.309343 8.55964 1.77376 10.0241 2.71801 9.07982L5.16673 6.6311L7.61553 9.0799C8.55969 10.0241 10.0241 8.55969 9.0799 7.61553Z" fill="#B5B5B5"/>
                </svg>
            </h2>
            {
                sneakers.length>0 ? <div className={styles.items}>
                    {
                        sneakers.map(sneaker => (
                            <div key={sneaker.id} className={styles.cartItem}>
                                <div
                                    style={{backgroundImage:`url(${sneaker.img})`}} className={styles.cartItemImg}></div>
                                <div className='mr-20 flex'>
                                    <p className='mb-5'>{sneaker.name}</p>
                                    <b>{sneaker.price} руб.</b>
                                </div>
                                <img className={styles.deleteBtn}  src='/img/deletebtn.svg' onClick={()=>{onRemove(sneaker.id)}} alt='remove' />
                            </div>

                        ))



                    }
                    <div className={styles.cartTotalBlock}>
                        <ul>
                            <li className='d-flex justify-between mb-10'>
                                <span>Итого:</span>
                                <div></div>
                                <b>21 498 руб. </b>
                            </li>
                            <li className='d-flex justify-between'>
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>1074 руб. </b>
                            </li>
                        </ul>

                        <button disabled={isLoading} onClick={onClickOrder}
                         className={styles.greenButton}>Оформить заказ <img src='/img/arrow.svg' alt='arrow'/></button>

                    </div>
                </div> : <Info title={isOrderCompleted? 'Заказ оформлен!':'Корзина пустая'} description={isOrderCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`:'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'} img={isOrderCompleted? '/img/order.svg':'/img/emptycart.jpg'}/>
            }


        </div>
    </div>
}

export default Cart;