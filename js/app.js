import { loadTasks, saveTasks } from './storage.js';
import {
  createTask,
  toggleTask,
  updateTask,
  deleteTask,
  filterTasks,
  sortTasks
} from './tasks.js';
import { renderTasks } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {

  // Elementos principais
  const form = document.getElementById('task-form');
  const titleInput = document.getElementById('task-title');
  const deadlineInput = document.getElementById('task-deadline');
  const filterSelect = document.getElementById('filter');
  const sortSelect = document.getElementById('sort');
  const expiredCountEl = document.getElementById('expired-count');
  const toggleThemeBtn = document.getElementById('toggle-theme');

  // Modal de edição
  const modal = document.getElementById('edit-modal');
  const editTitleInput = document.getElementById('edit-title');
  const editDeadlineInput = document.getElementById('edit-deadline');
  const cancelEditBtn = document.getElementById('cancel-edit');
  const saveEditBtn = document.getElementById('save-edit');

  if (!form || !titleInput || !deadlineInput) return;

  // Estado da aplicação
  let tasks = loadTasks();
  let currentFilter = 'all';
  let currentSort = 'deadline';
  let taskBeingEdited = null;

  // Tema salvo
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }

  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem(
        'theme',
        document.body.classList.contains('dark') ? 'dark' : 'light'
      );
    });
  }

  function updateExpiredCount() {
    if (!expiredCountEl) return;

    const count = tasks.filter(
      t => !t.completed && new Date(t.deadline) < new Date()
    ).length;

    expiredCountEl.textContent = `⚠ ${count} tarefa(s) vencida(s)`;
  }

  function refresh() {
    const filtered = filterTasks(tasks, currentFilter);
    const sorted = sortTasks(filtered, currentSort);

    saveTasks(tasks);
    renderTasks(sorted);
    updateExpiredCount();
  }

  // Nova tarefa
  form.addEventListener('submit', e => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const deadline = deadlineInput.value;

    if (!title || !deadline) return;

    tasks.push(createTask(title, deadline));
    form.reset();
    refresh();
  });

  if (filterSelect) {
    filterSelect.addEventListener('change', e => {
      currentFilter = e.target.value;
      refresh();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', e => {
      currentSort = e.target.value;
      refresh();
    });
  }

  // Edição
  window.onEdit = id => {
    const task = tasks.find(t => t.id === id);
    if (!task || !modal) return;

    taskBeingEdited = task;
    editTitleInput.value = task.title;
    editDeadlineInput.value = task.deadline;

    modal.classList.remove('hidden');
  };

  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      taskBeingEdited = null;
    });
  }

  if (saveEditBtn) {
    saveEditBtn.addEventListener('click', () => {
      if (!taskBeingEdited) return;

      const newTitle = editTitleInput.value.trim();
      const newDeadline = editDeadlineInput.value;

      if (!newTitle || !newDeadline) return;

      updateTask(taskBeingEdited, newTitle, newDeadline);
      modal.classList.add('hidden');
      taskBeingEdited = null;
      refresh();
    });
  }

  // Ações da lista
  window.onToggle = id => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    toggleTask(task);
    refresh();
  };

  window.onDelete = id => {
    tasks = deleteTask(tasks, id);
    refresh();
  };

  refresh();
});
