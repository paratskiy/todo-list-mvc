'use strict';

class TodoList {

    constructor(parent, isFirstIni, name, data) {

        this.isFirstIni = isFirstIni || false;

        this.parent = parent;
        this.data = data;
        this.name = name;

        this.addTodoListBtn = document.querySelector('#add-todo-list');

        this.editTodoListBtn = document.querySelector('.todo-list-header .edit');
        this.deleteTodoListBtn = document.querySelector('.todo-list-header .delete');

        this.addTodoItemBtn = document.querySelector('.add-todo-item-btn');

        this.inputAddTodoItem = document.querySelector('.add-todo-item');
        this.todoListWrap = document.querySelector('.todo-list-wrap');
        this.editTodoTitle = document.querySelector('.edit-todo-title');

        this.todoListWrap.dataset.projectName = '';
        this.todoListWrap.dataset.projectId = '';
        this.todoListWrap.dataset.elementName = 'project';

    }

    bindEvents() {
        console.log(this);

        this.addTodoItemBtn.addEventListener('click', () => {

            console.log('add todo item');
            // if (this.isValid(this.inputAddTodoItem)) {

            //     this.insertTodoList(taskInfo);

            //     this.inputAddTodoItem.value = '';

            //     if (taskInfo) {
            //         console.log(taskInfo);
            //     }

            // } else {
            //     console.log('invalid');
            // }

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
                        // todoList.createTodoList();
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

        this.editItemBtn = this.createElement('i', { class: 'fas fa-pen edit' });
        this.deleteItemBtn = this.createElement('i', { class: 'far fa-trash-alt delete' });

        this.todoItem = document.querySelector('.todo-item');
        this.editItemTitle = document.querySelector('.edit-item-title');
        this.completeCheckbox = document.querySelector('input[type=checkbox]');

        this.todoItem.dataset.taskName = this.todoItemName;
        this.todoItem.dataset.taskId = '';
        this.todoItem.dataset.status = '0';
        this.todoItem.dataset.taskProjectId = this.project_id;


    }


    bindEvent() {

        
        this.deleteItemBtn.addEventListener('click', () => {
            
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