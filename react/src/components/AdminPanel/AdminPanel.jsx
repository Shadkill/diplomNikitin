import React from 'react';

export default function AdminPanel() {
  return (
    <div style={styles.container}>
      {/* Центрированный блок панели */}
      <div style={styles.card}>
        
        {/* Заголовок и приписка */}
        <header style={styles.header}>
          <h1 style={styles.title}>Панель управления</h1>
          <p style={styles.subtitle}>Админ панель</p>
        </header>

        {/* Навигационные кнопки */}
        <nav style={styles.nav}>
          <button 
            style={styles.button} 
            onClick={() => window.location.href = '/admin/users'}
          >
            Управление пользователями
          </button>
          
          <button 
            style={styles.button} 
            onClick={() => window.location.href = '/admin/cars'}
          >
            Список автомобилей (каршеринг)
          </button>
          <button 
            style={styles.button} 
            onClick={() => window.location.href = '/admin/carsCreate'}
          >
            Добавление автомобилей
          </button>
          
        </nav>

      </div>
    </div>
  );
}

// Объект со стилями
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#3D3D3D',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    padding: '32px',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 4px 0',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#9FB902',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    margin: '0',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  button: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    color: '#334155',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, transform 0.1s ease',
    boxSizing: 'border-box',
    outline: 'none',
  },
};
