document.addEventListener('DOMContentLoaded', () => {

    const todoInput = document.getElementById('todo-input');
    const addButton = document.querySelector('.add-btn');
    const todoList = document.querySelector('.todo-list');
    const emptyState = document.querySelector('.empty-state');

    // loads Todo from localstroages
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function updateEmptyState() {
        if (todos.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }
    }

    function createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = 'todo-item' + (todo.completed ? ' completed' : '');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        
        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = todo.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        
        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteBtn);
        
        return li;
    }

    function renderTodos() {
        todoList.innerHTML = '';
        if (todos.length === 0) {
            todoList.appendChild(emptyState);
        } else {
            todos.forEach((todo, index) => {
                const li = createTodoElement(todo);
                
                // Add event listeners
                li.querySelector('.todo-checkbox').addEventListener('change', () => {
                    toggleTodo(index);
                });
                
                li.querySelector('.delete-btn').addEventListener('click', () => {
                    deleteTodo(index, li);
                });
                
                todoList.appendChild(li);
            });
        }
        updateEmptyState();
    }

    function addTodo(text) {
        if (text.trim()) {
            todos.push({ text, completed: false });
            saveTodos();
            renderTodos();
            todoInput.value = '';
        }
    }

    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    }

    function deleteTodo(index, element) {
        element.classList.add('removing');
        element.addEventListener('animationend', () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });
    }

    // Event Listeners
    addButton.addEventListener('click', () => {
        addTodo(todoInput.value);
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo(todoInput.value);
        }
    });

    // Initial render
    renderTodos();
});