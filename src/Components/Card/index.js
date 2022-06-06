import React from "react";
import styles from './Card.module.scss'
import AppContext from "../../context/context";
const Card = ({addToCart,img,name,price,id,addToFavourite,favourited = false}) => {

    const {isItemAdded} = React.useContext(AppContext)
    let [isAddedToFav,setFav] = React.useState(favourited);
    const addedToCart = () => {
        (addToCart({id,img,name,price}))
    }
    const addedToFav = () => {

        (addToFavourite({img,name,price,id}))
        setFav(!isAddedToFav);
    }
    return (
        <div className={styles.card}>
                    <div className={styles.favourite}>
                        <img onClick={addedToFav} src={isAddedToFav ?'img/heartlike.svg' : 'img/heartdislike.svg'}/>
                    </div>
                    <img width={133} height={112} src={img} />
                    <h5>{name}</h5>
                    <div className='d-flex justify-between align-center'>
                        <div className='d-flex flex-column'>
                            <span>Цена:</span>
                            <b>{price}</b>
                        </div>
                        <button className='button' onClick={addedToCart  }><img src={isItemAdded(img) ? "/img/buttonchecked.svg": '/img/buttonunchecked.svg'}/></button>
                    </div>
        </div>
    )
}
export default Card;