import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function GptImagine({ user, onNeedAuth }) {
  const [input, setInput] = useState('');
  const [ratioOpen, setRatioOpen] = useState(false);
  const [ratio, setRatio] = useState('1:1');
  const taRef = useRef(null);

  const resize = useCallback((el) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  }, []);

  useEffect(() => { resize(taRef.current); }, [input, resize]);

  useEffect(() => {
    if (!ratioOpen) return;
    const h = (e) => { if (!e.target.closest('.gi-ratio-wrap')) setRatioOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [ratioOpen]);

  return (
    <div className="gimg">
      <div className="gimg-center">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{opacity:0.2}}><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        <h2>Imagine</h2>
        <p>Опишите что хотите увидеть</p>
      </div>
      <div className="gimg-input-fixed">
        <div className="gi-box">
          <textarea ref={taRef} className="gi-ta" placeholder="Напиши, чтобы вообразить..." rows="1" value={input} onChange={e => setInput(e.target.value)} />
          <div className="gi-bottom">
            <div className="gi-ratio-wrap">
              <button className={`gi-ratio ${ratioOpen ? 'on' : ''}`} onClick={() => setRatioOpen(!ratioOpen)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
                {ratio}
              </button>
              {ratioOpen && (
                <div className="gi-ratio-dd">
                  {['2:3','1:1','3:2'].map(r => (
                    <button key={r} className={`gi-ratio-opt ${ratio===r?'on':''}`} onClick={() => {setRatio(r);setRatioOpen(false);}}>
                      <div className={`gi-ratio-box gi-rb-${r.replace(':','-')}`}/>{r}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className={`gi-send ${input.trim()?'on':''}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}