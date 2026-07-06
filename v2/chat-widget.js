/* ============================================================================
   i3 "Vision" chat widget — our own cool widget on the ClaudeChat client SDK.
   Self-contained: injects its own launcher + panel, streams replies, and
   exposes window.i3Chat = { open, close, toggle, send, reset }.
   Requires https://hub.i3international.com/client.js to be loaded first.
   Theme-aware: follows the page's <html data-theme="light|dark">.
   ========================================================================== */
(function () {
  "use strict";
  if (window.__i3ChatWidget) return;            // self-guard against double load
  window.__i3ChatWidget = true;

  var API = "https://hub.i3international.com";
  var KEY = "cw_a80791814342391994ef50577f17ef064260";

  var QUICK = [
    "Which privacy law applies at 120 King St W, Toronto?",
    "Walk me through the Proof of Concept stage.",
    "What goes in the POC document?",
    "How does the manager approve a POC?"
  ];

  var client = null, clientFailed = false, streaming = false, handle = null;
  var brand = { name: "Vision", sub: "Sales AI assistant" };

  /* ---- styles (scoped with .i3cw-, theme via [data-theme]) ---------------- */
  var CSS = `
  .i3cw-root{--b:#00588F;--b9:#002447;--blt:#2f9bde;--pk:#DF1E71;--gn:#00A661;
    --bg:#ffffff;--ink:#0d1b2a;--mut:#69788a;--line:#e6edf4;--bot:#f1f6fb;--in:#f4f8fb;
    font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}
  html[data-theme="dark"] .i3cw-root{--bg:#0f2438;--ink:#eaf2f9;--mut:#8faec9;--line:#21456a;--bot:#12314c;--in:#0b2036}
  .i3cw-root *{box-sizing:border-box}

  .i3cw-launch{position:fixed;right:22px;bottom:22px;z-index:2147483000;width:60px;height:60px;border:none;border-radius:50%;
    cursor:pointer;color:#fff;background:radial-gradient(circle at 34% 28%,#0e5da0,var(--b9) 74%);
    box-shadow:0 10px 26px rgba(0,40,80,.42),0 0 0 6px rgba(223,30,113,.14);display:flex;align-items:center;justify-content:center;
    transition:transform .18s ease, box-shadow .18s ease}
  .i3cw-launch:hover{transform:translateY(-2px) scale(1.04)}
  .i3cw-launch svg{width:27px;height:27px}
  .i3cw-launch .i3cw-vm{position:absolute;font-weight:800;font-size:22px;text-shadow:0 0 12px rgba(70,179,255,.7)}
  .i3cw-launch .i3cw-dot{position:absolute;right:6px;top:6px;width:13px;height:13px;border-radius:50%;background:var(--gn);border:2.5px solid var(--b9);
    box-shadow:0 0 0 0 rgba(0,166,97,.6);animation:i3cw-beat 1.8s infinite}
  @keyframes i3cw-beat{0%{box-shadow:0 0 0 0 rgba(0,166,97,.5)}70%{box-shadow:0 0 0 8px rgba(0,166,97,0)}100%{box-shadow:0 0 0 0 rgba(0,166,97,0)}}
  .i3cw-launch.i3cw-hide{opacity:0;pointer-events:none;transform:scale(.6)}

  .i3cw-panel{position:fixed;right:22px;bottom:22px;z-index:2147483001;width:388px;max-width:calc(100vw - 24px);height:600px;max-height:calc(100vh - 40px);
    background:var(--bg);color:var(--ink);border:1px solid var(--line);border-radius:20px;overflow:hidden;display:flex;flex-direction:column;
    box-shadow:0 24px 64px rgba(0,16,40,.4);transform:translateY(14px) scale(.98);opacity:0;pointer-events:none;transition:transform .2s ease, opacity .2s ease}
  .i3cw-panel.i3cw-open{transform:none;opacity:1;pointer-events:auto}

  .i3cw-head{display:flex;align-items:center;gap:11px;padding:13px 15px;background:var(--b9);color:#fff;flex:none}
  .i3cw-av{flex:none;width:38px;height:38px;border-radius:11px;background:radial-gradient(circle at 36% 28%,#0e5da0,#001b37 76%);
    display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px;position:relative}
  .i3cw-av::after{content:"";position:absolute;right:-2px;bottom:-2px;width:11px;height:11px;border-radius:50%;background:var(--gn);border:2px solid var(--b9)}
  .i3cw-htx{flex:1;min-width:0}
  .i3cw-nm{font-weight:800;font-size:14.5px;line-height:1.1}
  .i3cw-sub{font-size:11px;color:#9fd0ec;margin-top:2px}
  .i3cw-hbtn{flex:none;width:30px;height:30px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:#dceaf5;
    cursor:pointer;font-size:14px;line-height:1;display:flex;align-items:center;justify-content:center;transition:.15s}
  .i3cw-hbtn:hover{background:rgba(255,255,255,.2)}

  .i3cw-body{flex:1;overflow-y:auto;padding:16px 15px;display:flex;flex-direction:column;gap:12px;background:var(--bg)}
  .i3cw-welcome{text-align:center;color:var(--mut);font-size:13px;padding:14px 8px 4px}
  .i3cw-welcome .i3cw-wv{font-size:30px;font-weight:800;color:var(--b);opacity:.9}
  html[data-theme="dark"] .i3cw-welcome .i3cw-wv{color:var(--blt)}
  .i3cw-welcome b{color:var(--ink)}
  .i3cw-chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}
  .i3cw-chip{border:1px solid var(--line);background:var(--in);color:var(--ink);border-radius:11px;padding:8px 11px;font-size:12px;font-weight:600;
    cursor:pointer;text-align:left;font-family:inherit;transition:.14s;line-height:1.35}
  .i3cw-chip:hover{border-color:var(--blt)}

  .i3cw-msg{max-width:84%;padding:10px 13px;border-radius:14px;font-size:13.5px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}
  .i3cw-msg.u{align-self:flex-end;background:var(--b);color:#fff;border-bottom-right-radius:5px}
  .i3cw-msg.a{align-self:flex-start;background:var(--bot);color:var(--ink);border-bottom-left-radius:5px}
  .i3cw-msg.a.i3cw-err{background:rgba(200,16,46,.10);border:1px solid rgba(200,16,46,.35)}
  .i3cw-msg b{font-weight:800}
  .i3cw-typing{display:inline-flex;gap:4px;padding:2px 0}
  .i3cw-typing i{width:6px;height:6px;border-radius:50%;background:var(--mut);display:inline-block;animation:i3cw-bl 1.1s infinite}
  .i3cw-typing i:nth-child(2){animation-delay:.18s}.i3cw-typing i:nth-child(3){animation-delay:.36s}
  @keyframes i3cw-bl{0%,80%,100%{opacity:.25;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}

  .i3cw-foot{flex:none;border-top:1px solid var(--line);padding:10px 12px;background:var(--bg)}
  .i3cw-inrow{display:flex;align-items:flex-end;gap:8px;background:var(--in);border:1px solid var(--line);border-radius:14px;padding:6px 6px 6px 12px}
  .i3cw-inrow:focus-within{border-color:var(--blt)}
  .i3cw-in{flex:1;border:none;background:transparent;color:var(--ink);font-family:inherit;font-size:13.5px;line-height:1.4;resize:none;
    max-height:120px;padding:6px 0;outline:none}
  .i3cw-in::placeholder{color:var(--mut)}
  .i3cw-send{flex:none;width:36px;height:36px;border:none;border-radius:10px;background:var(--pk);color:#fff;cursor:pointer;font-size:16px;
    display:flex;align-items:center;justify-content:center;transition:.15s}
  .i3cw-send:hover{background:#c81862}
  .i3cw-send:disabled{opacity:.45;cursor:default}
  .i3cw-note{text-align:center;font-size:10px;color:var(--mut);margin-top:7px}
  .i3cw-note b{color:var(--mut)}
  @media(max-width:480px){.i3cw-panel{right:0;bottom:0;width:100vw;height:100vh;max-height:100vh;border-radius:0}}
  `;

  /* ---- build DOM --------------------------------------------------------- */
  var root, launch, panel, body, input, sendBtn, headSub;

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function fmt(s){ return esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>'); }  // minimal markdown: **bold**

  var CHAT_ICON = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H9l-4 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8Z" fill="#fff"/><circle cx="9" cy="9.5" r="1.2" fill="#00588F"/><circle cx="12" cy="9.5" r="1.2" fill="#00588F"/><circle cx="15" cy="9.5" r="1.2" fill="#00588F"/></svg>';

  function build() {
    var style = el('style'); style.textContent = CSS; document.head.appendChild(style);
    root = el('div', 'i3cw-root');

    launch = el('button', 'i3cw-launch');
    launch.setAttribute('type', 'button');
    launch.setAttribute('aria-label', 'Open chat with Vision');
    launch.title = 'Chat with Vision';
    launch.innerHTML = CHAT_ICON + '<span class="i3cw-dot"></span>';
    launch.onclick = open;

    panel = el('div', 'i3cw-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Chat with Vision');
    panel.innerHTML =
      '<div class="i3cw-head">' +
        '<div class="i3cw-av">V</div>' +
        '<div class="i3cw-htx"><div class="i3cw-nm"></div><div class="i3cw-sub"></div></div>' +
        '<button class="i3cw-hbtn i3cw-new" type="button" title="New conversation" aria-label="New conversation">&#10227;</button>' +
        '<button class="i3cw-hbtn i3cw-close" type="button" title="Close" aria-label="Close">&#10005;</button>' +
      '</div>' +
      '<div class="i3cw-body"></div>' +
      '<div class="i3cw-foot">' +
        '<div class="i3cw-inrow">' +
          '<textarea class="i3cw-in" rows="1" placeholder="Ask Vision anything…"></textarea>' +
          '<button class="i3cw-send" type="button" aria-label="Send">&#10148;</button>' +
        '</div>' +
        '<div class="i3cw-note">Powered by <b>Claude</b> on the i3 hub · nothing sensitive is stored in your browser</div>' +
      '</div>';

    root.appendChild(launch);
    root.appendChild(panel);
    document.body.appendChild(root);

    body = panel.querySelector('.i3cw-body');
    input = panel.querySelector('.i3cw-in');
    sendBtn = panel.querySelector('.i3cw-send');
    headSub = panel.querySelector('.i3cw-sub');
    panel.querySelector('.i3cw-nm').textContent = brand.name;
    headSub.textContent = brand.sub;

    panel.querySelector('.i3cw-close').onclick = close;
    panel.querySelector('.i3cw-new').onclick = reset;
    sendBtn.onclick = onSend;
    input.addEventListener('input', autosize);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend(); }
    });

    welcome();
  }

  function autosize() { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 120) + 'px'; }
  function scrollDown() { body.scrollTop = body.scrollHeight; }

  function welcome() {
    body.innerHTML = '';
    var w = el('div', 'i3cw-welcome',
      '<div class="i3cw-wv">V</div>' +
      "<div style=\"margin-top:6px\">Hi, I'm <b>" + esc(brand.name) + "</b> — your sales AI assistant.<br>Ask me about a stage, a deal, privacy law by address, or a deliverable.</div>");
    var chips = el('div', 'i3cw-chips');
    QUICK.forEach(function (q) {
      var c = el('button', 'i3cw-chip', esc(q)); c.type = 'button';
      c.onclick = function () { sendText(q); };
      chips.appendChild(c);
    });
    w.appendChild(chips);
    body.appendChild(w);
  }

  function addMsg(role, text) {
    var m = el('div', 'i3cw-msg ' + (role === 'user' ? 'u' : 'a'));
    if (text) m.innerHTML = fmt(text); else m.textContent = '';
    body.appendChild(m); scrollDown(); return m;
  }
  function setTyping(m) { m.innerHTML = '<span class="i3cw-typing"><i></i><i></i><i></i></span>'; }
  function renderBot(m, text) { m.innerHTML = fmt(text); }

  function ensureClient() {
    if (client || clientFailed) return;
    try {
      if (window.ClaudeChat && typeof ClaudeChat.createChatClient === 'function') {
        client = ClaudeChat.createChatClient({ apiBase: API, appKey: KEY });
        // optional admin-set branding
        try {
          if (client.getBranding) Promise.resolve(client.getBranding()).then(applyBranding).catch(function(){});
        } catch (e) {}
      } else { clientFailed = true; }
    } catch (e) { clientFailed = true; }
  }

  function applyBranding(b) {
    if (!b) return;
    if (b.name || b.title) { brand.name = b.name || b.title; var nm = panel.querySelector('.i3cw-nm'); if (nm) nm.textContent = brand.name; }
    if (b.subtitle || b.tagline) { brand.sub = b.subtitle || b.tagline; if (headSub) headSub.textContent = brand.sub; }
  }

  function setStreaming(on) {
    streaming = on;
    sendBtn.disabled = false;
    sendBtn.innerHTML = on ? '&#9632;' : '&#10148;';   // stop square vs send arrow
    sendBtn.title = on ? 'Stop' : 'Send';
  }

  function onSend() {
    if (streaming) { if (handle && handle.abort) { try { handle.abort(); } catch (e) {} } setStreaming(false); return; }
    sendText(input.value);
  }

  function sendText(text) {
    text = (text || '').trim();
    if (!text || streaming) return;
    // clear welcome on first message
    var w = body.querySelector('.i3cw-welcome'); if (w) body.innerHTML = '';
    addMsg('user', text);
    input.value = ''; autosize();

    ensureClient();
    var bot = addMsg('bot', ''); setTyping(bot);

    if (!client) {  // SDK unavailable (e.g. served from a non-allow-listed origin)
      bot.classList.add('i3cw-err');
      bot.innerHTML = fmt("I can't reach the chat service from here. This page must be served from an **allow-listed origin** (set in the i3 hub widget admin) for live chat to work.");
      return;
    }

    setStreaming(true);
    var acc = '';
    handle = client.send(text, {
      onText: function (chunk) { acc += (chunk || ''); renderBot(bot, acc); scrollDown(); },
      onDone: function (res) {
        setStreaming(false); handle = null;
        var full = (res && res.fullText) ? res.fullText : acc;
        renderBot(bot, full || '(no reply)'); scrollDown();
      },
      onError: function (err) {
        setStreaming(false); handle = null;
        if (!acc) { bot.classList.add('i3cw-err'); renderBot(bot, 'Sorry — something went wrong. Please try again.'); }
        try { console.error('[i3Chat]', err); } catch (e) {}
      }
    });
  }

  function open() {
    panel.classList.add('i3cw-open');
    launch.classList.add('i3cw-hide');
    ensureClient();
    setTimeout(function () { try { input.focus(); } catch (e) {} }, 220);
  }
  function close() { panel.classList.remove('i3cw-open'); launch.classList.remove('i3cw-hide'); }
  function toggle() { panel.classList.contains('i3cw-open') ? close() : open(); }
  function reset() {
    try { client && client.reset && client.reset(); } catch (e) {}
    if (streaming && handle && handle.abort) { try { handle.abort(); } catch (e) {} }
    setStreaming(false); welcome();
  }

  function init() {
    build();
    window.i3Chat = { open: open, close: close, toggle: toggle, send: function (t) { open(); sendText(t); }, reset: reset };
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('i3cw-open')) close(); });
    document.dispatchEvent(new CustomEvent('i3chat:ready'));
    if (window.__i3ChatAutoOpen) setTimeout(open, 400);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
