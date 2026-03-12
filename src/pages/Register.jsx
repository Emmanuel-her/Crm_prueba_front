import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUsuario } from '../services/authService';
import { UserPlus, User, Mail, Lock } from 'lucide-react';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await registerUsuario(nombre, correo, password);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al registrar la cuenta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container glass-bg flex-center">
      <div className="auth-card glass-panel">
        <div className="card-header">
          <div className="icon-circle"><UserPlus className="icon-lg" /></div>
          <h2>Crear Cuenta</h2>
          <p>Únete a nuestra plataforma hoy</p>
        </div>
        {error && <div className="alert error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Nombre Completo</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                placeholder="Juan Pérez"
                required 
              />
            </div>
          </div>
          <div className="input-group">
            <label>Correo Electrónico</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input 
                type="email" 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
                placeholder="ejemplo@correo.com"
                required 
              />
            </div>
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
              />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Creando...' : 'Registrarse'}
          </button>
        </form>
        <div className="auth-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
