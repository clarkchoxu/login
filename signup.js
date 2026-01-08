async function sha256Hex(input){
  const enc = new TextEncoder();
  const data = enc.encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2,'0'))
    .join('');
}

function randomSaltHex(){
  const a = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(a)
    .map(b => b.toString(16).padStart(2,'0'))
    .join('');
}

document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('signupForm');
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

if (username.includes(' ') || username.length < 3 || username.length > 20) {
  return res.status(400).json({ error: 'Invalid username' });
}
    

    const salt = randomSaltHex();
    const hash = await sha256Hex(salt + password);

    const res = await fetch('https://css-backend-1.onrender.com/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, salt, hash })
    });

    const data = await res.json();

    if(!res.ok){
      err.textContent = data.error;
      err.hidden = false;
      return;
    }

    err.textContent = 'Account created!';
    err.hidden = false;

    setTimeout(() => location.href = 'login.html', 800);
  });
});
