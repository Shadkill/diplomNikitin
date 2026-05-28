import { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import './AuthPage.css'
import toast from 'react-hot-toast';
const CarAdd = () => {
  const navigate = useNavigate();
  
   
    const [name,setName] = useState('');
    const [price, setPrice] = useState('');
    const [preview, setPreview] = useState(null);
     const token = localStorage.getItem('token');
     useEffect(() => {//крутой хук он нужен для получения текущего токена и проверки роли пользователя
      // Проверка наличия токена и его роли
      if (!token) {
          return navigate('/register', { replace: true });//проверяем есть ли вообще токен
      }

      try {
          const decodedToken = jwtDecode(token);//деодируем токен
          const role = decodedToken.role;//получаем роль из токена

          if (role !== 'admin') {//проеверяем роль токена
              return navigate('/', { replace: true }); // Редирект на страницу входа
          }
      } catch (error) {
          console.error('Ошибка декодирования токена:', error);
          navigate('/register', { replace: true }); // Редирект в случае ошибки декодирования
      }
  }, [navigate, token]);//Массив зависимостей, чтобы он запускался при изменении navigate или token
    const handleSubmit = async (e) => {
        e.preventDefault(); //нужно чтобы страница не перезагружалась при отправке формы
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('preview', preview);
        console.log('Данные, отправляемые на сервер:', {
            price,
            name,
            preview
        });
        try {
            const response = await fetch('http://localhost:5000/api/car/addCars', {
                method: 'POST',
                body:formData
            });
            if (response.ok) {
                toast.success('Машина успешно добавлена!')
                
            }else{
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div>
             <>
        <div className="div_authPage">
          <div className="img_auth">
          </div>
          <div className="registration_div">
            <form method="post" onSubmit={handleSubmit} className="registration_div">
              <h1>Добавление автомобиля</h1>
              <div className="div_form_class">
                <input type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)}  placeholder="Введите модель автомобиля" required   className='input_register'/>
                <input type="number" name="price"value={price} onChange={(e)=> setPrice(e.target.value)}  placeholder="Цена" required   className='input_register'/>
                <label className='lab'>Загрузите обложку</label>
                <input
            type="file"
             onChange={(e)=> setPreview(e.target.files[0])}
            className='photo_input'
            required
          />
          </div>
                <button type='submit'  className="custom-button">
            Продолжить
          </button>
            </form>
          </div>
        </div>
        </>
        </div>
    );
}

export default CarAdd;
