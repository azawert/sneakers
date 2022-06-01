import React from "react";
import styles from './Card.module.scss'
import ContentLoader from "react-content-loader";
const Card = ({addToCart,img,name,price,id,addToFavourite,favourited = false,added = false,loading=false}) => {
    let [isAdded, setIsAdded] = React.useState(added);
    let [isAddedToFav,setFav] = React.useState(favourited);
    const addedToCart = () => {
        (addToCart({id,img,name,price}))
        setIsAdded(!isAdded);
    }
    const addedToFav = () => {

        (addToFavourite({img,name,price,id}))
        setFav(!isAddedToFav);
    }
    return (
        <div className={styles.card}>
            {
                loading ? <ContentLoader
                    speed={2}
                    width={165}
                    height={265}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader> : <>
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
                        <button className='button' onClick={addedToCart  }><img src={isAdded ? "/img/buttonchecked.svg": '/img/buttonunchecked.svg'}/></button>
                    </div>
                </>
            }

        </div>
    )
}
export default Card;