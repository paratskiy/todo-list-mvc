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

                    @foreach ($projects as $project)
                        <div class="todo-list-wrap">

                            <form class="todo-list-header">
                                <i class="far fa-calendar-alt calendar"></i>
                                <label class="title todo-title">{{ $project->name }} </label>
                                <input type="text" name="edit-todo-title" class="edit edit-todo-title hide" value="{{ $project->name }}">
                                <i class="fas fa-pen edit"></i><i class="far fa-trash-alt delete"></i>
                            </form>

                            <form class="create-todo-item">
                                <i class="fas fa-plus"></i>
                                <input type="text" name="add-todo-item" class="add-todo-item" placeholder="Start typing here to create a task...">
                                <button class="add-todo-item-btn" type="button">Add Task</button>
                            </form>

                            <ul class="todo-list">
                            @if (count($project->tasks) > 0)
                                @foreach ($project->tasks as $task)
                                    <li>{{ $task->name }}</li>
                                @endforeach
                            @endif 
                            </ul>
                            
                        </div>
                    @endforeach

                </div>
            </div>
        </div>
    </div>
</div>
@endsection