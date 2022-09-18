<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use App\Models\Store;
use App\Models\TmpStore;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Store::query()
            ->with('owner:id,name,store_id')
            ->whereHas('owner')
            ->get();

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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Http\Response
     */
    public function show(Store $store)
    {
        $data = $store->with('owner:name,store_id')->with('workers')->with('photos')->get()->find($store->id);


        return response([
            "data"=>$data,
            "status"=>true
        ],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Store $store)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Http\Response
     */
    public function destroy(Store $store, $id)
    {
        $store =  Store::find($id);

        $tmp = TmpStore::create([
            "user_id"=>$store->owner->id,
            'store_id'=>$store->id,
        ]);

        if($tmp){
            $store->photos()->delete();
            $store->workers()->update(['store_id'=>null]);
            $store->owner()->update(['user_level'=>2,'store_id'=>null]);
        }
        else{
            $tmp->delete();
        }

        return response([
            "data"=>$store->id,
            "status"=>true
        ]);
    }
}
