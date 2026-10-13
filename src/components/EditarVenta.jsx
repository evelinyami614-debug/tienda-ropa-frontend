import React, { useState, useEffect } from 'react';
import { api } from '../api';

function EditarVenta({ venta, onUpdate, onClose }) {
  const [formData, setFormData] = useState({
    cliente_id: venta.cliente_id,
    prenda_id: venta.prenda_id,
    cantidad: venta.cantidad,
    fecha: venta.fecha ? venta.fecha.split('T')[0] : ''
  });

  const [clientes, setClientes] = useState([]);
  const [prendas, setPrendas] = useState([]);

  useEffect(() => {
    api.get('/clientes')
      .then(res => setClientes(res.data))
      .catch(err => console.error(err));

    api.get('/prendas')
      .then(res => setPrendas(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/ventas/${venta.id}`, formData)
      .then(res => {
        alert(res.data.message || 'Venta actualizada');
        onUpdate();
      })
      .catch(err => console.error('Error al actualizar venta:', err));
  };

  return (
    <div className="modal-backdrop" onClick={onClose || onUpdate}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="card-badge">✏️ Edición de Venta</div>
          <button type="button" className="btn-close" onClick={onClose || onUpdate} title="Cerrar">✕</button>
        </div>
        <h3 className="modal-title">Editar Venta #{venta.id}</h3>
        <p className="card-desc">Modifica los datos del registro y guarda los cambios.</p>

        <form onSubmit={handleSubmit} className="cute-form">
          <div className="form-group">
            <label className="form-label">Cliente</label>
            <select 
              name="cliente_id" 
              value={formData.cliente_id} 
              onChange={handleChange} 
              className="cute-input"
              required
            >
              {clientes.map(c => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Prenda</label>
            <select 
              name="prenda_id" 
              value={formData.prenda_id} 
              onChange={handleChange} 
              className="cute-input"
              required
            >
              {prendas.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nombre} — ${Number(p.precio).toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Cantidad</label>
              <input 
                type="number" 
                name="cantidad" 
                value={formData.cantidad} 
                onChange={handleChange} 
                min="1"
                className="cute-input"
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Fecha</label>
              <input 
                type="date" 
                name="fecha" 
                value={formData.fecha} 
                onChange={handleChange} 
                className="cute-input"
                required 
              />
            </div>
          </div>

          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={onClose || onUpdate}>
              Cancelar
            </button>
            <button type="submit" className="btn-luxe">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarVenta;