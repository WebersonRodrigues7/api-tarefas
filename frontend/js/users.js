const API_USERS = "http://localhost:3000/users";
const token = localStorage.getItem("token");

// jwt token 
if (!token) {
  window.location.href = "login.html";
}

function getUserIdFromToken() {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.sub; 
}

// update user 
async function updateUser() {
  const id = getUserIdFromToken();

  const email = prompt("Novo email:");
  const password = prompt("Nova senha:");

  await fetch(`${API_USERS}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  alert("Usuário atualizado!");
}

// delete user 
async function deleteUser() {
  const id = getUserIdFromToken();

  const confirmDelete = confirm("Deseja excluir sua conta?");
  if (!confirmDelete) return;

  await fetch(`${API_USERS}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  localStorage.removeItem("token");
  window.location.href = "register.html";
}