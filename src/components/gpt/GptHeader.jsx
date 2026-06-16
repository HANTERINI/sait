import React from 'react';
import { Link } from 'react-router-dom';

export default function GptHeader({ onBurger }) {
  return (
    <header className="header gpt-header-override">
      <div className="header-inner">
        <button className="gpt-burger" onClick={onBurger}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>
        <Link to="/" className="header-brand">
          <img src="/static/img/unix.gif" alt="" className="header-logo-img" />
          <span className="header-logo-text">UNIX</span>
        </Link>
        <nav className="header-nav">
          <Link to="/" className="header-nav-link">Главная</Link>
          <Link to="/tools" className="header-nav-link">Тулки</Link>
          <span className="header-nav-link header-nav-link--gpt">Нейросеть</span>
        </nav>
      </div>
    </header>
  );
}