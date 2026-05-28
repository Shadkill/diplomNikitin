import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const Comments = ({ carId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
 const [userId, setUserId] = useState('');
  // Достаём имя пользователя из токена
   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserName(payload.name || 'Пользователь');
        setUserId(payload.id || '');
      } catch (err) {
        console.error('Ошибка чтения токена:', err);
      }
    }
  }, []);

  // Загрузка комментариев
  const fetchComments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`http://localhost:5000/api/comments/${carId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
       if (data.comments) {
        setComments(data.comments);
      } 
      // Если data - массив
      else if (Array.isArray(data)) {
        setComments(data);
      } 
      // Если что-то другое - пустой массив
      else {
        console.error('Неверный формат данных:', data);
        setComments([]);
      }
    } catch (err) {
      console.error('Ошибка загрузки комментариев:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [carId]);

  // Отправка комментария
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const { data } = await axios.post(
        'http://localhost:5000/api/createComment',
        { carId, userId:jwtDecode(token).id, content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const commentWithUser = {
        ...data,
        content:newComment,
        userId: {
          _id: decoded.id,
          name: userName,
          
          
        }
      };
      setComments([commentWithUser, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Ошибка отправки комментария:', err);
    }
  };

  // Удаление комментария
  const handleDelete = async (commentId) => {
    if (!window.confirm('Удалить комментарий?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      console.error('Ошибка удаления:', err);
    }
  };

  // Форматирование даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="comments-loading">
        <p>Загрузка комментариев...</p>
      </div>
    );
  }

  return (
    <div className="comments-block">
      {/* Заголовок */}
      <div className="comments-title-block">
        <h2>Отзывы ({comments.length})</h2>
        <div className="comments-divider"></div>
      </div>

      {/* Форма */}
      {localStorage.getItem('token') ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Оставьте ваш отзыв..."
            className="comment-textarea"
            rows={3}
          />
          <button type="submit" className="comment-btn">
            <span>Отправить</span>
          </button>
        </form>
      ) : (
        <p className="auth-warning">Войдите, чтобы оставить комментарий</p>
      )}

      {/* Список комментариев */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">Пока нет отзывов. Будьте первым!</p>
        ) : (
          comments.map(comment => (
            <div key={comment._id} className="comment-card">
              <div className="comment-avatar">
                {comment.userId?.name?.charAt(0) || '?'}
              </div>
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-username">
                    {comment.userId?.name || 'Пользователь'}
                  </span>
                  <span className="comment-date">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="comment-text">{comment.content}</p>
                {userName === comment.userId?.name && (
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="comment-delete-btn"
                  >
                    Удалить
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;