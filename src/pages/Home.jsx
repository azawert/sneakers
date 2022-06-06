import Card from "../Components/Card";
import React from 'react';
import ContentLoader from "react-content-loader";
import AppContext from "../context/context";
function Home({sneakers,searchValue,onChangeSearchInput,setSearchValue,onAddToCart,onAddToFavourites,sneakersInCart,isLoading}){
    const {isItemAdded} = React.useContext(AppContext);
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
    const renderSneakers = () => {
        const filteredItems = sneakers && sneakers.filter(sneaker=>sneaker.name.toLowerCase().includes(searchValue.toLowerCase()))
       return isLoading ? newArr : filteredItems.map((element)=>
           <Card
            key={element.img}
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