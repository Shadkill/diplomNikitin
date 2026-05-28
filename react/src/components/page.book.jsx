import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './MainPage.css';
import Header from "./module/Header";
import Footer from "./module/Footer";

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
             <Header/>

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
            <Footer/>
        </>
    );
};

export default PageBook;
