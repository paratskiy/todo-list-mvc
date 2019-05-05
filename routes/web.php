<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group(['middleware' => ['web']], function () {

    Route::get('/', function () {
        return redirect('login');
    });

    Route::get('/home', 'HomeController@index')->name('home');

    Route::get('/home', function () {
        return redirect('projects');
    });

    Route::get('/projects', 'ProjectController@index');
    Route::post('/project', 'ProjectController@store');
    Route::post('/project/edit/{project}', 'ProjectController@edit');
    Route::delete('/project/{project}', 'ProjectController@destroy');

    Route::get('/tasks', 'TaskController@index');
    Route::post('/task/{project_id}', 'TaskController@store');
    Route::post('/task/edit/{task}', 'TaskController@edit');
    Route::post('/task/status/{task}', 'TaskController@changeStatus');
    Route::delete('/task/{task}', 'TaskController@destroy');

    Auth::routes();
});