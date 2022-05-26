import styles from './Card.module.scss'
const Card = (props) => {
    return (
        <div className={styles.card}>
            <div className={styles.favourite}>
                <img src='img/heartdislike.svg'/>
            </div>
            <img width={133} height={112} src={props.img} />
            <h5>{props.name}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>Цена:</span>
                    <b>{props.price}</b>
                </div>
                <button className='button' onClick={props.onClick}><img src='/img/buttonunchecked.svg'/></button>
            </div>
        </div>
    )
}
export default Card;