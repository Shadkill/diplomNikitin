import './MainPage.css';
import {Link,useNavigate} from 'react-router-dom';
import { useState,useEffect } from'react';
import { jwtDecode } from "jwt-decode";
import Header from './module/Header';
import Footer from './module/Footer';
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
           <Header/>
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
        <Footer/>
        </>
    );
}

export default MainPage;
