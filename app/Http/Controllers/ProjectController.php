<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Project;
use App\Task;


class ProjectController extends Controller
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
     * Display a list of all of the user's projects.
     *
     * @param  Request  $request
     * @return Response
     */
    public function index(Request $request)
    {
        $projects = Project::where('user_id', $request->user()->id)->get();



        for ($i = 0; $i < count($projects); $i++) {

            $project = Project::find($projects[$i]->id);

            $tasks = $project->tasks;

            // $tasks = Task::where('project_id', $projects[$i]->id);



            if (!$tasks) {
                continue;
            }
            $project_tasks = array();
            for ($j = 0; $j < count($tasks); $j++) {
                // $projects[$i] += ['task' => $tasks[$j]];
                // $arr += array($tasks[$j]);
                $project_tasks += [$j => $tasks[$j]];
                // $arr += ['key1'=>5];
                // $projects[$i]->tasks[] += $tasks[$j];
                // $projects[$i]->tasks += ['key1'=>5];
            }

            $projects[$i]['tasks'] = $project_tasks;
        }

        return view('projects.index', [
            'projects' => $projects,
        ]);
    }


    /**
     * Create a new project.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
        ]);

        $request->user()->projects()->create([
            'name' => $request->name,
        ]);

        return redirect('/projects');
    }

    
    /**
     * Edit project.
     *
     * @param  Request  $request
     * @return Response
     */
    public function edit(Request $request, Project $project)
    {
        $this->authorize('destroy', $project);

        $this->validate($request, [
            'name' => 'required|max:255',
        ]);

        $project->update([
            'name' => $request->name,
        ]);

        return redirect('/projects');
    }


    /**
     * Destroy the given project.
     *
     * @param  Request  $request
     * @param  Project  $project
     * @return Response
     */
    public function destroy(Request $request, Project $project)
    {
        $this->authorize('destroy', $project);

        $project->delete();

        $tasks = $project->tasks;

        for ($i=0; $i < count($tasks); $i++) { 
            $task = $tasks[$i];
            $task->delete();
        }

        return redirect('/projects');
    }

}
