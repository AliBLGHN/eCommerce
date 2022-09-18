<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MainCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MainCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function getall(Request $request)
    {
      $data= MainCategory::all();
        return response([
            "data"=>$data,
            "status"=>true
        ],200);
    }

    public function index(Request $request)
    {

        $data = MainCategory::query()->whereHas('subcategories')->with('subcategories')->get();

        return response([
            "data"=>$data,
            "status"=>true
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:main_categories',
        ]);

        $input = $request->all();
        $maincategory = MainCategory::create($input);

        return response([
            "data" => $maincategory,
            "status" => true
        ],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MainCategory  $mainCategory
     * @return \Illuminate\Http\Response
     */
    public function show(MainCategory $maincategory)
    {
        $data = $maincategory->with('subcategories')->find($maincategory->id);
        return response([
            "data"=>$data,
            "status"=>true
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MainCategory  $mainCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MainCategory $maincategory)
    {
        $input = $request->all();
        $isPresent = MainCategory::query()->where('name','=',$request->name)->where('id','!=',$maincategory->id)->get();

        if(count($isPresent)==0){
            $maincategory->update($input);
            return response([
                "data" => $maincategory,
                "status" => true,
            ],200);
        }else{
            return response([
                "message" => "Category already exist",
                "status" => false
            ],400);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MainCategory  $mainCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(MainCategory $maincategory)
    {
        $maincategory->delete();

        return response([
            "data"=>$maincategory,
            "status"=>true
        ],200);
    }
}
