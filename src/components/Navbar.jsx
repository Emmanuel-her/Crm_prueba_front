import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User, LayoutDashboard, LogIn, UserPlus, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <ShieldCheck className="icon" />
        <Link to="/">CR_Front</Link>
      </div>
      <div className="navbar-links">
        {token ? (
          <>
            <Link to="/dashboard" className="nav-link"><LayoutDashboard className="icon-sm" /> Dashboard</Link>
            <Link to="/profile" className="nav-link"><User className="icon-sm" /> Perfil</Link>
            <button onClick={handleLogout} className="btn-logout"><LogOut className="icon-sm" /> Salir</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link"><LogIn className="icon-sm" /> Iniciar Sesión</Link>
            <Link to="/register" className="nav-link btn-primary-outline"><UserPlus className="icon-sm" /> Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
