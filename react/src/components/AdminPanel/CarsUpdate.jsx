import React from 'react';
import './style.css';
import {Link,useNavigate} from 'react-router-dom';
import { useState,useEffect } from'react';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import toast from 'react-hot-toast';
const MySwal = withReactContent(Swal);
const CarsUpdate = () => {
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
        useEffect(() => {
            
            fetchCars(); //вызываем функцию при монтировании компонента
        },[]);
        if (loading) {
            return <div className='Loading'>Загрузка...</div>; // Показать сообщение о загрузке
        }
        const handleOpenModal = (id) => {
    MySwal.fire({
      title: 'Вы уверены?',
      html: <p style={{ color: '#64748b' }}>Это действие нельзя будет отменить!</p>,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9FB902', // Твой фирменный оранжевый
      cancelButtonColor: '#cbd5e1',
      confirmButtonText: 'Да, удалить!',
      cancelButtonText: 'Отмена',
      background: '#ffffff',
      customClass: {
        popup: 'my-popup-class' // Можно навесить свои стили, если нужно
      }
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
            
        
     
        const response = await axios.delete(`http://localhost:5000/api/admin/deleteCar/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        if(response.status==200){
            fetchCars();
        
        
        // Действие при нажатии на подтверждение
        MySwal.fire({
          title: 'Удалено!',
          text: 'Объект был успешно удален.',
          icon: 'success',
          confirmButtonColor: '#9FB902'
        });
        }
        } catch (error) {
            console.error(error)
        }
      }
    });
  };
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
        
        
        <div className='block_two'>
            
        <div className='div_car'>
                {cars.map(car => (

                    <div className='div_avto' key={car._id}>
                    <Link to={`/admin/updateCar/${car._id}`}><img src={ `http://localhost:5000/${car.preview}`} alt={car.name} className='img_car' /></Link>
                        <h1 className='name_car'>{car.name}</h1>
                        <p>{car.price}₽/сут</p>

                        <button type='submit' className="custom-button2" onClick={()=>handleOpenModal(car._id)}>
            Удалить
          </button>
                   
                    </div>
                ))}
            </div>
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
}

export default CarsUpdate;
