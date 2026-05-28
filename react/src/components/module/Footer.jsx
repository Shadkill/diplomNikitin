import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
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
                <div ><iframe src="https://yandex.ru/map-widget/v1/?indoorLevel=1&ll=48.066646%2C46.358728&mode=search&oid=31595452529&ol=biz&z=18.63" className="map"></iframe></div>

            
            <hr className='hr_footer1'/>
            </div>
        </footer>
        </>
    );
}

export default Footer;
