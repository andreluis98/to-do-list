const model = {
  todos: [],

  addTodo: function (todo) {
    const existingTodo = this.todos.find(item => item.text === todo);

    if (!existingTodo) {
      this.todos.push({ text: todo, completed: false });
    }
  },

  removeTodo: function (todo) {
    const index = this.todos.findIndex(item => item.text === todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  },

  editTodo: function (oldTodo, newTodo) {
    const index = this.todos.findIndex(item => item.text === oldTodo);
    if (index !== -1) {
      this.todos[index].text = newTodo;
    }
  },

  toggleComplete: function (todo) {
    const index = this.todos.findIndex(item => item.text === todo);
    if (index !== -1) {
      this.todos[index].completed = !this.todos[index].completed;
    }
  },

  // Função para ordenar as tarefas por ordem alfabética
  sortTodos: function () {
    this.todos.sort((a, b) => a.text.localeCompare(b.text));
  },
};

const view = {
  todoList: document.getElementById("todo-list"),

  renderTodo: function () {
    // Ordenar as tarefas por ordem alfabética
    model.sortTodos();

    // Limpar a lista de tarefas existente
    this.todoList.innerHTML = "";

    // Iterar sobre as tarefas ordenadas e renderizá-las
    for (const item of model.todos) {
      const todoItem = document.createElement("li");

      // Criar elemento para o texto da tarefa
      const todoText = document.createElement("span");
      todoText.textContent = item.text;

      // Criar um checkbox para marcar a tarefa como concluída
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item.completed;

      // Botão de remover
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remover";

      // Evento de clique para o botão de remover
      removeButton.addEventListener("click", function () {
        const todoText = item.text;
        model.removeTodo(todoText);
        view.renderTodo(); // Renderize a lista de tarefas após remover uma tarefa
      });

      // Botão de editar
      const editButton = document.createElement("button");
      editButton.textContent = "Editar";

      // Evento de clique para o botão de editar
      editButton.addEventListener("click", function () {
        if (!todoItem.classList.contains("editing")) {
          todoItem.classList.add("editing");

          const currentText = todoText.textContent;

          // Crie um campo de entrada de texto para edição
          const editText = document.createElement("input");
          editText.value = currentText;

          // Adicione um botão de "Salvar" para confirmar a edição
          const saveButton = document.createElement("button");
          saveButton.textContent = "Salvar";

          // Evento de clique para o botão de "Salvar"
          saveButton.addEventListener("click", function () {
            const newTodoText = editText.value;

            if (newTodoText.trim() !== "") {
              model.editTodo(currentText, newTodoText);
              todoText.textContent = newTodoText;
              todoItem.classList.remove("editing");

              // Remova o campo de edição e o botão de "Salvar"
              todoItem.removeChild(editText);
              todoItem.removeChild(saveButton);

              // Adicione novamente os botões de editar e remover
              todoItem.appendChild(editButton);
              todoItem.appendChild(removeButton);
            }
          });

          // Remova os botões de editar e de remover
          todoItem.removeChild(editButton);
          todoItem.removeChild(removeButton);

          // Adicionar o campo de edição e o botão de salvar
          todoItem.appendChild(editText);
          todoItem.appendChild(saveButton);
        }
      });

      // Adicionar evento de alteração para o checkbox
      checkbox.addEventListener("change", function () {
        model.toggleComplete(item.text);
        view.renderTodo(); // Renderize a lista de tarefas após marcar uma tarefa como concluída
      });

      // Adicionar elementos ao item da tarefa
      todoItem.appendChild(checkbox);
      todoItem.appendChild(todoText);
      todoItem.appendChild(removeButton);
      todoItem.appendChild(editButton);

      // Adicionar o item da tarefa à lista de tarefas
      if (item.completed) {
        todoItem.classList.add("completed");
      }

      this.todoList.appendChild(todoItem);
    }
  },
};

const controller = {
  init: function () {
    const todoForm = document.getElementById("todo-form");
    todoForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const todoInput = document.getElementById("todo-input");
      const todo = todoInput.value;
      if (todo.trim() !== "") {
        model.addTodo(todo);
        todoInput.value = "";
        view.renderTodo(); // Renderize a lista de tarefas após adicionar uma nova tarefa
      }
    });
  },
};

controller.init();
view.renderTodo();


