import React from 'react';
import Card from "./Components/Card";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Header/Header";
import './index.scss'
import axios from 'axios';

function App() {
    const [sneakers,setSneakers] = React.useState([]);
    const [sneakersInCart,setSneakersInCart] = React.useState([]);
    const [searchValue,setSearchValue] = React.useState('');
    const [cartOpened,setCart] = React.useState(false);
    React.useEffect(()=>{
        axios.get('https://6290d5cc665ea71fe13bc34b.mockapi.io/sneakers').then(res=>setSneakers(res.data))
        axios.get('https://6290d5cc665ea71fe13bc34b.mockapi.io/cart').then(res=>setSneakersInCart(res.data));

    },[])
    const onAddToCart = (sneaker) => {
        axios.post('https://6290d5cc665ea71fe13bc34b.mockapi.io/cart',sneaker)
        setSneakersInCart((prev)=>[...prev,sneaker])
    }
    const onRemoveSneaker = (id) => {
        axios.delete(`https://6290d5cc665ea71fe13bc34b.mockapi.io/cart/${id}`)
        setSneakersInCart((prev)=>prev.filter(sneaker => sneaker.id!== id));
    }

    const onChangeSearchInput = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <div className='wrapper clear'>
            {cartOpened && <Cart sneakers={sneakersInCart} onClose={()=>setCart(false)} onRemove={onRemoveSneaker}/>}
            <Header onCartClick = {()=>setCart(true)} />
            <div className='content p-40'>
                <div className='d-flex align-center justify-between mb-40'>
                    <h1>{searchValue ? `Поиск по запросу:"${searchValue}"`:`Все кроссовки`}</h1>
                    <div className='search-block d-flex'>
                        <img src='./img/searchicon.svg' />
                       <input onChange={onChangeSearchInput} placeholder='Поиск...' value={searchValue}/>
                        {searchValue && <img onClick={()=> setSearchValue('')} src='/img/deletebtn.svg' className='cu-p clear'/>}
                    </div>
                </div>


                <div className='sneakers d-flex justify-center'>
                    {sneakers.filter(element=>element.name.toLowerCase().includes(searchValue.toLowerCase())).map(element=><Card
                        key={element.img}
                        id={element.id}
                        name={element.name}
                        img={element.img}
                        price={element.price}
                        onClickFavourite={() => {console.log('Добавлено в закладки')}}
                        addToCart={(sneaker)=>{onAddToCart(sneaker)}}
                        />)}
                </div>
            </div>
        </div>
    );
}

export default App;
