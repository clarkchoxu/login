document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  const err = document.getElementById('error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    err.hidden = true;

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
      err.textContent = 'Fill all fields';
      err.hidden = false;
      return;
    }

    try {
      const res = await fetch('https://css-backend-1.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        err.textContent = data.error;
        err.hidden = false;
        return;
      }

      err.textContent = 'Account created!';
      err.hidden = false;

      setTimeout(() => location.href = 'login.html', 800);
    } catch (error) {
      console.error(error);
      err.textContent = 'Server error';
      err.hidden = false;
    }
  });
});
