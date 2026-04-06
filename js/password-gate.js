(function () {
  var KEY = 'edge_auth';
  var TOKEN = 'granted';
  var PWD = 'edgerules';

  if (sessionStorage.getItem(KEY) === TOKEN) return;

  // Block scroll on body while gate is visible
  document.documentElement.style.overflow = 'hidden';

  var style = document.createElement('style');
  style.textContent = [
    '#edge-gate{position:fixed;inset:0;z-index:99999;background:#0A1628;display:flex;align-items:center;justify-content:center;font-family:"Barlow","Arial",sans-serif;}',
    '#edge-gate-box{width:100%;max-width:400px;padding:48px 40px;background:#0F1E38;border:1px solid #1D3560;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.4);text-align:center;}',
    '#edge-gate-logo{display:block;width:180px;margin:0 auto 32px;}',
    '#edge-gate h2{margin:0 0 8px;font-family:"Barlow Condensed","Arial Narrow",sans-serif;font-weight:700;font-size:1.5rem;letter-spacing:.05em;text-transform:uppercase;color:#fff;}',
    '#edge-gate p{margin:0 0 28px;font-size:.9375rem;color:rgba(255,255,255,.55);}',
    '#edge-gate-input{width:100%;box-sizing:border-box;padding:14px 16px;background:#152847;border:1px solid #1D3560;border-radius:8px;color:#fff;font-size:1rem;font-family:inherit;outline:none;transition:border-color 200ms;}',
    '#edge-gate-input:focus{border-color:#1164C2;}',
    '#edge-gate-input::placeholder{color:rgba(255,255,255,.3);}',
    '#edge-gate-btn{margin-top:12px;width:100%;padding:14px;background:#1164C2;border:none;border-radius:8px;color:#fff;font-family:"Barlow Condensed","Arial Narrow",sans-serif;font-size:1.0625rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:background 200ms;}',
    '#edge-gate-btn:hover{background:#3A7FD4;}',
    '#edge-gate-error{margin-top:12px;font-size:.875rem;color:#C23535;min-height:1.2em;}'
  ].join('');
  document.head.appendChild(style);

  var gate = document.createElement('div');
  gate.id = 'edge-gate';
  gate.innerHTML = [
    '<div id="edge-gate-box">',
    '  <img id="edge-gate-logo" src="/brand/Logo-white.svg" alt="The Edge Construction Co." onerror="this.style.display=\'none\'">',
    '  <h2>Site Preview</h2>',
    '  <p>Enter password to continue.</p>',
    '  <input id="edge-gate-input" type="password" placeholder="Password" autocomplete="current-password">',
    '  <button id="edge-gate-btn">Enter</button>',
    '  <div id="edge-gate-error"></div>',
    '</div>'
  ].join('');

  // Wait for body to exist before appending
  function mount() {
    if (document.body) {
      document.body.appendChild(gate);
      var input = document.getElementById('edge-gate-input');
      input.focus();
      document.getElementById('edge-gate-btn').addEventListener('click', check);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
    } else {
      setTimeout(mount, 10);
    }
  }

  function check() {
    var val = document.getElementById('edge-gate-input').value;
    if (val === PWD) {
      sessionStorage.setItem(KEY, TOKEN);
      document.documentElement.style.overflow = '';
      gate.remove();
      style.remove();
    } else {
      var err = document.getElementById('edge-gate-error');
      err.textContent = 'Incorrect password. Please try again.';
      var input = document.getElementById('edge-gate-input');
      input.value = '';
      input.focus();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
