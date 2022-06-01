import Card from "../Components/Card";
import React from 'react'
function Home({sneakers,searchValue,onChangeSearchInput,setSearchValue,onAddToCart,onAddToFavourites,sneakersInCart,isLoading}){
    const renderSneakers = () => {
        const filteredItems = sneakers && sneakers.filter(sneaker=>sneaker.name.toLowerCase().includes(searchValue.toLowerCase()))
       return isLoading ? [...Array(10)]: filteredItems.map((element)=>
           <Card
            key={element.img}
            added={sneakersInCart.some(item => item.img===element.img )}
            addToFavourite={(sneaker) => {onAddToFavourites(sneaker)}}
            addToCart={(sneaker)=>{onAddToCart(sneaker)}}
            loading={false}
            {...element}
        />)
    }
    return (
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
                {renderSneakers()}
            </div>
        </div>
    )
}

export default Home;