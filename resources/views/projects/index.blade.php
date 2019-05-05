@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">

        @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
        @endif

        <header>
            <span class="title">Simple ToDo Lists<span>from ruby garage</span></span>
        </header>

        @if (count($projects) > 0)
        @foreach ($projects as $project)
        <div class="todo-list-wrap" data-id="{{ $project->id }}">

            <div class="todo-list-header">
                <i class="far fa-calendar-alt calendar"></i>
                <label class="title todo-title">{{ $project->name }} </label>

                <form action="{{ url('project/edit/'.$project->id) }}" method="POST" class="edit edit-todo-list hide">
                    {{ csrf_field() }}

                    <input type="text" name="name" class="edit edit-todo-title hide" value="{{ $project->name }}">
                    <button class="edit-todo-list-btn" type="submit" onclick="console.log(this)">Edit Todo List</button>
                </form>

                <i class="fas fa-pen edit" onclick="edit(this)"></i>

                <form action="{{ url('project/'.$project->id) }}" method="POST" class="delete">
                    {{ csrf_field() }}
                    {{ method_field('DELETE') }}

                    <button type="submit" id="delete-project-{{ $project->id }}" class="delete-btn">
                        <i class="far fa-trash-alt delete"></i>
                    </button>
                </form>
            </div>

            <form action="{{ url('task/'.$project->id) }}" method="POST" class="create-todo-item">
                {{ csrf_field() }}

                <i class="fas fa-plus"></i>
                <input type="text" name="name" class="add-todo-item" placeholder="Start typing here to create a task...">
                <button class="add-todo-item-btn" type="submit" onclick="console.log(this)">Add Task</button>
            </form>

            <ul class="todo-list">

                @if (count($project->tasks) > 0)
                @foreach ($project->tasks as $task)
                <li class="todo-item" data-id="{{ $task->id }}">

                    @if($task->status)
                    <form action="{{ url('task/status/'.$task->id) }}" method="POST" class="change-status-form">
                        {{ csrf_field() }}
                        <input type="checkbox" name="complete" class="done" OnChange='this.form.submit()' checked>
                    </form>
                    @endif

                    @if(!$task->status)
                    <form action="{{ url('task/status/'.$task->id) }}" method="POST" class="change-status-form">
                        {{ csrf_field() }}
                        <input type="checkbox" name="complete" class="done" OnChange='this.form.submit()'>
                    </form>
                    @endif

                    <label class="title item-title">{{ $task->name }}</label>

                    <form action="{{ url('task/edit/'.$task->id) }}" method="POST" class="edit edit-todo-item hide">
                        {{ csrf_field() }}

                        <input type="text" name="name" class="edit edit-item-title hide" value="{{ $task->name }}">
                        <button class="edit-todo-item-btn" type="submit" onclick="console.log(this)">Edit Item</button>

                    </form>

                    <i class="fas fa-pen edit" onclick="edit(this)"></i>

                    <form action="{{ url('task/'.$task->id) }}" method="POST" class="delete">
                        {{ csrf_field() }}
                        {{ method_field('DELETE') }}

                        <button type="submit" id="delete-task-{{ $task->id }}" class="delete-btn">
                            <i class="far fa-trash-alt delete"></i>
                        </button>
                    </form>

                </li>
                @endforeach
                @endif

            </ul>

        </div>
        @endforeach
        @endif

        <div class="panel-body">

            <!-- New Project Form -->
            <form action="{{ url('project') }}" method="POST" class="form-horizontal">
                {{ csrf_field() }}

                <!-- Project Name -->
                <input type="text" name="name" id="project-name" class="form-control" placeholder="Start typing here to create a projrct...">

                <!-- Add Task Button -->
                <button id="add-todo-list" type="submit"><i class="fas fa-plus"></i>Add TODO List</button>
            </form>

        </div>



    </div>
</div>
@endsection