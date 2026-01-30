import { daysUntil } from './utils.js';

export function getTaskStatus(task) {
  if (task.completed) return 'completed';

  const days = daysUntil(task.deadline);

  if (days < 0) return 'expired';
  if (days <= 3) return 'warning';
  return 'normal';
}

export function createTask(title, deadline) {
  return {
    id: Date.now(),
    title: title.trim(),
    deadline,
    completed: false,
    createdAt: new Date().toISOString()
  };
}

export function toggleTask(task) {
  task.completed = !task.completed;
}

export function updateTask(task, title, deadline) {
  task.title = title.trim();
  task.deadline = deadline;
}

export function deleteTask(tasks, id) {
  return tasks.filter(task => task.id !== id);
}

export function filterTasks(tasks, filter) {
  if (filter === 'completed') {
    return tasks.filter(task => task.completed);
  }

  if (filter === 'pending') {
    return tasks.filter(task => !task.completed);
  }

  if (filter === 'expired') {
    return tasks.filter(
      task => !task.completed && new Date(task.deadline) < new Date()
    );
  }

  return tasks;
}

export function sortTasks(tasks, type) {
  const sorted = [...tasks];

  if (type === 'deadline') {
    return sorted.sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline)
    );
  }

  if (type === 'created') {
    return sorted.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

  return sorted;
}
