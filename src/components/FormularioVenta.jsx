import React, { useState, useEffect } from 'react';
import { api } from '../api';

function FormularioVenta() {
  const [formData, setFormData] = useState({
    cliente_id: '',
    prenda_id: '',
    cantidad: '',
    fecha: ''
  });

  const [clientes, setClientes] = useState([]);
  const [prendas, setPrendas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  // Estados para agregar nuevo cliente
  const [mostrarModalCliente, setMostrarModalCliente] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: '', telefono: '' });
  const [guardandoCliente, setGuardandoCliente] = useState(false);
  const [errorCliente, setErrorCliente] = useState('');

  // Función para cargar clientes desde la base de datos
  const cargarClientes = () => {
    return api.get('/clientes')
      .then(res => setClientes(res.data))
      .catch(err => console.error('Error al cargar clientes:', err));
  };

  // Función para cargar prendas desde la base de datos
  const cargarPrendas = () => {
    return api.get('/prendas')
      .then(res => setPrendas(res.data))
      .catch(err => console.error('Error al cargar prendas:', err));
  };

  useEffect(() => {
    cargarClientes();
    cargarPrendas();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Guardar nueva venta en la base de datos
  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/ventas', formData)
      .then(res => {
        setMensaje('¡Venta registrada con éxito!');
        setFormData({
          cliente_id: '',
          prenda_id: '',
          cantidad: '',
          fecha: ''
        });
        setTimeout(() => {
          window.location.reload();
        }, 600);
      })
      .catch(err => {
        console.error('Error al registrar venta:', err);
        alert('Hubo un error al registrar la venta');
      });
  };

  // Guardar nuevo cliente en la base de datos y seleccionarlo automáticamente
  const handleCrearCliente = (e) => {
    e.preventDefault();
    if (!nuevoCliente.nombre.trim()) return;

    setGuardandoCliente(true);
    setErrorCliente('');

    api.post('/clientes', nuevoCliente)
      .then(res => {
        // Recargar la lista de clientes desde la base de datos
        cargarClientes().then(() => {
          // Si nos devolvió el ID creado, lo seleccionamos de inmediato en el formulario
          if (res.data?.id) {
            setFormData(prev => ({ ...prev, cliente_id: res.data.id }));
          }
        });

        // Limpiar y cerrar modal
        setNuevoCliente({ nombre: '', telefono: '' });
        setMostrarModalCliente(false);
        setMensaje(`¡Cliente "${nuevoCliente.nombre}" agregado con éxito!`);
      })
      .catch(err => {
        console.error('Error al guardar cliente:', err);
        setErrorCliente('Error al guardar cliente en la base de datos.');
      })
      .finally(() => {
        setGuardandoCliente(false);
      });
  };

  return (
    <div className="cute-card form-card">
      <div className="card-badge">
        <span>🛍️</span> Nueva Venta
      </div>
      <h2 className="card-title">Registrar Venta</h2>
      <p className="card-desc">Ingresa un nuevo pedido seleccionando cliente y prenda.</p>

      {mensaje && <div className="alert-success">{mensaje}</div>}

      <form onSubmit={handleSubmit} className="cute-form">
        {/* Selector de Cliente con botón para agregar nuevo cliente */}
        <div className="form-group">
          <div className="form-label-row">
            <label className="form-label">Cliente</label>
            <button 
              type="button" 
              className="btn-link-action" 
              onClick={() => {
                setErrorCliente('');
                setMostrarModalCliente(true);
              }}
              title="Registrar un nuevo cliente en la base de datos"
            >
              + Nuevo Cliente
            </button>
          </div>
          <select 
            name="cliente_id" 
            value={formData.cliente_id} 
            onChange={handleChange} 
            className="cute-input"
            required
          >
            <option value="">-- Seleccionar Cliente --</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>
                {c.nombre} (Tel: {c.telefono || 'S/N'})
              </option>
            ))}
          </select>
        </div>

        {/* Selector de Prenda */}
        <div className="form-group">
          <label className="form-label">Prenda de Ropa</label>
          <select 
            name="prenda_id" 
            value={formData.prenda_id} 
            onChange={handleChange} 
            className="cute-input"
            required
          >
            <option value="">-- Seleccionar Prenda --</option>
            {prendas.map(p => (
              <option key={p.id} value={p.id}>
                {p.nombre} — ${Number(p.precio).toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        {/* Cantidad y Fecha */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Cantidad</label>
            <input 
              type="number" 
              name="cantidad" 
              placeholder="Ej: 2" 
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

        <button type="submit" className="btn-luxe">
          <span>✨</span> Registrar Pedido
        </button>
      </form>

      {/* Modal para Agregar Nuevo Cliente a la Base de Datos */}
      {mostrarModalCliente && (
        <div className="modal-backdrop" onClick={() => setMostrarModalCliente(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="card-badge">👤 Nuevo Cliente</div>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setMostrarModalCliente(false)}
                title="Cerrar"
              >
                ✕
              </button>
            </div>
            <h3 className="modal-title">Registrar Nuevo Cliente</h3>
            <p className="card-desc">
              Este cliente se guardará en la base de datos en la nube (Aiven) y aparecerá listo para seleccionarse.
            </p>

            {errorCliente && <div className="alert-error">{errorCliente}</div>}

            <form onSubmit={handleCrearCliente} className="cute-form">
              <div className="form-group">
                <label className="form-label">Nombre del Cliente</label>
                <input 
                  type="text" 
                  placeholder="Ej: Laura Menéndez" 
                  value={nuevoCliente.nombre} 
                  onChange={e => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })} 
                  className="cute-input"
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">Teléfono (opcional)</label>
                <input 
                  type="text" 
                  placeholder="Ej: 7123-4567" 
                  value={nuevoCliente.telefono} 
                  onChange={e => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })} 
                  className="cute-input"
                />
              </div>

              <div className="modal-buttons">
                <button 
                  type="button" 
                  className="btn-cancel" 
                  onClick={() => setMostrarModalCliente(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-luxe" 
                  disabled={guardandoCliente}
                >
                  {guardandoCliente ? 'Guardando...' : '✓ Guardar Cliente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormularioVenta;