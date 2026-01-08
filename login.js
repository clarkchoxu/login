document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const err = document.getElementById('error');
  const pw = document.getElementById('password');
  const toggleBtn = document.getElementById('togglePw');

  // Show/hide password
  toggleBtn.addEventListener('click', () => {
    const isHidden = pw.type === 'password';
    pw.type = isHidden ? 'text' : 'password';
    toggleBtn.textContent = isHidden ? 'Hide' : 'Show';
  });

async function sha256Hex(input){
  const enc = new TextEncoder();
  const data = enc.encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2,'0'))
    .join('');
}

document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('loginForm');
  const err = document.getElementById('error');

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    err.hidden = true;

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if(!username || !password){
      err.textContent = 'Fill all fields';
      err.hidden = false;
      return;
    }



    const res = await fetch('https://css-backend-1.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });

    if(!res.ok){
      err.textContent = 'Invalid username or password';
      err.hidden = false;
      return;
    }

    const { salt, hash, token } = await res.json();
    const inputHash = await sha256Hex(salt + password);

    if(inputHash !== hash){
      err.textContent = 'Invalid username or password';
      err.hidden = false;
      return;
    }
// After successful password verification
if(inputHash === hash){
  localStorage.setItem('authToken', token); // Store token from response
  localStorage.setItem('loggedIn', '1');
  window.location.href = 'index.html';
}
  });
});

