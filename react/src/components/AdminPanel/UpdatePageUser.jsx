import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const UpdatePageUser = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const [userData, setUserData] = useState([]);
    const handleLogout = ()=>{
 localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Переадресация на главную страницу
    window.location.href = '/';
    }
  
    const fetchUserData = async () => {
    try {
      
      
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      
      console.error('Ошибка при получении данных:', err);
    } 
  };

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    fetchUserData();
  }, [token]);
  const handleDeleteUser = async (userId) => {
  const result = await Swal.fire({
    title: 'Вы уверены?',
    text: 'Этот пользователь будет удалён безвозвратно!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Да, удалить!',
    cancelButtonText: 'Отмена',
    reverseButtons: true
  });

  if (!result.isConfirmed) return;

  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Ошибка при удалении пользователя');
    }

    // Обновляем список пользователей после удаления
    setUserData(prevData => prevData.filter(user => user._id !== userId));

    Swal.fire({
      title: 'Удалено!',
      text: 'Пользователь успешно удалён.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });
  } catch (err) {
    Swal.fire({
      title: 'Ошибка!',
      text: `Не удалось удалить пользователя: ${err.message}`,
      icon: 'error'
    });
    console.error('Ошибка при удалении:', err);
  }
};
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

 <div className='block_two'>
 <h2>Список пользователей</h2>
  <table className='user-table'>
            <thead>
              <tr>
                
                <th>Имя</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
 {userData.map(user => (
    
                  <tr key={user._id}>
                    {user.role==='admin'?<></>:
                    <>
                    <td>{user.name || 'Не указано'}</td>
                    <td>{user.email || 'Не указан'}</td>
                    <td>{user.role || 'Не указана'}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className='delete-btn'
                        title="Удалить пользователя"
                      >
                        Удалить
                      </button>
                    </td>
                    </>
}
                  </tr>
                    
 ))}
 </tbody>
          </table>
 
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

export default UpdatePageUser;
