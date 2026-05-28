import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './MainPage.css';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
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
        window.location.reload(); // Перезагрузка страницы или перенаправление
    };
    useEffect(() => {
        if (!token || role !== 'admin') {
            return navigate('/register', { replace: true });
        }

        const fetchBookings = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/booking/admin`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const bookingsData = await response.json();
                setBookings(bookingsData);
            } catch (error) {
                console.error('Ошибка при получении заявок:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [navigate, token, role]);

    const handleAccept = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/booking/admin/accept/${id}`, {
                method: 'PUT',
            });
            if (response.ok) {
                setBookings(bookings.map(b => (b._id === id ? { ...b, status: 'Принято' } : b)));
            }
        } catch (error) {
            console.error('Ошибка при принятии заявки:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/booking/admin/reject/${id}`, {
                method: 'PUT',
            });
            if (response.ok) {
                setBookings(bookings.map(b => (b._id === id ? { ...b, status: 'Отклонено' } : b)));
            }
        } catch (error) {
            console.error('Ошибка при отклонении заявки:', error);
        }
    };

    if (loading) {
        return <div className="Loading">Загрузка данных заявок...</div>;
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

            <div className="bookings1">
            <div className="div_top_booking">
                    <p className="title_booking">Обработка заявок</p>
                    <hr className="hr_booking"/>
                </div>
                {bookings.map(booking => (
                    <div key={booking._id} className="booking_img">
                        <img src={`http://localhost:5000/${booking.carId.preview}`} alt="" className='img_car' />
                        <div className="div_txt_booking">
                            <p>Статус: {booking.status}</p>
                            <p>Автомобиль: {booking.carId.name}</p>
                            <p>Дата бронирования: {new Date(booking.date).toLocaleDateString()}</p>
                            <p>ФИО: {booking.userId.name}</p> 
                            {booking.status==='Принято'?<></>:<button onClick={() => handleAccept(booking._id)}>Принять</button>}
                            {booking.status==='Отклонено'?<></>:<button onClick={() => handleReject(booking._id)}>Отклонить</button>}
                            
                        </div>
                    </div>
                ))}
                <hr className="hr_booking"/>
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
            <div ><a href="https://yandex.ru/maps/org/drive_elit/31595452529/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Drive elit</a><a href="https://yandex.ru/maps/37/astrahan/category/electric_transport_store/66350561707/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">Магазин электротранспорта в Астрахани</a>
            <iframe className="map"></iframe></div>
            <hr className='hr_footer1'/>
            </div>
        </footer>
        </>
    );
};

export default AdminBookings;