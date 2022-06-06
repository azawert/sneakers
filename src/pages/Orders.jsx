import React from 'react'
import Card from "../Components/Card";
import '../index.scss'
import {Link} from 'react-router-dom'
import AppContext from "../context/context";
import axios from "axios";
import ContentLoader from "react-content-loader";
const arr =[...Array(10)];
const newArr = arr.map(el=> {
    return <ContentLoader
        speed={2}
        width={205}
        height={295}
        viewBox="0 0 205 295"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
        <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
        <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
        <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
        <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
    </ContentLoader>
})
function Orders({onAddToFavourites}){
    const [orders,setOrders] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(true)
    React.useEffect(()=> {
        (async()=> {
            try {
                const {data} = await axios.get('https://6290d5cc665ea71fe13bc34b.mockapi.io/orders')

                setOrders(data.reduce((prev,obj)=>[...prev,...obj.items],[]))
                setIsLoading(false);
            } catch(error) {
                alert(`Произошла ошибка:${error}`)
            }
        })()

    },[])

    return (
        <div className='content p-40'>
            <div className='d-flex align-center justify-between mb-40'>
                <h1>Мои заказы</h1>
            </div>
            {isLoading? newArr : (orders.length>0?<div className='sneakers d-flex justify-center'>
                {orders.map((element,index)=><Card
                    key={index}
                    favourited={false}
                    loading={isLoading}
                    {...element}
                />)}
            </div>: <div className='mb-50 d-flex flex-column align-center noFav'>
                <img src='/img/sadfaceorders.png'/>
                <h1>У вас нет заказов</h1>
                <p className='opacity-5'>Вы нищеброд? Оформите хотя бы один заказ.</p>

                <Link to='/'>
                    <button  className='greenButton'>
                        Вернуться назад
                    </button>
                </Link>

            </div>)}
        </div>

    )
}

export default Orders;