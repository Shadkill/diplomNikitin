import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './MainPage.css';
import toast from "react-hot-toast";
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
                    <button type='submit' className="custom-button1">Бронирование</button>
                </div>
            </form>
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
}

export default ReservePage;