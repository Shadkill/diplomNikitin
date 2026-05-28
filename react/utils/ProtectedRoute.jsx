import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Здесь должна быть твоя реальная проверка авторизации.
  // Например, проверка токена в localStorage, куках или получение статуса из контекста/Redux.
  const isAuthenticated = !!localStorage.getItem('token'); 

  if (!isAuthenticated) {
    // Если не авторизован, отправляем на страницу логина
    // replace={true} нужен, чтобы страница админки не сохранялась в истории переходов
    return <Navigate to="/register" replace />;
  }

  // Если всё ок, рендерим защищенный компонент (например, админку)
  return children;
}