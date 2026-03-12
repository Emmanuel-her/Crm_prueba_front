import React, { useState, useEffect, useContext } from 'react';
import { getMiPerfil, updateMiPerfil } from '../services/userService';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Save, BadgeCheck } from 'lucide-react';

const Profile = () => {
  const { setUser } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [rol, setRol] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getMiPerfil();
        setNombre(data.nombre || '');
        setCorreo(data.correo || '');
        setRol(data.rol || 'N/A');
        setUser(data);
      } catch (err) {
        setMessage({ type: 'error', text: 'Error al cargar perfil.' });
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const updated = await updateMiPerfil(nombre, correo);
      setUser(updated);
      setMessage({ type: 'success', text: 'Perfil actualizado exitosamente.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.detail || 'Error al actualizar.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading-screen">Cargando perfil...</div>;

  return (
    <div className="page-container flex-center">
      <div className="profile-card glass-panel">
        <div className="card-header center-text">
          <div className="avatar-circle">
            <User className="icon-xl" />
          </div>
          <h2>Tu Perfil</h2>
          <span className="role-badge"><BadgeCheck className="icon-sm" /> {rol}</span>
        </div>
        
        {message.text && <div className={`alert ${message.type}`}>{message.text}</div>}
        
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="input-group">
            <label>Nombre Completo</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
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
                required 
              />
            </div>
          </div>
          
          <button type="submit" className="btn-primary w-full" disabled={saving}>
            {saving ? 'Guardando...' : <><Save className="icon-sm" /> Guardar Cambios</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
