import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './MainPage.css';

const PageBook = () => {
    const [bookings, setBookings] = useState([]); // состояние для хранения массива заявок
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');
    let role = '';

    if (token) {
        const decodedToken = jwtDecode(token);
        role = decodedToken.role;
    }

    const handleLogout = () => {
        localStorage.removeItem('token'); // Удаление токена при выходе
        window.location.reload(); // Перезагрузка страницы
    };

    useEffect(() => {
        if (!token) {
            return navigate('/register', { replace: true });
        }

        const { id: userId } = jwtDecode(token); // Получаем userId из токена

        const fetchUserBookings = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/booking/user/${userId}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const bookingsData = await response.json();
                setBookings(bookingsData);
            } catch (error) {
                console.error('Ошибка при получении заявок:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserBookings();
    }, [navigate, token]);

    if (loading) {
        return <div className="Loading">Загрузка данных бронирования...</div>;
    }

    if (!bookings.length) {
        return <div className="Loading">Нет заявок на бронирование.</div>;
    }

    return (
        <>
             <header className='header'>
                <div className='header_div'>
                <Link to='/'><img src="/image/logo.png" alt=""  className='logo'/></Link> 
                    <div className='right_div'>
                        {role==='admin'? <Link to='/adminPanel'>Админ панель</Link> : ''}
                    {token? <button onClick={handleLogout} className='button_log_out'>Выйти</button> : <Link to='/register'>Аккаунт</Link>  }
                    
                    {role==='admin'? <Link to='/bid'>Заявки</Link> : <Link to={`/booking`}>Бронирование</Link>} 
                    <div className='geo_div'>
                        <img src="/image/map.png" alt="" className='map_geo'/>
                        <p>г.Астрахань</p>
                    </div>
                    </div>
                    </div>
            </header>

            <div className="bookings">
                <div className="div_top_booking">
                    <p className="title_booking">Ваши заявки:</p>
                    <hr className="hr_booking"/>
                </div>
                
                {bookings.map(booking => (
                    <div key={booking._id} className="booking_img">
                        <img src={`http://localhost:5000/${booking.carId.preview}`} alt="" className='img_car'/>
                        <div className="div_txt_booking">
                            <p className="p_booking">Статус: {booking.status}</p> 
                            <p className="p_booking">Автомобиль: {booking.carId ? booking.carId.name : 'Не указано'}</p> {/* Предполагается, что carId имеет поле name */}
                            <p className="p_booking">Дата бронирования: {new Date(booking.date).toLocaleDateString()}</p>
                            <p className="p_booking">ФИО: {booking.userId ? booking.userId.name : 'Не указано'}</p>
                        
                        </div>
                        
                       
                    </div>
                ))}
                 <hr className="hr_booking"/>
            </div>
            <div className="div_bottom_hr_booking">
                <p className="p_bottom_prodol">Хотите создать новую заявку?</p>
                <Link to={'/catalog'}> <img src="/image/prodol.png" alt="" className="button_prodol"/></Link>
            </div>
            <footer>
            <div className="div_footer_left">
                <div className="div_pol">
                     <div className="div_docs">
            <h1 className='title_footer'>Документация</h1>
            <p className='p_footer'>Политика конфиденциальности</p>
            <p className='p_footer'>Правила</p>
            <p className='p_footer'>Карта сайта</p>
            </div>
            <div className="div_user">
            <h1 className='title_footer'>Пользователю</h1>
            <p className='p_footer'>Регистрация</p>
            <p className='p_footer'>Бронирования автомобиля</p>
            </div>
                </div>
           
            <div className="div_contacts">
                <h1 className='title_footer'>Контакты</h1>
                <p className='p_footer'>Телефон: +7 (912) 123-45-67</p>
                <p className='p_footer'>Email:  info@example.com</p>
                <p className='p_footer'>Адрес: г. Астрахань, ул. Пролетарская, д. 12</p>
            </div>
            <hr className='hr_footer'/>
            <p className='p_footer'>Информация на данном сайте носит исключительно ознакомительный<br /> характер и не является публичной офертой, определяемой положениями<br /> Статьи 437 Гражданского кодекса РФ.</p>
            <p className='p_footer'>(с) 2024 “Эх, прокачу!” - аренда автомобилей в Астрахани</p>
            </div>
            <div className="div_footer_right">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2234.320948643475!2d37.97386897679403!3d55.943808977263146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b52cf1c0fd7d7d%3A0x90753708ca0e7d9!2z0K3RhSwg0J_RgNC-0LrQsNGH0YM!5e0!3m2!1sru!2sru!4v1729022984790!5m2!1sru!2sru" className='map' allowfullscreen="" loading="lazy"></iframe>
            <hr className='hr_footer1'/>
            </div>
        </footer>
        </>
    );
};

export default PageBook;
