import React from 'react';

export default function GptSearchModal({ onClose }) {
  return (
    <div className="gpt-modal-bg" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="gsearch">
        <input className="gsearch-in" placeholder="Поиск по чатам..." autoFocus />
        <p className="gsearch-empty">Начните вводить для поиска</p>
      </div>
    </div>
  );
}