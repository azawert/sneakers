import styles from './Header.module.scss'
import {Link} from 'react-router-dom'

const Header = (props) => {
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
                <span>1205 руб.</span>
            </li>
            <li>
                <Link to='/favourites'>
                <img src='img/favicon.svg' width={20} height={20} className='mr-30 cu-p'/>
                </Link>
            </li>
            <li>
                <img src='img/user.svg' width={20} height={20}/>
            </li>
        </ul>

    </header>
}

export default Header;