document.addEventListener("DOMContentLoaded", () => {


  const API_BASE = "http://localhost:3000/tarefas";

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const list = document.getElementById("taskList");
  const form = document.getElementById("taskForm");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!list || !form) {
    alert("HTML errado: taskList ou taskForm não encontrado");
    return;
  }


  function getId(task) {
    return task.id ?? task.taskid ?? task.id_task ?? task.taskId;
  }

  // carregar as tarefas 
  async function loadTasks() {

    const res = await fetch(API_BASE, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("GET erro:", res.status, data);
      alert("Erro ao buscar tarefas");
      return;
    }

    if (!Array.isArray(data)) {
      console.error("Resposta não é lista:", data);
      return;
    }

    list.innerHTML = "";

    data.forEach(task => {

      const id = getId(task);
      console.log("TASK:", task, "ID usado:", id);

      const li = document.createElement("li");

      li.innerHTML = `
        <b>${task.titulo ?? "(sem título)"}</b>
        <div>Objetivo: ${task.objetivo ?? ""}</div>
        <div>Descrição: ${task.descricao ?? ""}</div>

        <button class="editBtn" data-id="${id}">Editar</button>
        <button class="deleteBtn" data-id="${id}">Deletar</button>
        
      `;

      list.appendChild(li);
    });
  }

  // create 
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const objetivo = document.getElementById("objetivo").value;
    const descricao = document.getElementById("descricao").value;

    const res = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ titulo, objetivo, descricao })
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("POST erro:", data);
      alert("Erro ao criar tarefa");
      return;
    }

    form.reset();
    loadTasks();
  });

  // click 
  list.addEventListener("click", async (e) => {

    const btn = e.target.closest("button");
    if (!btn) return;

    const id = btn.dataset.id;
    if (!id || id === "undefined") {
      alert("ID inválido — veja o console");
      console.error("ID inválido:", id);
      return;
    }

    // delete
    if (btn.classList.contains("deleteBtn")) {

      if (!confirm("Deletar tarefa?")) return;

      console.log("DELETE URL:", `${API_BASE}/${id}`);

      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      const text = await res.text();
      let payload = {};
      try { payload = text ? JSON.parse(text) : {}; } catch {}

      if (!res.ok) {
        console.error("DELETE erro:", res.status, payload);
        alert(payload.message || `Erro ao deletar (${res.status})`);
        return;
      }

      loadTasks();
    }

    // update 
    if (btn.classList.contains("editBtn")) {

      const titulo = prompt("Novo título:");
      if (titulo === null) return;

      const objetivo = prompt("Novo objetivo:");
      if (objetivo === null) return;

      const descricao = prompt("Nova descrição:");
      if (descricao === null) return;

      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ titulo, objetivo, descricao })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error("PUT erro:", data);
        alert("Erro ao editar");
        return;
      }

      loadTasks();
    }
  });

  // logout 
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
  }

  loadTasks();
});