document.addEventListener('DOMContentLoaded', () => {
  const nameEl = document.getElementById('name');
  const ageEl = document.getElementById('age');
  const colorEl = document.getElementById('color');
  const subscribeEl = document.getElementById('subscribe');
  const submitBtn = document.getElementById('submitBtn');
  const resetBtn = document.getElementById('resetBtn');
  const incrementBtn = document.getElementById('incrementBtn');
  const decrementBtn = document.getElementById('decrementBtn');
  const countEl = document.getElementById('count');
  const resultEl = document.getElementById('result');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const searchResults = document.getElementById('searchResults');
  const searchMessage = document.getElementById('searchMessage');
  const todoInput = document.getElementById('todoInput');
  const addTodoBtn = document.getElementById('addTodoBtn');
  const todoList = document.getElementById('todoList');

  let count = 0;
  let todos = [];

  // Counter functionality
  incrementBtn.addEventListener('click', () => {
    count += 1;
    countEl.textContent = String(count);
  });

  decrementBtn.addEventListener('click', () => {
    count -= 1;
    countEl.textContent = String(count);
  });

  // Form submission
  submitBtn.addEventListener('click', () => {
    const name = nameEl.value.trim();
    const age = ageEl.value.trim();
    const color = colorEl.value;
    const subscribed = subscribeEl.checked ? 'Subscribed' : 'Not Subscribed';

    resultEl.hidden = false;
    resultEl.textContent = `Name: ${name}; Age: ${age}; Color: ${color}; ${subscribed}; Count: ${count}`;
  });

  // Form reset
  resetBtn.addEventListener('click', () => {
    nameEl.value = '';
    ageEl.value = '';
    colorEl.value = 'red';
    subscribeEl.checked = false;
    count = 0;
    countEl.textContent = '0';
    resultEl.hidden = true;
    resultEl.textContent = '';
  });

  // Search functionality
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    const items = Array.from(document.querySelectorAll('#searchResults li'));
    const filtered = items.filter(item => 
      item.textContent.toLowerCase().includes(query)
    );

    if (query === '') {
      searchResults.hidden = true;
      searchMessage.textContent = '';
      return;
    }

    if (filtered.length === 0) {
      searchResults.hidden = true;
      searchMessage.textContent = 'No results found';
      return;
    }

    items.forEach(item => item.style.display = 'none');
    filtered.forEach(item => item.style.display = 'list-item');
    searchResults.hidden = false;
    searchMessage.textContent = `Found ${filtered.length} result(s)`;
  });

  // Todo list functionality
  addTodoBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    if (!taskText) return;

    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
      <span>${taskText}</span>
      <button class="delete-btn" data-id="${todos.length}">Delete</button>
    `;

    li.querySelector('.delete-btn').addEventListener('click', (e) => {
      li.remove();
    });

    todoList.appendChild(li);
    todos.push(taskText);
    todoInput.value = '';
  });

  // Allow Enter key to add todo
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodoBtn.click();
    }
  });
});
