<?php


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MainCategoryController;
use App\Http\Controllers\Api\BasicProductController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\StoreController;
use App\Http\Controllers\Api\SubCategoryController;
use App\Http\Controllers\Api\TmpStoreController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Route::get('/basicproducts', [MainCategoryController::class, 'show']);


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {

    Route::post('login', [AuthController::class,'login']);
    Route::post('register', [AuthController::class,'register']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me']);

});


//Route::get('maincategories', [MainCategoryController::class,'index'])->middleware('api');

Route::get('maincategories/all', [MainCategoryController::class,'getall']);
Route::get('basicproducts/all', [BasicProductController::class,'getall']);

Route::delete('stores/{id}', [StoreController::class,'destroy']);

Route::apiResources([
    '/tmpstores'=> TmpStoreController::class,
    '/users'=> UserController::class,
    '/maincategories' => MainCategoryController::class,
    '/subcategories' => SubCategoryController::class,
    '/basicproducts' => BasicProductController::class,
    '/products' => ProductController::class,
    '/stores' => StoreController::class,
]);
//Route::middleware('Authorazation:0')->group(function (){
//    Route::get('maincategories',[MainCategoryController::class,'index']);
//    Route::get('maincategories/{maincategory}',[MainCategoryController::class,'show']);
//    Route::post('maincategories',[MainCategoryController::class,'store']);
//    Route::put('maincategories/{maincategory}',[MainCategoryController::class,'update']);
//    Route::delete('maincategories/{maincategory}',[MainCategoryController::class,'destroy']);
//
//});

