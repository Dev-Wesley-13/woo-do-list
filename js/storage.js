// storage.js

const STORAGE_KEY = 'woo_tasks';

export function loadTasks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Erro ao carregar tarefas do localStorage', e);
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Erro ao salvar tarefas no localStorage', e);
  }
}
