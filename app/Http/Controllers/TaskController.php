<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ProjectController;

use App\Task;
use App\Project;

class TaskController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');

    }

    /**
     * Display a list of all of the project tasks.
     *
     * @param  Request  $request
     * @return Response
     */
    public function index(Request $request)
    {
        // return view('tasks.index', [
        //     'tasks' => $this->tasks->forProject($request->user())            
        // ]);

        $projects = Project::where('user_id', $request->user()->id)->get();
        
        $project_tasks = array(); 

        for ($i=0; $i < count($projects); $i++) { 
            
            $project = Project::find($projects[$i]->id);

            $tasks = $project->tasks;          
                   
            if (!$tasks) { continue; }
            
            for ($j=0; $j < count($tasks); $j++) { 
        
                $project_tasks += [$j => $tasks[$j]];
                
            }

        }

        $tasks = $project_tasks;

        return view('tasks.index', [
            'tasks' => $tasks,
        ]);

    }

}
