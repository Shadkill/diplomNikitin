import './MainPage.css';
import {Link,useNavigate} from 'react-router-dom';
import { useState,useEffect } from'react';
import { jwtDecode } from "jwt-decode";
const MainPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');//получаем данные из localStorage   
    console.log('Token:', token); // Вывод токена в консоль
    let role = '';//создаём переменную для хранения роли пользователя
    if (token) {//если извлекли токен
        const decodedToken = jwtDecode(token);//декодируем токен
        role = decodedToken.role;//получаем из токена роль пользователя
        
    }else if (!token) {
        navigate('/register', { replace: true }); //если токен не найден, перенаправляем на страницу регистрации
    }
    const handleLogout = () => {
        localStorage.removeItem('token'); // Удаление токена при выходе
        window.location.reload(); // Перезагрузка страницы или перенаправление
    };
    const [cars, setCars] = useState([]);//состояние для хранения массива автомобилей
    const [loading,setLoading] = useState(true); //состояние для отображения загрузки
    useEffect(() => {
        const fetchCars = async ()=>{
            try {
                const response = await fetch('http://localhost:5000/api/car/getCar');
                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();//получаем данные с сервера
                setCars(data);//устанавливаем данные в состояние
                setLoading(false); //скрываем загрузку
            } catch (error) {
                console.error('Ошибка при получении автомобилей:', error);
                setLoading(true); // Обработка загрузки в случае ошибки
            }
        }
        fetchCars(); //вызываем функцию при монтировании компонента
    },[]);
    if (loading) {
        return <div className='Loading'>Загрузка...</div>; // Показать сообщение о загрузке
    }
    return (
    <>
            <header className='header'>
                <div className='header_div'>
                <Link to='/'><img src="/image/logo.png" alt=""  className='logo'/></Link> 
                    <div className='right_div'>
                        {role==='admin'? <Link to='/adminPanel'>Админ панель</Link> : ''}
                    {token? <button onClick={handleLogout} className='button_log_out'>Выйти</button> : <Link to='/register'>Аккаунт</Link>  }
                    
                    {role==='admin'? <Link to='/bid'>Заявки</Link> : ''} 
                    <Link to={`/booking`}>Бронирование</Link>
                    
                    <div className='geo_div'>
                        <img src="/image/map.png" alt="" className='map_geo'/>
                        <p>г.Астрахань</p>
                    </div>
                    </div>
                    </div>
            </header>
        <div className='block_one'>
        
        </div>
        
        <div className='block_two'>
            
        <div className='div_car'>
                {cars.map(car => (

                    <div className='div_avto' key={car._id}>
                    <img src={ `http://localhost:5000/${car.preview}`} alt={car.name} className='img_car' />
                        <h1 className='name_car'>{car.name}</h1>
                        <p>{car.price}₽/сут</p>

                        <Link to={`/car/${car._id}`}><button type='submit' className="custom-button2">
            Бронирование
          </button></Link>
                   
                    </div>
                ))}
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
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2234.320948643475!2d37.97386897679403!3d55.943808977263146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b52cf1c0fd7d7d%3A0x90753708ca0e7d9!2z0K3RhSwg0J_RgNC-0LrQsNGH0YM!5e0!3m2!1sru!2sru!4v1729022984790!5m2!1sru!2sru" className='map' allowfullscreen="" loading="lazy"></iframe>
            <hr className='hr_footer1'/>
            </div>
        </footer>
        </>
    );
}

export default MainPage;
