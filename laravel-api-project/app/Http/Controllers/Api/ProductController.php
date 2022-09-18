<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $offset = $request->has('offset') ? $request->query('offset') : 0;
        $limit = $request->has('limit') ? $request->query('limit') : 20;



        $stores = $request->query('store') != "" ? Str::of($request->query('store'))->explode(',') : [];
        $subcategories = $request->query('cat') != "" ? Str::of($request->query('cat'))->explode(',') : [];

        $qb = Product::query()->with('basicproduct');;

        count($stores) > 0 && $qb->whereIn('store_id',$stores);

        if(count($subcategories) > 0){
            $qb->whereHas('basicproduct', function ($query) use ($subcategories){
                $query->whereIn('sub_category_id', $subcategories);
            });
        }
        $qb->orderBy('price','asc');

        return $qb->get();





//        if($request->has('all')=="" || $request->query('store')!=""){   //all yazılmazsa tüm basic productlar istenmiyor demektir. query builder'a  herhangi bir üründe temel alınarak kullanılmış olan basic productların döndürülmesini sağlayacak koşul eklenir
//
//            $qb->whereHas('products', function($query) use($stores){
//                if(count($stores)!=0){  //aynı zamanda stores dizisinde store idleri var ise sadece o storeların ürünlerinin gözükmesi için sorgu ayarı yapılır.
//                    $query->whereIn('store_id',$stores);
//                }
//            });
//        }
//
//
//        if($request->query('cat')!="") {
//            $subcategories = Str::of($request->query('cat'))->explode(',');  // cat=1,2,3... şeklinde gelen kategori id'leri stringden diziye çevrilir
//            $qb->whereIn('sub_category_id',$subcategories);// bu kategorilerdeki basic ürünlerin getirilmesi için gerekli query builder hazırlanır
//        }
//
//
//        $data = $qb->offset($offset)->limit($limit)->get()->each(function ($baseproduct) use($stores){ //basic üründen türetilen en ucuz ürünün de beraberinde gelmesi için query builder ayarlaması yapılır
//            $productquery = Product::query()->where('basic_product_id','=',$baseproduct->id)->orderBy('price','ASC');
//            if(count($stores)!=0){
//                $productquery->whereIn('store_id',$stores);
//            }
//            $baseproduct->cheapest=$productquery->first();
//        });
//
//
//        $data->each(function ($basicproduct){
//            $basicproduct->setAppends(['product_photos'])->makehidden(['photos']);
//        });
//
//


        return response([
           "data"=> $data,
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
        $isPresent = Product::get()->where('basic_product_id','=',$request->basic_product_id)->where('store_id','=',$request->store_id);
        if(count($isPresent)==0){
            $input = $request->all();
            $product = Product::create($input);

            return response([
                "data" => $product,
                "status" => true
            ],201);
        }else{
            return response([
                "data" => "Product already exist for this basic product",
                "status" => false
            ],201);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response([
            "data"=>$product,
            "status"=>true
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $input = $request->all();
        $product->update($input);

        return response([
            "data" => $product,
            "status" => true
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response([
            "status"=>true
        ],200);
    }
}
