'use strict';

class TodoList {

    constructor(parent, isFirstIni, name, data) {

        this.isFirstIni = isFirstIni || false;

        this.parent = parent;
        this.data = data;
        this.name = name;

        this.addTodoListBtn = document.querySelector('#add-todo-list');

        this.todoListName = (this.name) ? this.name : '';

        this.logoTodoList = this.createElement('i', { class: 'far fa-calendar-alt calendar' });
        this.editTodoTitle = this.createElement('input', { type: 'text', name: 'edit-todo-title', class: 'edit edit-todo-title hide', value: this.todoListName });
        this.titleTodoList = this.createElement('label', { class: 'title todo-title' }, this.todoListName);
        this.editTodoListBtn = this.createElement('i', { class: 'fas fa-pen edit' });
        this.deleteTodoListBtn = this.createElement('i', { class: 'far fa-trash-alt delete' });


        this.todoListHeader = this.createElement('form', {
            class: 'todo-list-header',
            onsubmit: 'return false'
        }, this.logoTodoList, this.titleTodoList, this.editTodoTitle, this.editTodoListBtn, this.deleteTodoListBtn);

        this.logoAddTodoItem = this.createElement('i', { class: 'fas fa-plus' });
        this.inputAddTodoItem = this.createElement('input', {
            type: 'text',
            name: 'add-todo-item',
            class: 'add-todo-item',
            placeholder: 'Start typing here to create a task...'
        });

        this.addTodoItemBtn = this.createElement('button', { class: 'add-todo-item-btn', type: 'button' }, 'Add Task');
        this.createTodoItem = this.createElement('form', {
            class: 'create-todo-item',
            onsubmit: 'return false'
        }, this.logoAddTodoItem, this.inputAddTodoItem, this.addTodoItemBtn);

        this.todoList = this.createElement('ul', { class: 'todo-list' });
        this.todoListWrap = this.createElement('div', { class: 'todo-list-wrap' }, this.todoListHeader, this.createTodoItem, this.todoList);

        this.todoListWrap.dataset.projectName = '';
        this.todoListWrap.dataset.projectId = '';
        this.todoListWrap.dataset.elementName = 'project';

    }

    createTodoList() {
        console.log(this);

        this.parent.insertBefore(this.todoListWrap, this.addTodoListBtn);

        if (this.data) {

            this.todoListWrap.dataset.projectId = this.data.project_id;
            this.todoListWrap.dataset.projectName = this.name;

            for (const key in this.data) {

                if (this.data.hasOwnProperty(key) && typeof this.data[key] != 'string') {

                    const element = this.data[key];
                    const todoItem = new TodoItem(this.todoList, element.task_name, this.data.project_id, element.status, element.id);
                    todoItem.addTodoItem();

                }

            }

        }

        this.addTodoItemBtn.addEventListener('click', () => {

            if (this.isValid(this.inputAddTodoItem)) {

                const todoItem = new TodoItem(this.todoList, this.inputAddTodoItem.value, this.todoListWrap.dataset.projectId);
                let taskInfo = todoItem.addTodoItem();

                this.insertTodoList(taskInfo);

                this.inputAddTodoItem.value = '';

                if (taskInfo) {
                    console.log(taskInfo);
                }

            } else {
                console.log('invalid');
            }

        });

        this.deleteTodoListBtn.addEventListener('click', () => {

            let projectInfo = this.deleteElement(this.todoListWrap);
            let children = this.todoListWrap.querySelectorAll('.todo-item');

            for (let i = 0; i < children.length; i++) {

                const element = children[i];
                let taskInfo = this.deleteElement(element);
                this.deleteTodoList(taskInfo);

            }

            this.deleteTodoList(projectInfo);

        });

        this.editTodoListBtn.addEventListener('click', () => {

            if (this.isValid(this.editTodoTitle)) {

                let projectInfo = this.editElement(this.todoListWrap);

                if (projectInfo.project_id == '') {
                    this.insertTodoList(projectInfo);
                } else {
                    this.updateTodoList(projectInfo);
                }

            } else {

                console.log('invalid');

            }

        });

        if (!name) {
            this.nameTheList(this.todoListWrap);
        }

    }

    nameTheList(el) {

        const editInput = el.querySelector('input.edit');

        editInput.focus();

        this.editElement(el);

        if (this.isValid(editInput)) {
            let projectName = this.editElement(el);
        } else {
            console.log('invalid');
        }

    }

    loadTodoList() {

        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'server/load_data.php', true);

        xhr.send('load-todo-list');

