import React from "react";
import styles from "./Cart/Cart.module.scss";
import AppContext from "../context/context";

const Info = ({img,title,description}) => {
    const {setCart} = React.useContext(AppContext);
    return (
        <div className={styles.emptyCart}>
            <img width={112} height={112} src={img}/>
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={()=>setCart(false)} className={styles.greenButton}>
                <img src='/img/backarrow.svg'/>
                Вернуться назад
            </button>
        </div>
    )
}


export default Info;