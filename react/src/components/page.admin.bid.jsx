import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './MainPage.css';
import Header from "./module/Header";
import Footer from "./module/Footer";

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
          <Header/>

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
            <Footer/>
        </>
    );
};

export default AdminBookings;