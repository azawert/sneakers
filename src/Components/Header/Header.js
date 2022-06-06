import styles from './Header.module.scss'
import {Link} from 'react-router-dom'
import AppContext from "../../context/context";
import React from 'react';
const Header = (props) => {
    const {sneakersInCart} = React.useContext(AppContext);
    const sum = (sneakersInCart.reduce((sum,obj)=>sum+obj.price,0));
    return <header className='d-flex justify-between align-center p-40'>
        <div className='d-flex align-center'>
            <Link to='/'>
                <img width={40} height={40} src='img/logo.png' alt='Logo' className='mr-15'/>
                <div className='headerInfo'>
                    <h3 className='text-uppercase'>React Sneakers</h3>
                    <p className='opacity-5'>Магазин лучших кроссовок</p>
                </div>
            </Link>
        </div>

        <ul className='d-flex'>
            <li className='mr-30 d-flex align-center cu-p' onClick={props.onCartClick}>
                <img src='img/cart.svg' className='mr-10' />
                <span>{sum} руб.</span>
            </li>
            <li>
                <Link to='/favourites'>
                <img src='img/favicon.svg' width={20} height={20} className='mr-30 cu-p'/>
                </Link>
            </li>
            <li>
                <Link to='/orders'>
                    <img src='img/user.svg' width={20} height={20}/>
                </Link>

            </li>
        </ul>

    </header>
}

export default Header;