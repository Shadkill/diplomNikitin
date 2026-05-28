import './MainPage.css'

import {Link} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
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
        <header className='header'>
                <div className='header_div'>
                    <div className="div_top_header">
                <Link to='/'><img src="/image/logo.png" alt=""  className='logo'/></Link>
                {role==='admin'? <Link to='/adminPanel'>Админ панель</Link> :<Link to='/catalog'>Каталог</Link>}
                    {token? <button onClick={handleLogout} className='button_log_out'>Выйти</button> : <Link to='/register'>Аккаунт</Link>  }
                    
                    {role==='admin'? <Link to='/bid'>Заявки</Link> : <Link to={`/booking`}>Бронирование</Link>}  
                    </div>
                    <div className='right_div'>
                        
                    <div className='geo_div'>
                        <img src="/image/map.png" alt="" className='map_geo'/>
                        <p>г.Астрахань</p>
                    </div>
                    </div>
                    </div>
            </header>


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
        <footer>
            <div className="div_footer_left">
                <div className="div_pol">
                     <div className="div_docs">
            <h1 className='title_footer'>Документация</h1>
            <Link to={'/politika'} className='p_footer'>Политика конфиденциальности</Link>
            <Link to={'/rules'} className='p_footer'>Правила</Link>
            <Link to={'/map_sait'} className='p_footer'>Карта сайта</Link>
            </div>
            <div className="div_user">
            <h1 className='title_footer'>Пользователю</h1>
            <Link to={'/auth'} className='p_footer'>Регистрация</Link>
            <Link to={'/booking'} className='p_footer'>Бронирования автомобиля</Link>
            </div>
                </div>
           
            <div className="div_contacts">
                <h1 className='title_footer'>Контакты</h1>
                <p className='p_footer'>Телефон: +7 (912) 123-45-67</p>
                <p className='p_footer'>Email:  drivego@yandex.com</p>
                <p className='p_footer'>Адрес: г. Астрахань, ул. Пролетарская, д. 12</p>
            </div>
            <hr className='hr_footer'/>
            <p className='p_footer'>(с) 2012-2026 “Драйв гоу!” - аренда автомобилей в Астрахани</p>
            </div>
            <div className="div_footer_right">
<div ><a href="https://yandex.ru/maps/org/drive_elit/31595452529/?utm_medium=mapframe&utm_source=maps" >Drive elit</a><a href="https://yandex.ru/maps/37/astrahan/category/electric_transport_store/66350561707/?utm_medium=mapframe&utm_source=maps" >Магазин электротранспорта в Астрахани</a>
            <iframe className="map"></iframe></div>
            <hr className='hr_footer1'/>
            </div>
        </footer>
        </>
    );
}

export default Catalog;
