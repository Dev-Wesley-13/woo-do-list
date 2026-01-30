// ui.js
import { getTaskStatus } from './tasks.js';
import { formatDateBR } from './utils.js';

export function renderTasks(tasks) {
  const list = document.getElementById('task-list');
  if (!list) return;

  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    const status = getTaskStatus(task);

    li.className = `task ${status}`;
    li.innerHTML = `
      <div class="task-info">
        <strong>${task.title}</strong>
        <small>Prazo: ${formatDateBR(task.deadline)}</small>
      </div>
      <div class="task-actions">
        <button class="btn-complete" data-action="toggle" title="Concluir">✓</button>
        <button class="btn-edit" data-action="edit" title="Editar">✎</button>
        <button class="btn-delete" data-action="delete" title="Excluir">✕</button>
      </div>
    `;

    li.querySelector('[data-action="toggle"]')
      .addEventListener('click', () => window.onToggle(task.id));

    li.querySelector('[data-action="edit"]')
      .addEventListener('click', () => window.onEdit(task.id));

    li.querySelector('[data-action="delete"]')
      .addEventListener('click', () => window.onDelete(task.id));

    list.appendChild(li);
  });
}
