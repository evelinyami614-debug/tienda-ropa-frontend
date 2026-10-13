import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditarVenta from './EditarVenta';

function ListaVentas() {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const cargarVentas = () => {
    api.get('/ventas')
      .then(res => setVentas(res.data))
      .catch(err => console.error('Error al obtener ventas:', err));
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la venta #${id}?`)) {
      api.delete(`/ventas/${id}`)
        .then(res => {
          cargarVentas();
        })
        .catch(err => console.error('Error al eliminar venta:', err));
    }
  };

  return (
    <div className="cute-card table-card">
      <div className="card-badge">
        <span>📋</span> Historial
      </div>
      <div className="card-header-row">
        <div>
          <h2 className="card-title">Ventas Registradas</h2>
          <p className="card-desc">Lista detallada de compras y totales calculados.</p>
        </div>
        <button onClick={cargarVentas} className="btn-refresh" title="Actualizar lista">
          ↻ Refrescar
        </button>
      </div>

      {ventas.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">🧺</p>
          <p className="empty-title">Aún no hay ventas registradas</p>
          <p className="empty-subtitle">Completa el formulario para registrar la primera venta.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="cute-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Prenda</th>
                <th>Cant.</th>
                <th>Precio</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map(v => (
                <tr key={v.id}>
                  <td><span className="badge-id">#{v.id}</span></td>
                  <td><strong>{v.cliente}</strong></td>
                  <td>{v.prenda}</td>
                  <td><span className="badge-qty">{v.cantidad}</span></td>
                  <td>${Number(v.precio).toFixed(2)}</td>
                  <td><span className="badge-total">${Number(v.total).toFixed(2)}</span></td>
                  <td>{v.fecha ? v.fecha.split('T')[0] : ''}</td>
                  <td className="cell-actions">
                    <button 
                      onClick={() => setVentaSeleccionada(v)}
                      className="btn-action btn-edit"
                      title="Editar venta"
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(v.id)}
                      className="btn-action btn-delete"
                      title="Eliminar venta"
                    >
                      🗑️ Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal flotante de edición */}
      {ventaSeleccionada && (
        <EditarVenta 
          venta={ventaSeleccionada} 
          onUpdate={() => {
            cargarVentas();
            setVentaSeleccionada(null);
          }}
          onClose={() => setVentaSeleccionada(null)}
        />
      )}
    </div>
  );
}

export default ListaVentas;