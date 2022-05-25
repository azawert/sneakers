import Card from "./Components/Card";
import Cart from "./Components/Cart";
import Header from "./Components/Header";
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
                    <Card name='Кроссовки Puma X Aka Boku Future Rider' price='12 999 руб.' img='/img/sneakers/1.jpg'/>
                    <Card name='Мужские Кроссовки Nike Blazer Mid Suede' price='12 999 руб.' img='/img/sneakers/2.jpg'/>
                    <Card name='Мужские Кроссовки Nike Blazer Mid Suede' price='8 999 руб.' img='/img/sneakers/3.jpg'/>
                   <Card name='Мужские Кроссовки Nike Air Max 270' price='12 999 руб.' img='/img/sneakers/4.jpg'/>
                </div>
            </div>
        </div>
    );
}

export default App;
