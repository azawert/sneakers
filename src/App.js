import React from 'react';
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Header/Header";
import Orders from "./pages/Orders";
import './index.scss'
import axios from 'axios';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import AppContext from "./context/context";

function App() {
    const [sneakers,setSneakers] = React.useState([]);
    const [sneakersInCart,setSneakersInCart] = React.useState([]);
    const [searchValue,setSearchValue] = React.useState('');
    const [favourites,setFavourites] = React.useState([]);
    const [cartOpened,setCart] = React.useState(false);
    const [isLoading,setIsLoading] = React.useState(true);


    React.useEffect(()=>{
        async function fetchData(){
            try {

                setIsLoading(true)
                const sneakersItems = await axios.get('https://6290d5cc665ea71fe13bc34b.mockapi.io/sneakers')
                const cartItems = await axios.get('https://6290d5cc665ea71fe13bc34b.mockapi.io/cart')
                const favItems = await axios.get('https://6290d5cc665ea71fe13bc34b.mockapi.io/favourites')

                setSneakers(sneakersItems.data)
                setSneakersInCart(cartItems.data)
                setFavourites(favItems.data)
                setIsLoading(false)
            } catch (error) {
                alert(error)
            }
        }
        fetchData();
    },[])
    const onAddToCart = (sneaker) => {
        console.log(sneaker)
        try{
            if(sneakersInCart.find((cartObj)=> Number(cartObj.id) === Number(sneaker.id))){
                axios.delete(`https://6290d5cc665ea71fe13bc34b.mockapi.io/cart/${sneaker.id}`)
                setSneakersInCart(prev => prev.filter(item=> item.id !== sneaker.id))

                console.log(sneaker.id)
                // axios.delete(`https://6290d5cc665ea71fe13bc34b.mockapi.io/favourites/${sneaker.id}`)
            } else {
                axios.post('https://6290d5cc665ea71fe13bc34b.mockapi.io/cart',sneaker)
                setSneakersInCart((prev)=>[...prev,sneaker])
            }

        } catch (error) {
            alert('Не удалось добавить в корзину!')
        }
    }
    const onRemoveSneaker = (id) => {
        axios.delete(`https://6290d5cc665ea71fe13bc34b.mockapi.io/cart/${id}`)
        setSneakersInCart((prev)=>prev.filter(sneaker => sneaker.id!== id));
    }
    const onAddToFavourites = async (sneaker) => {
        try {
            if(favourites.find(favSneaker=>favSneaker.id === sneaker.id)){
                axios.delete(`https://6290d5cc665ea71fe13bc34b.mockapi.io/favourites/${sneaker.id}`)
                setFavourites((prev)=>prev.filter(item => item.id!==sneaker.id))
            } else {
                const {data} = await axios.post('https://6290d5cc665ea71fe13bc34b.mockapi.io/favourites',sneaker)
                setFavourites((prev)=>[...prev,data])
            }
        } catch (error) {
            alert('Не удалось добавить в закладки')
        }

    }

    const onChangeSearchInput = (e) => {
        setSearchValue(e.target.value)
    }

    const isItemAdded = (img) => {
        return sneakersInCart.some((obj)=> obj.img===(img))
    }
    return (

        <AppContext.Provider value={{sneakers, sneakersInCart,searchValue,favourites,isItemAdded, setCart,setSneakersInCart}}>
            <div className='wrapper clear'>
                    {cartOpened && <Cart sneakers={sneakersInCart} onClose={() => setCart(false)} onRemove={onRemoveSneaker}
                    opened={true}/>}

                <Header onCartClick={() => setCart(true)}/>
                <Routes>
                    <Route path='/' exact
                           element=
                               {
                                   <Home sneakers={sneakers} searchValue={searchValue} setSearchValue={setSearchValue} onChangeSearchInput={onChangeSearchInput} onAddToFavourites={onAddToFavourites} onAddToCart={onAddToCart}
                                         sneakersInCart={sneakersInCart} isLoading={isLoading}/>}>

                    </Route>
                    <Route path='/favourites' element={<Favourites onAddToFavourites={onAddToFavourites} />}></Route>
                    <Route path='/orders' element={<Orders/>}></Route>
                </Routes>
            </div>
        </AppContext.Provider>

    );
}


export default App;
