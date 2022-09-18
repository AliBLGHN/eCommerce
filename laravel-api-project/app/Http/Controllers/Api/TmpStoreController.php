<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Models\TmpStore;
use App\Models\User;
use Illuminate\Http\Request;

class TmpStoreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $data=TmpStore::query()->with('owner:id,name')->with('store')->get();

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
            'user_id'=>'required|unique:tmp_stores',
            'name' => 'required|string',
            'email' => 'required|string|email|unique:stores|unique:users',
            'address' => 'required|string',
            'phone'=>'required|string'
        ]);
        $user = User::find($request->user_id);

        if(!$user->store_id){

            $store = Store::create([
                'name'=> $request->name,
                'email'=> $request->email,
                'address'=>$request->address,
                'phone'=>$request->phone
            ]);
            if($store){
                $data = TmpStore::create([
                    "user_id"=>$request->user_id,
                    'store_id'=>$store->id,
                ]);
                if($data){
                    return response([
                        "status"=>true,
                    ],201);
                }else{
                    $store->delete();
                    return response([
                        "message"=>"Something went wrong."
                    ],400);
                }
            }
        }else{
            return response([
                "message"=>"This user already has a store"
            ],400);
        }



    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TmpStore $tmpstore)
    {
        $user =  User::find($tmpstore->user_id);
        $store = Store::find($tmpstore->store_id);
        $newUser = $user->update(['store_id'=>$tmpstore->store_id,'user_level'=>1]);
        if($newUser){
            $tmpstore->delete();

            $store->photos()->create([
                "path" => "public/default/storeLogo.jpg",
                "type" => 1
            ]);
            $store->photos()->create([
                "path" => "public/default/storeCover.jpg",
                "type" => 2
            ]);

            return response([
                "data"=>$tmpstore->id,
                "status"=>true,
            ],200);
        }
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(TmpStore $tmpstore)
    {
        $store = Store::find($tmpstore->store_id);
        $store->delete();
        $tmpstore->delete();
        return response([
            "data"=>$tmpstore->id,
            "status"=>true,
        ],200);
    }
}
