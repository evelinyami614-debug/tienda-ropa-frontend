import React from 'react';
import ListaVentas from './components/ListaVentas';
import FormularioVenta from './components/FormularioVenta';
import './App.css';

function App() {
  return (
    <div className="retro-desktop">
      {/* Marco de ventana estilo retro navegador (Inspiración Img 2) */}
      <div className="cute-window">
        
        {/* Barra superior estilo ventana/navegador */}
        <div className="window-header">
          <div className="window-tabs">
            <div className="window-tab active">
              <span>💜</span> Tienda de Ropa • Ventas
            </div>
          </div>

          {/* Barra de navegación del navegador */}
          <div className="browser-navbar">
            <div className="nav-buttons">
              <span className="nav-btn" title="Atrás">←</span>
              <span className="nav-btn" title="Adelante">→</span>
              <span className="nav-btn" title="Recargar">↻</span>
            </div>
            <div className="address-bar">
              <span className="lock-icon">🔒</span>
              <span className="url-text">https://purple-luxe.boutique/ventas</span>
              <span className="heart-icon">🤍</span>
            </div>
          </div>
        </div>

        {/* Banner Hero estilo Purple + Luxe (Inspiración Img 1) */}
        <div className="hero-banner">
          <div className="hero-content">
            <span className="hero-badge">✨ Nueva Colección • INFRAMEN</span>
            <h1 className="hero-title">Purple <span>+</span> Luxe</h1>
            <p className="hero-subtitle">Sistema de Gestión & Ventas de la Tienda de Ropa</p>
          </div>
          <div className="hero-decorative">
            <div className="deco-card">
              <span className="deco-tag">Best Seller</span>
              <span className="deco-emoji">🛍️</span>
            </div>
          </div>
        </div>

        {/* Contenido principal: Formulario y Tabla de Ventas */}
        <div className="window-content">
          <div className="main-grid">
            <FormularioVenta />
            <ListaVentas />
          </div>
        </div>

        {/* Pie de ventana retro */}
        <div className="window-footer">
          <span>( Purple + Luxe • Tienda de Ropa INFRAMEN 💜 )</span>
          <div className="footer-links">
            <span>📷 @purpleluxe</span>
            <span>✨ 2026</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;