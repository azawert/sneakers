import React from 'react';
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Header/Header";
import './index.scss'
import axios from 'axios';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";

const AppContext = React.createContext({})

function App() {
    const [sneakers,setSneakers] = React.useState([]);
    const [sneakersInCart,setSneakersInCart] = React.useState([]);
    const [searchValue,setSearchValue] = React.useState('');
    const [favourites,setFavourites] = React.useState([]);
    const [cartOpened,setCart] = React.useState(false);
    const [isLoading,setIsLoading] = React.useState(true);

    React.useEffect(()=>{
        async function fetchData(){
            setIsLoading(true)
            const sneakersItems = await axios.get('https://6290d5cc665ea71fe13bc34b.mockapi.io/sneakers')
            const cartItems = await axios.get('https://6290d5cc665ea71fe13bc34b.mockapi.io/cart')
            const favItems = await axios.get('https://6290d5cc665ea71fe13bc34b.mockapi.io/favourites')

            setSneakers(sneakersItems.data)
            setSneakersInCart(cartItems.data)
            setFavourites(favItems.data)
            setIsLoading(false)
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

    return (

        <div className='wrapper clear'>
            {cartOpened && <Cart sneakers={sneakersInCart} onClose={() => setCart(false)} onRemove={onRemoveSneaker}/>}
            <Header onCartClick={() => setCart(true)}/>
            <Routes>
                <Route path='/' exact
                       element=
                           {
                                      <Home sneakers={sneakers} searchValue={searchValue} setSearchValue={setSearchValue} onChangeSearchInput={onChangeSearchInput} onAddToFavourites={onAddToFavourites} onAddToCart={onAddToCart}
                                       sneakersInCart={sneakersInCart} isLoading={isLoading}/>}>

                </Route>
                <Route path='/favourites' element={<Favourites sneakers={favourites} onAddToFavourites={onAddToFavourites} />}></Route>
            </Routes>
        </div>

    );
}


export default App;
