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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/week1', function () {
    return view('week1');
});

Route::get('/week2', function () {
    return view('week2');
});

Route::get('/assignment1', function () {
    return view('assignment1');
});

Route::get('/assignment2', function () {
    return view('assignment2');
});

Route::get('/assignment2a', function () {
    return view('assignment2a');
});

Route::get('/assignment2b', function () {
    return view('assignment2b');
});

Route::get('/assignment2c', function () {
    return view('assignment2c');
});

Route::get('/assignment3', function () {
    return view('assignment3');
});
