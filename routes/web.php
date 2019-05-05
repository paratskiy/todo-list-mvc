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
        return view('welcome');
    });

    Route::get('/home', 'HomeController@index')->name('home');

    Route::get('/home', function () {
        return redirect('projects');
    });

    Route::get('/projects', 'ProjectController@index');
    Route::post('/project', 'ProjectController@store');
    Route::delete('/project/{project}', 'ProjectController@destroy');

    Route::get('/tasks', 'TaskController@index');
    Route::post('/task/{project_id}', 'TaskController@store');
    Route::delete('/task/{task}', 'TaskController@destroy');

    Auth::routes();
});

    
// Route::group(['middleware' => 'auth'], function () {
//     Route::get('/', 'ProjectController@index');
    
//     Route::get('/projects/{id}', 'ProjectController@show');
//     Route::post('/create','ProjectController@store');
//     Route::get('/create', 'ProjectController@create');
//     Route::get('/projects/{id}/delete', 'ProjectController@destroy');
//     Route::put('/edit','ProjectController@update');
//     Route::get('/projects/{id}/edit', 'ProjectController@edit');
    
    