import React, { useState, useRef, useEffect, useCallback } from 'react';
import hljs from 'highlight.js';

const SEARCH_TEST_SOURCES = [
  { title: 'GitHub — xworm-rat', domain: 'github.com' },
  { title: 'Exploit Database', domain: 'exploit-db.com' },
  { title: 'VirusTotal Analysis', domain: 'virustotal.com' },
];

    const MD_TEST = `# Заголовок H1
    
    ## Заголовок H2
    
    ### Заголовок H3
    
    Обычный текст с **жирным**, *курсивом* и \`inline code\` внутри.
    
    Список:
    - Первый пункт
    - Второй пункт
    - Третий пункт
    
    > Это цитата которая выглядит как блок
    
    Вот Python (Server on Local):
    
    \`\`\`python
    import socket
    import threading
    
    class Server:
        def __init__(self, host='127.0.0.1', port=4444):
            self.host = host
            self.port = port
            self.clients = []
    
        def start_tcp(self):
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.bind((self.host, self.port))
            s.listen(5)
            print(f"[*] TCP Listening on {self.host}:{self.port}")
            while True:
                client, addr = s.accept()
                print(f"[+] TCP Connection from {addr}")
                self.clients.append(client)
    
        def start_udp(self):
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.bind((self.host, self.port))
            print(f"[*] UDP Listening on {self.host}:{self.port}")
            while True:
                data, addr = s.recvfrom(1024)
                print(f"[+] UDP Data from {addr}: {data}")
    
        def start(self):
            threading.Thread(target=self.start_tcp, daemon=True).start()
            threading.Thread(target=self.start_udp, daemon=True).start()
            while True: pass
    
    if __name__ == "__main__":
        server = Server()
        server.start()
    \`\`\`
    
    Bash (Opening ports):
    
    \`\`\`bash
    #!/bin/bash
    # Open TCP and UDP ports (requires root)
    PORT=20631
    
    if [[ $EUID -ne 0 ]]; then
       echo "[!] Please run as root (sudo)"
       exit 1
    fi
    
    echo "[*] Opening TCP/UDP port $PORT..."
    
    # UFW
    ufw allow $PORT/tcp
    ufw allow $PORT/udp
    
    # Iptables backup
    
echo "[+] Firewall rules updated. Ports $PORT are OPEN (TCP/UDP)"
\`\`\`

C#:

\`\`\`csharp
using System;
using System.Net.Sockets;

namespace RAT
{
    class Program
    {
        static void Main(string[] args)
        {
            // Подключение через выделенный сервер (Дедик)
            // Локальный вход: 4444 -> Внешний выход: 195.226.92.129:20631
            var client = new TcpClient("195.226.92.129", 20631);
            var stream = client.GetStream();
            Console.WriteLine("[+] Connected via DEDICATED TUNNEL [FI]");
        }
    }
}
\`\`\`

JSON:

\`\`\`json
{
  "name": "unix-tools",
  "version": "2.0.0",
  "tools": [
    { "name": "Xworm", "version": "5.6", "status": "fixed" },
    { "name": "VenomRAT", "version": "6.1", "status": "ok" }
  ]
}
\`\`\`

Ещё текст. Ссылка: [unixsquad.site](https://unixsquad.site)

| Тулка | Версия | Статус |
|-------|--------|--------|
| Xworm | 5.6 | ✓ Fix |
| Venom | 6.1 | ✓ OK |
| Sheet | 2.6 | ✓ ReFix |`;

