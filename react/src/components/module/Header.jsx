import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
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
                    </>
    );
}

export default Header;
