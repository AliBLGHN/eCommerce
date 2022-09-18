<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
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
   // return view('welcome');
    return redirect()->route('category.show',['ad' =>"Teknoloji"]);
});

Route::prefix('basics')->group(function(){

    Route::get('/merhaba', function () {
        return "merhaba api";
    });

    Route::get('/json', function () {
        return ['message'=>"merhaba", "name" =>"Ali Bilgihan"];
    });

    Route::get('/response', function () {
        return response(["name" =>"Ali ", 'surname'=>"Bilgihan" ],200)->header('Content-type', 'application/json');
    });

    Route::get('/kategori/{ad}', function ($k_ad) {
        return "Kategori Ad : $k_ad";
    })->name('category.show');      // '/' routeunda çağırıldı

});

//Route::get('/product/{id}/{type?}', [TestController::class, 'show']);   // App\Http\Controllers\TestController@show