function highlightCode(code, lang) {
  try {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  } catch {
    return code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

function parseMd(text) {
  if (!text) return '';

  let html = text
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const trimmed = code.trim();
      const highlighted = highlightCode(trimmed, lang);
      return `<div class="gc-code"><div class="gc-code-head"><span class="gc-code-lang">${lang || 'code'}</span><button class="gc-code-copy" onclick="(function(btn){var c=btn.closest('.gc-code').querySelector('code');navigator.clipboard.writeText(c.innerText).then(function(){btn.textContent='Скопировано';setTimeout(function(){btn.textContent='Копировать'},1500)});})(this)">Копировать</button></div><pre class="gc-code-body"><code>${highlighted}</code></pre></div>`;
    })
    .replace(/`([^`]+)`/g, '<code class="gc-inline-code">$1</code>')
    .replace(/^### (.+)$/gm, '<h3 class="gc-h">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="gc-h">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="gc-h">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote class="gc-quote">$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li class="gc-li">$1</li>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="gc-link" target="_blank" rel="noopener">$1</a>')
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split('|').filter(c => c.trim()).map(c => c.trim());
      if (cells.every(c => /^[-:]+$/.test(c))) return '';
      return `<tr>${cells.map(c => `<td class="gc-td">${c}</td>`).join('')}</tr>`;
    })
    .replace(/((?:<li class="gc-li">.*<\/li>\n?)+)/g, '<ul class="gc-ul">$1</ul>')
    .replace(/((?:<tr>.*<\/tr>\n?)+)/g, '<table class="gc-table"><tbody>$1</tbody></table>')
    .replace(/\n\n/g, '</p><p class="gc-p">')
    .replace(/\n/g, '<br/>');

  return `<p class="gc-p">${html}</p>`;
}

export default function GptChat({ user, onNeedAuth }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [webSearch, setWebSearch] = useState(false);
  const taRef = useRef(null);
  const endRef = useRef(null);
  const started = messages.length > 0;

  const resize = useCallback((el) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  }, []);

  useEffect(() => {
    resize(taRef.current);
  }, [input, resize]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput('');
    if (taRef.current) taRef.current.style.height = 'auto';
    setMessages(p => [...p, { role: 'user', text }]);

    if (text === '/image-test') {
      setTimeout(() => {
        setMessages(p => [...p, {
          role: 'bot',
          text: 'Вот сгенерированное изображение:',
          image: 'https://picsum.photos/512/512?random=' + Date.now(),
        }]);
      }, 1500);
      return;
    }

    if (text === '/search-test') {
      setTimeout(() => {
        setMessages(p => [...p, {
          role: 'bot',
          text: 'По вашему запросу найдена информация о Xworm RAT.',
          sources: SEARCH_TEST_SOURCES,
        }]);
      }, 2000);
      return;
    }

    if (text === '/md-test') {
      setTimeout(() => {
        setMessages(p => [...p, { role: 'bot', md: MD_TEST }]);
      }, 800);
      return;
    }

    setTimeout(() => {
      setMessages(p => [...p, {
        role: 'bot',
        text: `Тестовый ответ на: "${text}"`,
      }]);
    }, 1200);
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const InputBox = (
    <div className="gi-box">
      <textarea
        ref={taRef}
        className="gi-ta"
        placeholder="Сообщение для UnixGPT"
        rows="1"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKey}
      />
      <div className="gi-bottom">
        <button
          className={`gi-web ${webSearch ? 'on' : ''}`}
          onClick={() => setWebSearch(!webSearch)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>Поиск</span>
        </button>
        <div className="gi-right">
          <button className="gi-clip">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>
          <button
            className={`gi-send ${input.trim() ? 'on' : ''}`}
            onClick={send}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  if (!started) {
    return (
      <div className="gc-welcome">
        <div className="gc-welcome-center">
          <img src="/static/img/unix.gif" alt="" className="gc-welcome-img" />
          <h1 className="gc-welcome-h">Чем могу помочь?</h1>
          <p className="gc-welcome-hint">
            Тесты: <code>/image-test</code> <code>/search-test</code> <code>/md-test</code>
          </p>
        </div>
        <div className="gc-welcome-input">
          {InputBox}
        </div>
      </div>
    );
  }

  return (
    <div className="gc-active">
      <div className="gc-scroll">
        <div className="gc-messages">
          {messages.map((m, i) => (
            <div key={i} className={`gc-m gc-m--${m.role}`}>
              <div className="gc-m-av">
                {m.role === 'user' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ) : (
                  <img src="/static/img/unix.gif" alt="" />
                )}
              </div>
              <div className="gc-m-body">
                {m.role === 'user' ? (
                  <div className="gc-m-bubble">{m.text}</div>
                ) : (
                  <div className="gc-m-response">
                    {m.sources && (
                      <div className="gc-sources">
                        <div className="gc-sources-head">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20" />
                          </svg>
                          <span>Источники</span>
                        </div>
                        <div className="gc-sources-list">
                          {m.sources.map((s, j) => (
                            <div key={j} className="gc-source">
                              <span className="gc-source-title">{s.title}</span>
                              <span className="gc-source-domain">{s.domain}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {m.md ? (
                      <div
                        className="gc-md"
                        dangerouslySetInnerHTML={{ __html: parseMd(m.md) }}
                      />
                    ) : m.text ? (
                      <div className="gc-m-text">{m.text}</div>
                    ) : null}
                    {m.image && (
                      <div className="gc-m-image">
                        <img src={m.image} alt="Generated" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>
      <div className="gc-input-dock">
        {InputBox}
      </div>
    </div>
  );
}