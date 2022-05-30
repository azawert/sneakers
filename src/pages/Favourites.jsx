import React from 'react'
import Card from "../Components/Card";
import '../index.scss'
import {Link} from 'react-router-dom'
function Favourites({sneakers,onAddToFavourites}){

    return (
        <div className='content p-40'>
            <div className='d-flex align-center justify-between mb-40'>
            <h1>Мои закладки</h1>
            </div>
            {sneakers.length>0?<div className='sneakers d-flex justify-center'>
                {sneakers.map(element=><Card
                    key={element.img}
                    favourited={true}
                    addToFavourite={(element)=>onAddToFavourites(element)}
                    {...element}
                />)}
            </div>: <div className='mb-50 d-flex flex-column align-center noFav'>
                <img src='/img/sadface.svg'/>
                <h1>Закладок нет :(</h1>
                <p className='opacity-5'>Вы ничего не добавляли в закладки</p>
                <Link to='/'>
                    <button  className='greenButton'>
                        Вернуться назад
                    </button>
                </Link>

            </div>}
        </div>

    )
}

export default Favourites;