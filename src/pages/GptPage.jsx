import React, { useState, useEffect } from 'react';
import GptSidebar from '../components/gpt/GptSidebar';
import GptChat from '../components/gpt/GptChat';
import GptImagine from '../components/gpt/GptImagine';
import GptAuthModal from '../components/gpt/GptAuthModal';
import GptSearchModal from '../components/gpt/GptSearchModal';
import GptSettingsModal from '../components/gpt/GptSettingsModal';
import GptHeader from '../components/gpt/GptHeader';

export default function GptPage() {
  const [view, setView] = useState('chat');
  const [sbOpen, setSbOpen] = useState(true);
  const [sbMobile, setSbMobile] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    theme: 'Dark Red',
    language: 'RU',
    model: 'GPT-4',
    sendOnEnter: true,
    showAvatars: true,
    compactMode: false,
    soundEnabled: false,
  });

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') { setSearchModal(false); setAuthModal(false); setSettingsModal(false); }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchModal(true); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (sbMobile || authModal || searchModal || settingsModal) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sbMobile, authModal, searchModal, settingsModal]);

  return (
    <div className="gpt-page">
      <GptHeader onBurger={() => setSbMobile(!sbMobile)} />
      <div className="gpt-layout">
        <GptSidebar
          open={sbOpen} mobileOpen={sbMobile}
          onToggle={() => setSbOpen(!sbOpen)} onMobileClose={() => setSbMobile(false)}
          view={view} onViewChange={v => { setView(v); setSbMobile(false); }}
          onSearch={() => setSearchModal(true)} onLogin={() => setAuthModal(true)}
          onSettings={() => setSettingsModal(true)} user={user}
        />
        {sbMobile && <div className="gpt-backdrop" onClick={() => setSbMobile(false)} />}
        <div className="gpt-main" data-sb={sbOpen ? 'open' : 'closed'}>
          {view === 'chat' && <GptChat user={user} onNeedAuth={() => setAuthModal(true)} settings={settings} />}
          {view === 'imagine' && <GptImagine user={user} onNeedAuth={() => setAuthModal(true)} />}
        </div>
      </div>

      {authModal && <GptAuthModal onClose={() => setAuthModal(false)} onLogin={() => { setAuthModal(false); setUser({ name: 'H-squad', id: 'operator', avatar: null }); }} />}
      {searchModal && <GptSearchModal onClose={() => setSearchModal(false)} />}
      {settingsModal && (
        <GptSettingsModal
          onClose={() => setSettingsModal(false)}
          user={user}
          onLogout={() => { setUser(null); setSettingsModal(false); }}
          settings={settings}
          onSettingsChange={setSettings}
        />
      )}

      <span className="gpt-ver">v1.0.2 H-squad</span>
    </div>
  );
}