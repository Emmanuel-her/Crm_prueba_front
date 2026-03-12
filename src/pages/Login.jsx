import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUsuario } from '../services/authService';
import { LogIn, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginUsuario(correo, password);
      // Backend might return access_token
      const token = data.access_token || data.token;
      if (token) {
        login(token, data.user); 
        navigate('/dashboard');
      } else {
        setError('Respuesta del servidor inválida (sin token).');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container glass-bg flex-center">
      <div className="auth-card glass-panel">
        <div className="card-header">
          <div className="icon-circle"><LogIn className="icon-lg" /></div>
          <h2>Bienvenido de Nuevo</h2>
          <p>Ingresa a tu cuenta para continuar</p>
        </div>
        {error && <div className="alert error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
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
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>
        <div className="auth-footer">
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
