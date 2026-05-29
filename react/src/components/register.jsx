
import {Link,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import './AuthPage.css'
import toast from 'react-hot-toast'
const Register = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault(); //нужно чтобы страница не перезагружалась при отправке формы
  const payload = {
    email,
    password,
  }
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Устанавливаем заголовок
      },
      body: JSON.stringify(payload),
    });
    if(response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('token', token);
            
      console.log(data);
      toast.success('Добро пожаловать!')
      navigate('/'); // переходим на главную страницу после успешной авторизации
    }else{
      console.error('Ошибка при отправке запроса:', response.statusText); // выводим ошибку в консоль для дебага
    }
     
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error); // выводим ошибку в консоль для дебага
  }
}
    return (
        <>
        <div className="div_authPage">
          <div className="img_auth">
            
     
          </div>
          <div className="registration_div">
            <form onSubmit={handleSubmit} method="post" className="registration_div">
              <h1>Авторизация</h1>
                <input type="text" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email" required   className='input_register'/>
                <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Пароль" required   className='input_register'/>
                <div className="div_label_check">
                   <p><span>Вы не зарегистрированный пользователь? </span><Link to={'/register'}  className='link_auth'>Зарегистрироваться</Link> </p>
                </div>
                <button type='submit' className="custom-button">
            Продолжить
          </button>
            </form>
          </div>
        </div>
        </>
    );
}

export default Register;
