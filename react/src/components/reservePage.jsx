import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './MainPage.css';
import toast from "react-hot-toast";
import Header from "./module/Header";
import Footer from "./module/Footer";
import Comments from "./module/Comments";
const ReservePage = () => {
    const {_id} = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const [date, setDate] = useState('');


    const token = localStorage.getItem('token');
    let role = '';

    if (token) {
        const decodedToken = jwtDecode(token);
        role = decodedToken.role;
    }
    const handleLogout = () => {
        localStorage.removeItem('token'); // Удаление токена при выходе
        window.location.reload();
        toast.success('Вы вышли из системы') // Перезагрузка страницы или перенаправление
    };
    useEffect(() => {
        if (!token) {
            return navigate('/register', { replace: true });
        }

        const fetchCarData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/car/${_id}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setCar(data);
                
            } catch (error) {
                console.error('Ошибка при получении автомобиля:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCarData();
    }, [navigate, token, _id]);

    if (loading) {
        return <div className="Loading">Загрузка данных автомобиля...</div>;
    }

    if (!car) {
        return <div className="Loading">Не удалось загрузить информацию о автомобиле.</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            userId: jwtDecode(token).id,
            carId: _id,
            date,

        };

        try {
            const response = await fetch(`http://localhost:5000/api/booking/createBooking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            console.log(response);
            console.log('Заявка на резервирование отправлена');
            toast.success('Автомобиль забранирован');
            navigate('/'); // Перенаправляем на главную страницу
        } catch (error) {
            console.error('Ошибка при создании заявки:', error);
            toast.error('Данный автомобиль уже забронирован на эту дату');
        }
    };
    const today = new Date().toISOString().split('T')[0];
    return (
        <>
             <Header/>

            <div className="div_create_bid">
                <h1>Формирование заявки</h1>
                <hr className="hr_bid"/>
            </div>
            <form className="form_bid" onSubmit={handleSubmit}>
                <img src={`http://localhost:5000/${car.preview}`} alt={car.name} className='img_car' />
                <div className="div_form_bid">
                    <h1 className="name_car_id">Марка: {car.name}</h1>
                    <h2 className="price_car_id">Цена: {car.price}₽/сут</h2>
                    <p>Дата бронирования:</p>
                    <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} min={today}  className="data"required />
                    <p className="pBid">Внимание! Бронируя автомобиль вы бронируете его с 12:00 непосредственно в день брони. <br /> После 23:00 у автомобиля истекает срок брони. <br /> При бронировании на более длительный срок все вопросы <br /> обговариваются отдельно.</p>
                    <button type='submit' className="custom-button1">Бронирование</button>
                </div>
            </form>
            <Comments carId={car._id} />
            <Footer/>
        </>
    );
}

export default ReservePage;