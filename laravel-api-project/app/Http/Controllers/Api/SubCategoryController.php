<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MainCategory;
use App\Models\SubCategory;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function index()
    {
        $data=SubCategory::with('maincategory')->get();

        return response([
            "data"=>$data,
            "status"=>true,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $isPresent = SubCategory::get()->where('main_category_id','=',$request->main_category_id)->where('name','=',$request->name);
                                            //bu sub kategori zaten var mı ?
        if(count($isPresent)==0){
            $subcategory = SubCategory::create($input);

            return response([
                "data" => $subcategory->with('maincategory')->find($subcategory->id),
                "status" => true
            ],201);
        }else{
            return response([
                "message" => "Category already exist for this main category",
                "status" => false
            ],400);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SubCategory  $subcategory
     * @return \Illuminate\Http\Response
     */
    public function show(SubCategory $subcategory)
    {
        $data=$subcategory::with('basicproducts')->find($subcategory->id);
        return response([
            "data" =>$data,
            "status"=>true
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SubCategory  $subcategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SubCategory $subcategory)
    {
        $input = $request->all();

        $isPresent = SubCategory::query()
            ->where('main_category_id','=',$request->main_category_id)
            ->where('name','=',$request->name)
            ->where('id','!=',$subcategory->id)
            ->get();

        if(count($isPresent)==0){
            $subcategory->update($input);
            return response([
                "data" => $subcategory->with('maincategory')->find($subcategory->id),
                "status" => true
            ],200);
        }else{
            return response([
                "message" => "Category already exist for this main category",
                "status" => false
            ],400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SubCategory  $subcategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(SubCategory $subcategory)
    {
        $subcategory->delete();

        return response([
            "data"=>$subcategory
        ],200);
    }
}
