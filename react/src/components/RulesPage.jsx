import React from 'react';

const RulesPage = () => {
  return (
    <div className="rules-page">
      {/* Встроенные стили, адаптированные под дизайн Drive Go */}
      <style>{`
        .rules-page {
          background-color: #3D3D3D;
          min-height: 100vh;
          padding: 5vw;
          color: white;
          text-align: start;
        }

        .rules-container {
          max-width: 80vw;
          margin: 0 auto;
        }

        /* Заголовок в стиле Anticva */
        .rules-header {
          margin-bottom: 4vw;
        }

        .rules-title {
          font-family: 'Anticva', sans-serif;
          font-size: 5vw;
          color: white;
          margin: 0;
          text-transform: uppercase;
        }

        .rules-subtitle {
          font-family: 'Platypi', sans-serif;
          font-size: 1.5vw;
          color: #9FB902;
          margin-top: 0.5vw;
        }

        .rules-hr {
          border: none;
          height: 0.2vw;
          background-color: #9FB902;
          width: 30vw;
          margin: 1.5vw 0 3vw 0;
        }

        /* Сетка для карточек с правилами */
        .rules-grid {
          display: flex;
          flex-direction: column;
          gap: 2vw;
        }

        .rules-card {
          background-color: #272626; /* Темный блок как в твоей верстке */
          padding: 3vw;
          position: relative;
          border-left: 0.4vw solid #9FB902;
          transition: transform 0.3s ease;
        }

        .rules-card:hover {
          transform: translateX(0.5vw);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1.5vw;
          margin-bottom: 1.5vw;
        }

        /* Порядковый номер правила */
        .card-number {
          font-family: 'Anticva', sans-serif;
          font-size: 2.5vw;
          color: #9FB902;
          background-color: #3D3D3D;
          padding: 0.2vw 1vw;
          transform: skewX(-20deg);
          border: 0.1vw solid #9FB902;
        }

        .card-number span {
          display: inline-block;
          transform: skewX(20deg); /* Компенсация наклона для текста */
        }

        .card-title {
          font-family: 'Anticva', sans-serif;
          font-size: 2vw;
          color: white;
          margin: 0;
        }

        .card-text {
          font-family: 'Platypi', sans-serif;
          font-size: 1.4vw;
          color: #E0E0E0;
          line-height: 1.6;
          margin: 0;
        }

        /* Списки внутри правил */
        .rules-sublist {
          list-style: none;
          padding-left: 0;
          margin-top: 1vw;
          display: flex;
          flex-direction: column;
          gap: 0.8vw;
        }

        .rules-sublist li {
          font-family: 'Platypi', sans-serif;
          font-size: 1.3vw;
          position: relative;
          padding-left: 2vw;
          color: #C0C0C0;
        }

        .rules-sublist li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #9FB902;
          font-weight: bold;
        }

        /* Важное предупреждение (Штрафы/Запреты) */
        .warning-note {
          background: rgba(159, 185, 2, 0.1);
          border: 0.15vw dashed #9FB902;
          padding: 2vw;
          margin-top: 4vw;
          display: flex;
          flex-direction: column;
          gap: 1vw;
        }

        .warning-title {
          font-family: 'Anticva', sans-serif;
          font-size: 1.8vw;
          color: #9FB902;
          margin: 0;
        }

        .warning-text {
          font-family: 'Platypi', sans-serif;
          font-size: 1.3vw;
          color: white;
          margin: 0;
        }

        /* Адаптивность под мобильные устройства */
        @media (max-width: 768px) {
          .rules-container {
            max-width: 100%;
          }
          .rules-title {
            font-size: 8vw;
          }
          .rules-subtitle {
            font-size: 3.5vw;
          }
          .card-title {
            font-size: 4vw;
          }
          .card-number {
            font-size: 4vw;
          }
          .card-text, .rules-sublist li, .warning-text {
            font-size: 3.5vw;
          }
          .warning-title {
            font-size: 4.5vw;
          }
          .rules-hr {
            width: 50vw;
          }
        }
      `}</style>

      <div className="rules-container">
        {/* Шапка страницы */}
        <header className="rules-header">
          <h1 className="rules-title">Правила сервиса</h1>
          <p className="rules-subtitle">Drive Go — Каршеринг твоего города</p>
          <div className="rules-hr"></div>
        </header>

        {/* Основной контент */}
        <div className="rules-grid">
          
          {/* Пункт 1 */}
          <section className="rules-card">
            <div className="card-header">
              <div className="card-number"><span>01</span></div>
              <h2 className="card-title">Требования к водителю</h2>
            </div>
            <p className="card-text">
              Чтобы получить доступ к бронированию автомобилей в системе Drive Go, вы должны соответствовать следующим критериям:
            </p>
            <ul className="rules-sublist">
              <li>Возраст от 21 года (для бизнес-класса — от 25 лет);</li>
              <li>Стаж вождения в категории «B» не менее 2-х лет;</li>
              <li>Наличие действующего водительского удостоверения и постоянной регистрации.</li>
            </ul>
          </section>

          {/* Пункт 2 */}
          <section className="rules-card">
            <div className="card-header">
              <div className="card-number"><span>02</span></div>
              <h2 className="card-title">Бронирование и осмотр</h2>
            </div>
            <p className="card-text">
              После нажатия кнопки «Забронировать» вам предоставляется 20 бесплатных минут, чтобы дойти до автомобиля. 
              Перед началом поездки вы обязаны осмотреть машину на наличие повреждений и зафиксировать их через приложение.
            </p>
          </section>

          {/* Пункт 3 */}
          <section className="rules-card">
            <div className="card-header">
              <div className="card-number"><span>03</span></div>
              <h2 className="card-title">Правила движения и парковки</h2>
            </div>
            <p className="card-text">
              Завершение аренды возможно только в пределах разрешенной зеленой зоны, указанной на карте в приложении. 
              Запрещается парковать автомобиль на закрытых подземных паркингах, частных территориях и в местах, где нарушаются ПДД.
            </p>
          </section>

          {/* Пункт 4 */}
          <section className="rules-card">
            <div className="card-header">
              <div className="card-number"><span>04</span></div>
              <h2 className="card-title">Топливо и заправка</h2>
            </div>
            <p className="card-text">
              Если уровень топлива упал ниже 20%, вы можете заправить автомобиль на партнерских АЗС, используя топливную карту из бардачка. 
              За успешную заправку мы начислим вам бонусные баллы на будущие поездки.
            </p>
          </section>

        </div>

        {/* Важная плашка с предупреждением */}
        <div className="warning-note">
          <h3 className="warning-title">Важное предупреждение:</h3>
          <p className="warning-text">
            Передача управления учетной записью или автомобилем Drive Go третьим лицам <strong>строго запрещена</strong>. 
            В случае выявления нарушений аккаунт блокируется бессрочно, а на пользователя накладывается штраф согласно пользовательскому соглашению.
          </p>
        </div>

      </div>
    </div>
  );
};

export default RulesPage;