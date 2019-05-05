<?php

namespace App\Policies;

use App\User;
use App\Task;
use App\Project;

use Illuminate\Auth\Access\HandlesAuthorization;


class TaskPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the given user can delete the given task.
     *
     * @param  User  $user
     * @param  Task  $task
     * @return bool 
     */
    public function destroy(User $user, Task $task, Project $project)
    {
        return $user->id === $project->user_id && $project->id === $task->project_id;
    }

}
