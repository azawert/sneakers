import React from 'react';
import Card from "./Components/Card";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Header/Header";
const arr = [
    {
        name:'Кроссовки Puma X Aka Boku Future Rider',
        price:'12 999 руб.',
        img:'/img/sneakers/1.jpg'
    },
    {
        name:'Мужские Кроссовки Nike Blazer Mid Suede',
        price:'11 599 руб.',
        img:'/img/sneakers/2.jpg'
    }
]

function App() {

    return (
        <div className='wrapper clear'>

            <Cart/>
            <Header/>
            <div className='content p-40'>
                <div className='d-flex align-center justify-between mb-40'>
                    <h1>Все кроссовки</h1>
                    <div className='search-block d-flex'>
                        <img src='./img/searchicon.svg' />
                        <input placeholder='Поиск...'/>
                    </div>
                </div>


                <div className='sneakers d-flex justify-center'>
                    {arr.map(element=><Card name={element.name} img={element.img} price={element.price} onClickFavourite={() => {console.log('Добавлено в закладки')}}
                      addToCart={()=>{console.log('добавлено в корзину')}}/>)}
                </div>
            </div>
        </div>
    );
}

export default App;
