import Card from "../Components/Card";
import React from 'react'
function Home({sneakers,searchValue,onChangeSearchInput,setSearchValue,onAddToCart,onAddToFavourites}){
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
                {sneakers.filter(element=>element.name.toLowerCase().includes(searchValue.toLowerCase())).map(element=><Card
                    key={element.img}

                    addToFavourite={(sneaker) => {onAddToFavourites(sneaker)}}
                    addToCart={(sneaker)=>{onAddToCart(sneaker)}}
                    {...element}
                />)}
            </div>
        </div>
    )
}

export default Home;