        xhr.onreadystatechange = () => {

            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {

                const response = JSON.parse(xhr.responseText);

                for (const key in response) {
                    if (response.hasOwnProperty(key)) {
                        const element = response[key];
                        const todoList = new TodoList(parentNode, false, key, element);
                        todoList.createTodoList();
                    }
                }

            }

        }

    }

    updateTodoList(body) {

        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'server/update_data.php', true);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(body));

        xhr.onreadystatechange = () => {

            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                console.log(xhr.responseText);
            }

        }

    }

    insertTodoList(body) {

        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'server/insert_data.php', true);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(body));

        xhr.onreadystatechange = () => {

            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                if (this.todoListWrap.dataset.projectId == '') {
                    this.todoListWrap.dataset.projectId = xhr.responseText;
                }

                console.log(xhr.responseText);

            }

        }

    }


    deleteTodoList(body) {

        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'server/delete_data.php', true);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(body));

        xhr.onreadystatechange = () => {

            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {

                console.log(xhr.responseText);

            }

        }

    }

    deleteElement(el) {
        el.parentNode.removeChild(el);
        if (el.dataset.elementName == 'project') {

            return {
                element_name: el.dataset.elementName,
                project_name: el.dataset.projectName,
                project_id: el.dataset.projectId
            }
        }

        if (el.dataset.elementName == 'task') {

            return {
                element_name: el.dataset.elementName,
                task_name: el.dataset.taskName,
                task_id: el.dataset.taskId,
                task_status: el.dataset.status,
                task_project_id: el.dataset.taskProjectId
            }
        }
    }

    editElement(el) {

        const editInput = el.querySelector('input.edit');
        const editableLabel = el.querySelector('label.title');

        editInput.classList.toggle('hide');
        editableLabel.classList.toggle('hide');

        editInput.focus();
        editInput.selectionStart = editInput.value.length;

        if (editInput.value != editableLabel.innerHTML) {

            if (el.dataset.elementName == 'project') {

                this.todoListWrap.dataset.projectName = editInput.value;
                editableLabel.innerHTML = editInput.value;
                return {
                    element_name: this.todoListWrap.dataset.elementName,
                    project_name: this.todoListWrap.dataset.projectName,
                    project_id: this.todoListWrap.dataset.projectId
                }
            }

            if (el.dataset.elementName == 'task') {

                this.todoItem.dataset.taskName = editInput.value;
                editableLabel.innerHTML = editInput.value;
                return {
                    element_name: this.todoItem.dataset.elementName,
                    task_name: this.todoItem.dataset.taskName,
                    task_id: this.todoItem.dataset.taskId,
                    task_status: this.todoItem.dataset.status,
                    task_project_id: this.todoItem.dataset.taskProjectId
                }
            }

            editableLabel.innerHTML = editInput.value;

        }

        return false;

    }

    isValid(el) {

        if (el.value.length > 0) {
            return true;
        }

        return false;

    }

}


class TodoItem extends TodoList {

    constructor(todoList, name_from_db, project_id, status, task_id, name) {

        super();

        this.todoList = todoList;
        this.name_from_db = name_from_db;
        this.name = name;
        this.status = status;
        this.task_id = task_id;
        this.project_id = project_id || '';

        this.todoItemName = (this.name_from_db) ? this.name_from_db : this.name;
        this.isComlete = (this.status == 0) ? false : true;

        this.completeCheckbox = this.createElement('input', { type: 'checkbox', name: 'done', class: 'done' });
        this.itemTitle = this.createElement('label', { class: 'title item-title' }, this.todoItemName);
        this.editItemTitle = this.createElement('input', { type: 'text', name: 'edit-item-title', class: 'edit edit-item-title hide', value: this.todoItemName });
        this.editItemBtn = this.createElement('i', { class: 'fas fa-pen edit' });
        this.deleteItemBtn = this.createElement('i', { class: 'far fa-trash-alt delete' });
        this.todoItem = this.createElement('li', { class: 'todo-item' }, this.completeCheckbox, this.itemTitle, this.editItemTitle, this.editItemBtn, this.deleteItemBtn);

        this.todoItem.dataset.taskName = this.todoItemName;
        this.todoItem.dataset.taskId = '';
        this.todoItem.dataset.status = '0';
        this.todoItem.dataset.taskProjectId = this.project_id;


    }


    addTodoItem() {

        this.todoList.appendChild(this.todoItem);

        this.deleteItemBtn.addEventListener('click', () => {
            console.log(this.todoItem.dataset.taskId);

            let taskInfo = this.deleteElement(this.todoItem);

            if (taskInfo) {
                this.deleteTodoList(taskInfo);
            }

        });

        this.editItemBtn.addEventListener('click', () => {
            if (this.isValid(this.editItemTitle)) {

                let taskInfo = this.editElement(this.todoItem);

                if (taskInfo) {

                    if (taskInfo.task_id == '') {
                        this.insertTodoList(taskInfo);
                    } else {
                        this.updateTodoList(taskInfo);
                    }

                }

            } else {
                console.log('invalid');
            }
        });

        this.completeCheckbox.addEventListener('change', () => {
            let taskInfo = this.completeTask();

            if (taskInfo) {
                this.updateTodoList(taskInfo);
            }
        })

        if (this.status == true) {
            this.completeCheckbox.checked = this.isComlete;
            this.completeTask(this.todoItem);
        }

        if (this.task_id) {
            this.todoItem.dataset.taskId = this.task_id;
        }

        if (this.name_from_db) {
            this.todoItem.dataset.taskName = this.name_from_db;
        }

        this.todoItem.dataset.elementName = 'task';

        return {
            element_name: this.todoItem.dataset.elementName,
            task_name: this.todoItem.dataset.taskName,
            task_id: this.todoItem.dataset.taskId,
            task_status: this.todoItem.dataset.status,
            task_project_id: this.todoItem.dataset.taskProjectId
        }



    }

    completeTask() {

        const completeCheckbox = this.todoItem.querySelector('.done');

        this.todoItem.classList.toggle('complete');

        if (this.todoItem.dataset.status == 0) {
            this.todoItem.dataset.status = 1;
        } else {
            this.todoItem.dataset.status = 0;
        }

        return {
            element_name: this.todoItem.dataset.elementName,
            task_name: this.todoItem.dataset.taskName,
            task_id: this.todoItem.dataset.taskId,
            task_status: this.todoItem.dataset.status,
            task_project_id: this.todoItem.dataset.taskProjectId
        }

    }

}
