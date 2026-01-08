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

  // Form submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    err.hidden = true;

    const username = document.getElementById('username').value.trim();
    const password = pw.value;

    if (!username || !password) {
      err.textContent = 'Fill all fields';
      err.hidden = false;
      return;
    }

    try {
      const res = await fetch('https://css-backend-1.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        err.textContent = 'Invalid username or password';
        err.hidden = false;
        return;
      }

      const { token, username: name } = await res.json();
      const remember = document.getElementById('remember')?.checked;
      const store = remember ? localStorage : sessionStorage;

      store.setItem('authToken', token);
      store.setItem('username', name);

      window.location.href = 'index.html';
    } catch (error) {
      console.error(error);
      err.textContent = 'Server error';
      err.hidden = false;
    }
  });
});
