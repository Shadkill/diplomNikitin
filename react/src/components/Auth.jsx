import {Link,useNavigate} from 'react-router-dom';
import  {useState} from 'react';
import './AuthPage.css'
import toast from 'react-hot-toast';
function Auth() {
  const [number_phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [seria, setSeria] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();//нужно чтобы страница не перезагружалась при отправке формы
    const hasNumber = /\d/;
    if (!hasNumber.test(password)) {
      return alert("Пароль должен содержать минимум одну цифру.");
      
  }
    const payload = {
      number_phone,
      password,
      email,
      number,
      seria,
      name,
    }

    console.log('Данные, отправляемые на сервер:', {
      number_phone,
      password,
      email,
      number,
      seria,
      name,
  });

    try{
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Устанавливаем заголовок
      },
      body: JSON.stringify(payload),
      });
      if(response.ok){
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        console.log(data);

        toast.success('Вы успешно зарегистрированы!');
        navigate('/');
      }else{
        console.error('Ошибка при отправке запроса:', response.statusText);
        toast.error('Ошибка входа. Проверьте свои учетные данные.');
      }
    }catch(error){
      console.error('Ошибка при обработке запроса:', error);
    }
  }



 
  

    return (
    <>
    <div className="div_authPage">
      <div className="img_auth">
        <Link to={'/auth'} className='a_register'>Вход</Link>
 
      </div>
      <div className="registration_div">
        <form onSubmit={handleSubmit} method="post" className="registration_div">
          <h1>ЗАРЕГИСТРИРОВАТЬСЯ</h1>
          <input type="text" name="name" placeholder="ФИО" required value={name} // Подключаем состояние
              onChange={(e) => setName(e.target.value)} className='input_register'/>
             
          <input
              type="tel"
              name="number_phone"
              placeholder="Номер телефона"
              value={number_phone} // Подключаем состояние
              onChange={(e) => setPhone(e.target.value)} // Обработчик события на изменение
              required
              className='input_register'
            />
            <input type="text" name="seria" placeholder="Серия водительского удостоверения" required value={seria} // Подключаем состояние
              onChange={(e) => setSeria(e.target.value)} maxLength={4}  className='input_register'/>
            <input type="text" name="number" placeholder="Номер водительского удостоверения" required value={number} // Подключаем состояние
              onChange={(e) => setNumber(e.target.value)} maxLength={6} className='input_register'/>
            <input type="text" name="email" placeholder="Email" required value={email} // Подключаем состояние
              onChange={(e) => setEmail(e.target.value)}  className='input_register'/>
            <input type="password" name="password" placeholder="Пароль" required  value={password} // Подключаем состояние
              onChange={(e) => setPassword(e.target.value)} minLength={3} className='input_register'/>
            <div className="div_label_check">
              <input type="checkbox"  className='check'/> <p>Я даю своё согласие на обработку персональных  данных</p>
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
  
  export default Auth;
  