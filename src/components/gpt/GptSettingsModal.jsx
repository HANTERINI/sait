import React, { useState } from 'react';

const LANGUAGES = ['Русский', 'English', 'Українська'];
const MODELS = ['UnixGPT-1.0', 'UnixGPT-2.0'];

export default function GptSettingsModal({ onClose, user, onLogout, settings, onSettingsChange }) {
  const [activeTab, setActiveTab] = useState('account');
  const [confirmClear, setConfirmClear] = useState(false);
  const [copied, setCopied] = useState(false);

  const s = settings || {
    theme: 'Тёмная',
    language: 'Русский',
    model: 'UnixGPT-2.0',
    sendOnEnter: true,
    showAvatars: true,
    compactMode: false,
    soundEnabled: false,
  };

  const update = (key, val) => {
    onSettingsChange?.({ ...s, [key]: val });
  };

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
      return;
    }
    setConfirmClear(false);
    // clear logic here
  };

  const copyId = () => {
    navigator.clipboard.writeText(user?.id || 'guest-0000');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="gpt-modal-bg" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="gset">
        <button className="gset-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        <h2 className="gset-title">Настройки</h2>

        <div className="gset-tabs">
          {[
            { id: 'account', label: 'Аккаунт', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
            { id: 'limits', label: 'Лимиты', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
            { id: 'general', label: 'Основные', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09c-.658.003-1.25.396-1.51 1z"/></svg> },
          ].map(t => (
            <button key={t.id} className={`gset-tab ${activeTab === t.id ? 'on' : ''}`} onClick={() => setActiveTab(t.id)}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        <div className="gset-body">

          {/* ===== ACCOUNT ===== */}
          {activeTab === 'account' && (
            <div className="gset-section">
              <div className="gset-account">
                <div className="gset-avatar">
                  {user?.avatar ? <img src={user.avatar} alt="" /> : (
                    <svg width="28" height="28" viewBox="0 0 127.14 96.36" fill="currentColor"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg>
                  )}
                </div>
                <div className="gset-account-info">
                  <span className="gset-account-name">{user?.name || 'Гость'}</span>
                  <span className="gset-account-id">{user ? 'Discord авторизация' : 'Не авторизован'}</span>
                </div>
              </div>

              {user && (
                <>
                  <div className="gset-row gset-row--click" onClick={copyId}>
                    <div className="gset-row-info">
                      <span className="gset-row-label">ID пользователя</span>
                      <span className="gset-row-value">{user.id || 'usr_' + user.name?.toLowerCase()}</span>
                    </div>
                    <span className="gset-row-action">{copied ? '✓ Скопировано' : 'Копировать'}</span>
                  </div>

                  <div className="gset-row">
                    <div className="gset-row-info">
                      <span className="gset-row-label">Привязанный аккаунт</span>
                      <span className="gset-row-value">{user.name} (Discord)</span>
                    </div>
                  </div>
                </>
              )}

              <div className="gset-divider" />

              {user ? (
                <button className="gset-logout" onClick={onLogout}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  Выйти из аккаунта
                </button>
              ) : (
                <div className="gset-login-hint">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                  <span>Войдите через Discord для доступа ко всем функциям</span>
                </div>
              )}
            </div>
          )}

          {/* ===== LIMITS ===== */}
          {activeTab === 'limits' && (
            <div className="gset-section">
              <div className="gset-limit">
                <div className="gset-limit-head">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <span>Сообщения</span>
                </div>
                <div className="gset-limit-bar"><div className="gset-limit-fill" style={{ width: '35%' }} /></div>
                <div className="gset-limit-nums">
                  <span>350 / 1000</span>
                  <span className="gset-limit-reset">Сброс через 2д 14ч</span>
                </div>
              </div>

              <div className="gset-limit">
                <div className="gset-limit-head">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  <span>Генерации изображений</span>
                </div>
                <div className="gset-limit-bar"><div className="gset-limit-fill" style={{ width: '12%' }} /></div>
                <div className="gset-limit-nums">
                  <span>6 / 50</span>
                  <span className="gset-limit-reset">Сброс через 2д 14ч</span>
                </div>
              </div>

              <div className="gset-divider" />

              <div className="gset-info-block">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                <span>Лимиты сбрасываются каждые 3 дня. Присоединяйтесь к Discord для увеличения лимитов.</span>
              </div>
            </div>
          )}

          {/* ===== GENERAL ===== */}
          {activeTab === 'general' && (
            <div className="gset-section">

              {/* Language selector */}
              <div className="gset-option">
                <div className="gset-option-info">
                  <span className="gset-option-label">Язык ответов</span>
                  <span className="gset-option-desc">Предпочитаемый язык ИИ</span>
                </div>
                <div className="gset-select">
                  {LANGUAGES.map(l => (
                    <button key={l} className={`gset-select-opt ${s.language === l ? 'on' : ''}`} onClick={() => update('language', l)}>{l}</button>
                  ))}
                </div>
              </div>

              {/* Model selector */}
              <div className="gset-option">
                <div className="gset-option-info">
                  <span className="gset-option-label">Модель</span>
                  <span className="gset-option-desc">Используемая модель ИИ</span>
                </div>
                <div className="gset-select">
                  {MODELS.map(m => (
                    <button key={m} className={`gset-select-opt ${s.model === m ? 'on' : ''}`} onClick={() => update('model', m)}>{m}</button>
                  ))}
                </div>
              </div>

              <div className="gset-divider" />

              {/* Toggles */}
              <div className="gset-toggle-row">
                <div className="gset-option-info">
                  <span className="gset-option-label">Enter для отправки</span>
                  <span className="gset-option-desc">Shift+Enter для новой строки</span>
                </div>
                <button className={`gset-toggle ${s.sendOnEnter ? 'on' : ''}`} onClick={() => update('sendOnEnter', !s.sendOnEnter)}>
                  <div className="gset-toggle-dot" />
                </button>
              </div>

              <div className="gset-toggle-row">
                <div className="gset-option-info">
                  <span className="gset-option-label">Показывать аватарки</span>
                  <span className="gset-option-desc">Иконки рядом с сообщениями</span>
                </div>
                <button className={`gset-toggle ${s.showAvatars ? 'on' : ''}`} onClick={() => update('showAvatars', !s.showAvatars)}>
                  <div className="gset-toggle-dot" />
                </button>
              </div>


              <div className="gset-divider" />

              {/* Clear history */}
              <div className="gset-option">
                <div className="gset-option-info">
                  <span className="gset-option-label">Очистить историю</span>
                  <span className="gset-option-desc">Удалить все сохранённые чаты</span>
                </div>
                <button className={`gset-danger-btn ${confirmClear ? 'gset-danger-btn--confirm' : ''}`} onClick={handleClear}>
                  {confirmClear ? 'Подтвердить?' : 'Очистить'}
                </button>
              </div>

              <div className="gset-divider" />

              <div className="gset-info-block">
                <span>UnixGPT v2.0 — © 2025 UNIX</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}