import React from "react";
import styles from './Card.module.scss'
const Card = (props) => {
    let [isAdded, setIsAdded] = React.useState(false);
    let [isAddedToFav,setFav] = React.useState(false);
    const addedToCart = () => {
        setIsAdded(!isAdded);
    }
    const addedToFav = () => {
        setFav(!isAddedToFav);
    }
    return (
        <div className={styles.card}>
            <div className={styles.favourite}>
                <img onClick={addedToFav} src={isAddedToFav ?'img/heartlike.svg' : 'img/heartdislike.svg'}/>
            </div>
            <img width={133} height={112} src={props.img} />
            <h5>{props.name}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>Цена:</span>
                    <b>{props.price}</b>
                </div>
                <button className='button' onClick={addedToCart}><img src={isAdded ? "/img/buttonchecked.svg": '/img/buttonunchecked.svg'}/></button>
            </div>
        </div>
    )
}
export default Card;