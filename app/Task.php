<?php

namespace App;

use App\Project;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];
    
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'project_id' => 'int',
    ];

    /**
     * Get the project that owns the tasks.
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

}
