import React, { useEffect, useState, useContext } from 'react';
import { getMiPerfil } from '../services/userService';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Award, Activity, Clock } from 'lucide-react';

const Dashboard = () => {
  const { setUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMiPerfil();
        setProfile(data);
        setUser(data);
      } catch (err) {
        setError('Error cargando la información del dashboard.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [setUser]);

  if (loading) return <div className="loading-screen">Cargando dashboard...</div>;

  return (
    <div className="page-container dashboard-page">
      <div className="dashboard-header glass-panel">
        <div className="header-content">
          <div className="icon-circle"><LayoutDashboard className="icon-lg" /></div>
          <div>
            <h1>¡Hola, {profile?.nombre || 'Usuario'}!</h1>
            <p>Bienvenido a tu panel de control principal.</p>
          </div>
        </div>
      </div>
      
      {error && <div className="alert error">{error}</div>}

      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon"><Award /></div>
          <div className="stat-info">
            <h3>Rol Actual</h3>
            <p className="stat-value">{profile?.rol || 'Estándar'}</p>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-icon"><Activity /></div>
          <div className="stat-info">
            <h3>Estado</h3>
            <p className="stat-value">Activo</p>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-icon"><Clock /></div>
          <div className="stat-info">
            <h3>Último Acceso</h3>
            <p className="stat-value">Hoy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
