import React from 'react';
import Card from "./Components/Card";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Header/Header";


function App() {
    const [sneakers,setSneakers] = React.useState([]);
    const [sneakersInCart,setSneakersInCart] = React.useState([{
        title:'Мужские кроссовки Nike Blazer Mid Suede',
        img:'/img/sneakers/1.jpg',
        price:'12339'
    }]);
    const [cartOpened,setCart] = React.useState(false);
    React.useEffect(()=>{
        fetch('https://6290d5cc665ea71fe13bc34b.mockapi.io/sneakers').then(response => {return response.json()})
            .then(json=>{setSneakers(json)})
    },[])
    return (
        <div className='wrapper clear'>
            {cartOpened && <Cart sneakers={sneakersInCart} onClose={()=>setCart(false)}/>}
            <Header onCartClick = {()=>setCart(true)} />
            <div className='content p-40'>
                <div className='d-flex align-center justify-between mb-40'>
                    <h1>Все кроссовки</h1>
                    <div className='search-block d-flex'>
                        <img src='./img/searchicon.svg' />
                        <input placeholder='Поиск...'/>
                    </div>
                </div>


                <div className='sneakers d-flex justify-center'>
                    {sneakers.map(element=><Card name={element.name} img={element.img} price={element.price} onClickFavourite={() => {console.log('Добавлено в закладки')}}
                      addToCart={()=>{console.log('добавлено в корзину')}}/>)}
                </div>
            </div>
        </div>
    );
}

export default App;
