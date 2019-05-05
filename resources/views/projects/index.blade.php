@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                    @endif

                    You are logged in!

                    @if (count($projects) > 0)
                    @foreach ($projects as $project)
                    <div class="todo-list-wrap" data-id="{{ $project->id }}">

                        <div class="todo-list-header">
                            <i class="far fa-calendar-alt calendar"></i>
                            <label class="title todo-title">{{ $project->name }} </label>
                            <input type="text" name="edit-todo-title" class="edit edit-todo-title hide" value="{{ $project->name }}">
                            <i class="fas fa-pen edit" onclick="console.log(this)"></i>
                            <!-- <i class="far fa-trash-alt delete"></i> -->
                            <form action="{{ url('project/'.$project->id) }}" method="POST" class="delete">
                                {{ csrf_field() }}
                                {{ method_field('DELETE') }}

                                <button type="submit" id="delete-project-{{ $project->id }}" class="btn btn-danger delete">
                                    <i class="far fa-trash-alt delete"></i>
                                </button>
                            </form>




                        </div>

                        <form action="{{ url('task') }}" method="POST" class="create-todo-item">
                            {{ csrf_field() }}

                            <i class="fas fa-plus"></i>
                            <input type="text" name="add-todo-item" class="add-todo-item" placeholder="Start typing here to create a task...">
                            <button class="add-todo-item-btn" type="button" onclick="console.log(this)">Add Task</button>
                        </form>

                        <ul class="todo-list">

                            @if (count($project->tasks) > 0)
                            @foreach ($project->tasks as $task)
                            <li class="todo-item" data-id="{{ $task->id }}">
                                <input type="checkbox" name="done" class="done">
                                <label class="title item-title">{{ $task->name }}</label>
                                <input type="text" name="edit-item-title" class="edit edit-item-title hide" value="{{ $task->name }}">
                                <i class="fas fa-pen edit"></i>
                                <i class="far fa-trash-alt delete"></i>
                            </li>
                            @endforeach
                            @endif

                        </ul>

                    </div>
                    @endforeach
                    @endif
                    <!-- <button id="add-todo-list" type="button"><i class="fas fa-plus"></i>Add TODO List</button> -->

                    <div class="panel-body">

                        <!-- Display Validation Errors -->


                        <!-- New Project Form -->
                        <form action="{{ url('project') }}" method="POST" class="form-horizontal">
                            {{ csrf_field() }}

                            <!-- Project Name -->
                            <div class="form-group">
                                <label for="project-name" class="col-sm-3 control-label">Project</label>

                                <div class="col-sm-6">
                                    <input type="text" name="name" id="project-name" class="form-control">
                                </div>
                            </div>

                            <!-- Add Task Button -->
                            <div class="form-group">
                                <div class="col-sm-offset-3 col-sm-6">
                                    <button type="submit" class="btn btn-default">
                                        <i class="fa fa-plus"></i> Add Task
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection