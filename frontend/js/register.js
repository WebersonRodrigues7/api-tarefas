
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const body = Object.fromEntries(new FormData(form));

    const response = await fetch('https://api-tarefas-tau.vercel.app/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = 'login.html';
    } else {
      alert(data.message);
    }
  });
});