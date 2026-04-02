/* =============================================================
   CONTACT MODAL — THE EDGE CONSTRUCTION CO.
   Self-contained: injects modal HTML + CSS, submits to Netlify.
   Trigger: any element with data-contact-modal attribute.
   Optional: data-subject="Career Inquiry" to pre-fill subject.
   ============================================================= */

(function () {
  'use strict';

  var STYLES = [
    '#cm-overlay{position:fixed;inset:0;background:rgba(5,10,18,0.82);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1.25rem;backdrop-filter:blur(4px);}',
    '#cm-overlay[hidden]{display:none;}',
    '#cm-dialog{background:#0d1420;border:1px solid rgba(168,152,92,0.18);border-radius:6px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;padding:2.5rem 2.25rem 2rem;position:relative;box-shadow:0 24px 60px rgba(0,0,0,0.6);}',
    '#cm-close{position:absolute;top:1rem;right:1.1rem;background:none;border:none;color:rgba(255,255,255,0.35);font-size:1.5rem;line-height:1;cursor:pointer;padding:0.25rem 0.5rem;transition:color 0.2s;}',
    '#cm-close:hover{color:rgba(168,152,92,0.9);}',
    '.cm-eyebrow{font-family:var(--font-display,"Inter",sans-serif);font-size:0.6875rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#A8985C;margin:0 0 0.5rem;}',
    '.cm-title{font-family:var(--font-display,"Inter",sans-serif);font-size:1.5rem;font-weight:800;color:#fff;margin:0 0 1.5rem;line-height:1.2;}',
    '.cm-group{margin-bottom:1.125rem;}',
    '.cm-label{display:block;font-family:var(--font-display,"Inter",sans-serif);font-size:0.6875rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:0.375rem;}',
    '.cm-input,.cm-textarea{width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:4px;color:#fff;font-size:0.9375rem;padding:0.625rem 0.875rem;transition:border-color 0.2s;box-sizing:border-box;font-family:inherit;}',
    '.cm-input:focus,.cm-textarea:focus{outline:none;border-color:#1164C2;background:rgba(17,100,194,0.08);}',
    '.cm-textarea{resize:vertical;min-height:110px;}',
    '.cm-row{display:grid;grid-template-columns:1fr 1fr;gap:0.875rem;}',
    '.cm-submit{margin-top:1.375rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;}',
    '.cm-btn{display:inline-flex;align-items:center;gap:0.5rem;background:#1164C2;color:#fff;border:none;border-radius:3px;font-family:var(--font-display,"Inter",sans-serif);font-size:0.8125rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:0.75rem 1.75rem;cursor:pointer;transition:background 0.2s;}',
    '.cm-btn:hover{background:#0e54a8;}',
    '.cm-btn:disabled{opacity:0.6;cursor:not-allowed;}',
    '.cm-legal{font-size:0.75rem;color:rgba(255,255,255,0.3);line-height:1.5;}',
    '.cm-file-label{display:flex;align-items:center;gap:0.625rem;background:rgba(255,255,255,0.05);border:1px dashed rgba(255,255,255,0.2);border-radius:4px;padding:0.625rem 0.875rem;cursor:pointer;transition:border-color 0.2s;color:rgba(255,255,255,0.55);font-size:0.875rem;}',
    '.cm-file-label:hover{border-color:#1164C2;color:#fff;}',
    '.cm-file-label svg{flex-shrink:0;opacity:0.6;}',
    '#cm-resume-name{font-size:0.8125rem;color:rgba(255,255,255,0.4);margin-top:0.375rem;min-height:1.2em;}',
    '#cm-success{text-align:center;padding:2rem 1rem;}',
    '#cm-success svg{width:52px;height:52px;margin:0 auto 1.25rem;display:block;}',
    '#cm-success circle{fill:none;stroke:#1164C2;stroke-width:2;}',
    '#cm-success path{fill:none;stroke:#A8985C;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}',
    '#cm-success h3{font-family:var(--font-display,"Inter",sans-serif);font-size:1.25rem;font-weight:800;color:#fff;margin:0 0 0.625rem;}',
    '#cm-success p{color:rgba(255,255,255,0.55);font-size:0.9375rem;line-height:1.6;margin:0;}',
    '@media(max-width:480px){#cm-dialog{padding:1.75rem 1.25rem 1.5rem;}.cm-row{grid-template-columns:1fr;}}'
  ].join('');

  var MODAL_HTML = '<style id="cm-styles">' + STYLES + '</style>'
    + '<div id="cm-overlay" hidden aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="cm-title">'
    +   '<div id="cm-dialog">'
    +     '<button id="cm-close" type="button" aria-label="Close">&times;</button>'
    +     '<p class="cm-eyebrow">The Edge Construction Co.</p>'
    +     '<h2 class="cm-title" id="cm-title">Send Us a Message</h2>'
    +     '<form id="cm-form" name="contact-popup" method="POST" enctype="multipart/form-data" data-netlify="true" data-netlify-honeypot="bot-field" novalidate>'
    +       '<input type="hidden" name="form-name" value="contact-popup">'
    +       '<input type="hidden" name="subject" id="cm-subject" value="General Inquiry">'
    +       '<p style="display:none"><label>Skip this field: <input name="bot-field"></label></p>'
    +       '<div id="cm-fields">'
    +         '<div class="cm-row">'
    +           '<div class="cm-group"><label class="cm-label" for="cm-name">Name <span style="color:#c05;">&ast;</span></label><input class="cm-input" type="text" id="cm-name" name="name" autocomplete="name" required></div>'
    +           '<div class="cm-group"><label class="cm-label" for="cm-email">Email <span style="color:#c05;">&ast;</span></label><input class="cm-input" type="email" id="cm-email" name="email" autocomplete="email" required></div>'
    +         '</div>'
    +         '<div class="cm-group"><label class="cm-label" for="cm-phone">Phone <span style="color:rgba(255,255,255,0.25); font-weight:400; text-transform:none; letter-spacing:0;">(optional)</span></label><input class="cm-input" type="tel" id="cm-phone" name="phone" autocomplete="tel"></div>'
    +         '<div class="cm-group" id="cm-resume-group" hidden>'
    +           '<label class="cm-label">Resume <span style="color:rgba(255,255,255,0.25);font-weight:400;text-transform:none;letter-spacing:0;">(PDF, DOC, DOCX — optional)</span></label>'
    +           '<label class="cm-file-label" for="cm-resume">'
    +             '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>'
    +             '<span id="cm-resume-label-text">Choose file or drop here</span>'
    +           '</label>'
    +           '<input type="file" id="cm-resume" name="resume" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" style="display:none">'
    +           '<p id="cm-resume-name"></p>'
    +         '</div>'
    +         '<div class="cm-group"><label class="cm-label" for="cm-message">Message <span style="color:#c05;">&ast;</span></label><textarea class="cm-textarea" id="cm-message" name="message" required></textarea></div>'
    +         '<div class="cm-submit">'
    +           '<button class="cm-btn" type="submit" id="cm-submit-btn">Send Message</button>'
    +           '<p class="cm-legal">Your info is used only to respond to your inquiry.</p>'
    +         '</div>'
    +       '</div>'
    +       '<div id="cm-success" hidden>'
    +         '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20"/><path d="M15 24l7 7 11-14"/></svg>'
    +         '<h3>Message Sent</h3>'
    +         '<p>Thanks for reaching out. We\'ll get back to you within one business day.</p>'
    +       '</div>'
    +     '</form>'
    +   '</div>'
    + '</div>';

  function init() {
    document.body.insertAdjacentHTML('beforeend', MODAL_HTML);

    var overlay    = document.getElementById('cm-overlay');
    var form       = document.getElementById('cm-form');
    var btn        = document.getElementById('cm-submit-btn');
    var resumeInput = document.getElementById('cm-resume');

    resumeInput.addEventListener('change', function () {
      var name = resumeInput.files[0] ? resumeInput.files[0].name : '';
      document.getElementById('cm-resume-name').textContent = name;
      document.getElementById('cm-resume-label-text').textContent = name || 'Choose file or drop here';
    });

    // open on any trigger
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-contact-modal]');
      if (trigger) {
        e.preventDefault();
        openModal(trigger.getAttribute('data-subject') || 'General Inquiry');
        return;
      }
      if (e.target === overlay || e.target.id === 'cm-close') {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    // Netlify AJAX submit
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      btn.disabled = true;
      btn.textContent = 'Sending…';

      var data = new FormData(form);
      fetch('/', { method: 'POST', body: data })
        .then(showSuccess)
        .catch(showSuccess); // show success even on network edge cases
    });
  }

  function openModal(subject) {
    document.getElementById('cm-subject').value = subject;
    var isCareer = /career|application|resume/i.test(subject);
    document.getElementById('cm-resume-group').hidden = !isCareer;
    document.getElementById('cm-title').textContent = isCareer ? 'Send Your Resume' : 'Send Us a Message';
    var overlay = document.getElementById('cm-overlay');
    overlay.removeAttribute('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      var f = document.getElementById('cm-name');
      if (f) f.focus();
    }, 60);
  }

  function closeModal() {
    var overlay = document.getElementById('cm-overlay');
    if (!overlay || overlay.hasAttribute('hidden')) return;
    overlay.setAttribute('hidden', '');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // reset for next open
    document.getElementById('cm-form').reset();
    document.getElementById('cm-success').hidden = true;
    document.getElementById('cm-fields').hidden = false;
    document.getElementById('cm-resume-group').hidden = true;
    document.getElementById('cm-resume-name').textContent = '';
    document.getElementById('cm-resume-label-text').textContent = 'Choose file or drop here';
    document.getElementById('cm-title').textContent = 'Send Us a Message';
    var btn = document.getElementById('cm-submit-btn');
    btn.disabled = false;
    btn.textContent = 'Send Message';
  }

  function showSuccess() {
    document.getElementById('cm-fields').hidden = true;
    document.getElementById('cm-success').hidden = false;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
