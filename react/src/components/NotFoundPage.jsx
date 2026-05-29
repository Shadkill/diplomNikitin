import React from 'react';

const NotFoundPage = () => {
  // Функция для безопасного возврата на главную
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="error-page">
      {/* Встроенные стили под твой брендбук */}
      <style>{`
        .error-page {
          background-color: #3D3D3D;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-left: 5vw;
          padding-right: 5vw;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        /* Фоновый декоративный элемент в виде следа шины или дороги */
        .error-bg-decor {
          position: absolute;
          font-family: 'Anticva', sans-serif;
          font-size: 35vw;
          color: #272626;
          z-index: 0;
          font-weight: 900;
          opacity: 0.4;
          user-select: none;
          pointer-events: none;
        }

        .error-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2vw;
          text-align: center;
        }

        /* Огромные 404 */
        .error-code {
          font-family: 'Anticva', sans-serif;
          font-size: 12vw;
          color: #9FB902;
          line-height: 1;
          margin: 0;
          letter-spacing: -0.5vw;
          animation: pulse 2s infinite alternate;
        }

        /* Линия-разделитель */
        .error-hr {
          width: 15vw;
          border: 0.2vw solid #9FB902;
          margin: 0;
        }

        .error-title {
          font-family: 'Anticva', sans-serif;
          font-size: 3.5vw;
          color: white;
          margin: 0;
          text-transform: uppercase;
        }

        .error-text {
          font-family: 'Platypi', sans-serif;
          font-size: 1.6vw;
          color: #E0E0E0;
          max-width: 45vw;
          margin: 0;
          line-height: 1.5;
        }

        /* Твоя фирменная кнопка с наклоном skewX */
        .error-btn {
          position: relative;
          background: transparent;
          border: none;
          color: white;
          font-size: 1.5vw;
          font-family: 'Platypi', sans-serif;
          cursor: pointer;
          padding: 1.2vw 3vw;
          margin-top: 2vw;
          transition: color 0.3s ease;
        }

        .error-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #272626;
          transform: skewX(-30deg); /* Наклон как у твоих кнопок */
          border: 0.2vw solid #9FB902;
          z-index: -1;
          transition: all 0.3s ease;
        }

        /* Эффект при наведении на кнопку */
        .error-btn:hover::before {
          background-color: #9FB902;
          transform: skewX(-30deg) scale(1.05);
        }

        .error-btn:hover {
          color: #272626;
          font-weight: bold;
        }

        .error-btn span {
          position: relative;
          z-index: 2;
        }

        /* Анимация легкого пульсирования для цифр */
        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.03); }
        }

        /* Адаптив под мобилки */
        @media (max-width: 768px) {
          .error-code {
            font-size: 25vw;
          }
          .error-title {
            font-size: 6vw;
          }
          .error-text {
            font-size: 4vw;
            max-width: 90vw;
          }
          .error-btn {
            font-size: 4vw;
            padding: 3vw 6vw;
            margin-top: 5vw;
          }
          .error-hr {
            width: 30vw;
          }
        }
      `}</style>

      {/* Огромный бэкграунд-текст на заднем плане */}
      <div className="error-bg-decor">DRIVE</div>

      {/* Основной контент */}
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <div className="error-hr"></div>
        <h2 className="error-title">Потеряли сигнал GPS?</h2>
        <p className="error-text">
          Похоже, вы свернули не туда или данная зона парковки больше недоступна. 
          Давайте вернемся на маршрут.
        </p>
        
        <button onClick={handleGoHome} className="error-btn">
          <span>ВЕРНУТЬСЯ НА ТРАССУ</span>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;