import './MainPage.css'

import {Link} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Header from './module/Header';
import Footer from './module/Footer';
const Catalog = () => {
    const token = localStorage.getItem('token');//получаем данные из localStorage   
    console.log('Token:', token); // Вывод токена в консоль
    let role = '';//создаём переменную для хранения роли пользователя
    if (token) {//если извлекли токен
        const decodedToken = jwtDecode(token);//декодируем токен
        role = decodedToken.role;//получаем из токена роль пользователя
    }
   
    const handleLogout = () => {
        localStorage.removeItem('token'); // Удаление токена при выходе
        window.location.reload(); // Перезагрузка страницы или перенаправление
    };
    return (
        <>

        <div className="block_one_main">    
        
        <Header/>

        <div className="div_block_one_block">
            <hr className='hr_one'/>
            <h1 className='h1_span'><span className='sp'>Кликни и едь: </span> <br />Драйв гоу! </h1>
            <hr className='hr_two'/>
            <p>Сервис для быстрого бронирования авто<br /> из нашего автопарка</p>
            
            <Link to='/register'><img src="/image/button.png" alt="" className='button_main'/></Link>
        </div>
        </div>
        <div className="block_two_main">
            <h1 className='title_block_two'>МЫ ПРЕДЛАГАЕМ</h1>
            <div className="div_main_two">
                <img src="/image/img_block_two.png" alt="" className='img_left'/>
            <div className="div_left_main">
                <div className="div_center_left">
                    <p>Разнообразие автомобилей</p>
                    <p>Гибкие условия аренды</p>
                    <p>Страхование </p>
                    <p>Доставка и возврат</p>
                    <p>Онлайн бронирование</p>
                </div>
                <div className="div_button">
                <Link to='/catalog'><img src="/image/button_catalog.png" alt="" /></Link>
                </div>
            </div>
            </div>
            
        </div>
        <div className="block_three_main">
           <div className="div_one_one">
            <div className="div_1">
            <h1 className='title_three'>586</h1>
            <h1 className='title_four'>ЧЕЛОВЕК СДЕЛАЛИ ПРЕДЗАКАЗ</h1>
            </div>
            <div className="div_2">
            <h1 className='title_three'>100</h1>
            <h1 className='title_four'>АВТОМОБИЛЕЙ В АВТОПАРКЕ</h1>
            </div>
           </div>
           <div className="div_two_two">
            <div className="div_3">
            <p className='p_3'>Нужен автомобиль? Это перестаёт быть проблемой, если вы<br /> обратитесь в нашу компанию, так как у нас вы можете арендовать<br /> автомобиль как легкового типа, так и микроавтобус.</p>
            </div>
            <div className="div_4">

            </div>
           </div>
           <div className="div_three_three">
           
            <div className="div_5">

            </div>
            <div className="div_6">
            <p className='p_3'>Прокат авто в Астрахани с компанией «Драйв гоу!» сбережет<br /> ваше время, силы и нервы. Наполнит ваше пребывание в<br /> Астрахани комфортом и удобством.</p>
            </div>
           </div>
        </div>
        <Footer/>
        </>
    );
}

export default Catalog;
