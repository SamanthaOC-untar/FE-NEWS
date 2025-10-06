// ===== Grab elements (Mulai)
const profileForm  = document.getElementById('accountForm');
const errors       = document.getElementById('errors');
const toast        = document.getElementById('toast');

const userDisplay  = document.getElementById('display');
const userEmail    = document.getElementById('email');
const userFirst    = document.getElementById('first');
const userLast     = document.getElementById('last');
const userPhone    = document.getElementById('phone');
const userPass     = document.getElementById('pass');
const userPass2    = document.getElementById('pass2');
const userNews     = document.getElementById('newsletter'); // checkbox
const userNotif    = document.getElementById('notif');      // checkbox

const vDisplay = document.getElementById('vDisplay');
const vEmail   = document.getElementById('vEmail');
const vFirst   = document.getElementById('vFirst');
const vLast    = document.getElementById('vLast');
const vPhone   = document.getElementById('vPhone');
const vNews    = document.getElementById('vNews');
const vNotif   = document.getElementById('vNotif');
// ===== Grab elements (Selesai)

// ===== Toast helper (Mulai)
function showToast(msg){
  if(!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast.t);
  showToast.t = setTimeout(()=> toast.classList.remove('show'), 1600);
}
// ===== Toast helper (Selesai)

profileForm.addEventListener('submit', function(e){
  e.preventDefault();

  // ===== Collect values (Mulai)
  const display = (userDisplay?.value || '').trim();
  const email   = (userEmail?.value   || '').trim();
  const first   = (userFirst?.value   || '').trim();
  const last    = (userLast?.value    || '').trim();
  const phone   = (userPhone?.value   || '').trim();
  const pass    = (userPass?.value    || '').trim();
  const pass2   = (userPass2?.value   || '').trim();
  const newsOn  = !!(userNews && userNews.checked);
  const notifOn = !!(userNotif && userNotif.checked);
  // ===== Collect values (Selesai)

  // ===== Validation (gaya login) (Mulai)
  let errs = [];
  if(!display) errs.push("Username is required.");
  if(!email)   errs.push("Email is required.");
  if(!first)   errs.push("First name is required.");
  if(!last)    errs.push("Last name is required.");
  if(!phone)   errs.push("Phone number is required.");
  if(pass && !pass) {
    errs.push("Confirm password is required.");
    if(pass && pass.length < 8) errs.push("Password must be at least 8 characters.");
    if(pass && pass2 && pass !== pass2) errs.push("Passwords do not match.");
  }
  if(phone && !/^\+?[0-9\s\-]{8,}$/.test(phone)) errs.push("Phone number format is invalid.");

  if(errs.length > 0){
    // persis seperti login: set plain + set <ul>
    errors.innerHTML = errs.join("<br>");
    errors.innerHTML = `
      <ul>
        ${errs.map(e => `<li>${e}</li>`).join("")}
      </ul>
    `;
    return; // stop submit
  }
  // ===== Validation (Selesai)

  // ===== Update summary (Mulai)
  if(vDisplay) vDisplay.textContent = display || '—';
  if(vEmail)   vEmail.textContent   = email   || '—';
  if(vFirst)   vFirst.textContent   = first   || '—';
  if(vLast)    vLast.textContent    = last    || '—';
  if(vPhone)   vPhone.textContent   = phone   || '—';
  if(vNews)    vNews.textContent    = newsOn  ? 'Aktif' : 'Nonaktif';
  if(vNotif)   vNotif.textContent   = notifOn ? 'On'    : 'Off';

  // kosongkan password setelah sukses
  if(userPass)  userPass.value  = '';
  if(userPass2) userPass2.value = '';
  // ===== Update summary (Selesai)

  // ===== Success feedback (toast) (Mulai)
  showToast("Changes saved");
  // scroll balik ke layar ringkasan (opsional)
  const firstScreen = document.querySelector('.screen');
  if(firstScreen) firstScreen.scrollIntoView({ behavior: 'smooth' });
  // ===== Success feedback (Selesai)
});

// reset -> bersihkan kotak error + beri toast ringan
profileForm.addEventListener('reset', function(){
  if(errors) errors.innerHTML = "";
  showToast("Form reset");
});
