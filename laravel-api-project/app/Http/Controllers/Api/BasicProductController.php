<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BasicProduct;
use App\Models\Photo;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class BasicProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getall(Request $request)
    {

        $data = BasicProduct::with('subcategory')
            ->with('photos')->get()
            ->each(function ($product){
                $product->photos->each(function ($photo){
                     $photo->id=$photo->id;
                     $photo->path=asset(Storage::url($photo->path));
                     $photo->type=$photo->type;
                    return $photo;
                });
            });



        return response([
            "data"=>$data,
            "status"=>true
        ],200);
    }

    public function index(Request $request)
    {
            $allowedbasics = BasicProduct::whereIn('sub_category_id',[1,2,3,4])->groupBy('id')->pluck('id');
         //   return  Product::query()->whereIn('store_id',[1,2,3,4,5])->whereIn('basic_product_id',$allowedbasics)->orderBy('price','asc')->pluck('basic_product_id');


            $offset = $request->query('offset') != "" ? $request->query('offset') : 0;
            $limit = $request->query('limit') != "" ? $request->query('limit') : 20;



            $qb = BasicProduct::query();

            $stores = $request->query('store') != "" ? Str::of($request->query('store'))->explode(',') : [];
            //store filtrelenmek istenmişse girilen store idleri stores değişkenine atanır.

            if($request->has('all')=="" || $request->query('store')!=""){   //all yazılmazsa tüm basic productlar istenmiyor demektir. query builder'a  herhangi bir üründe temel alınarak kullanılmış olan basic productların döndürülmesini sağlayacak koşul eklenir

                $qb->whereHas('products', function($query) use($stores){
                    if(count($stores)!=0){  //aynı zamanda stores dizisinde store idleri var ise sadece o storeların ürünlerinin gözükmesi için sorgu ayarı yapılır.
                        $query->whereIn('store_id',$stores);
                    }
                });
            }


            if($request->query('cat')!="") {
                $subcategories = Str::of($request->query('cat'))->explode(',');  // cat=1,2,3... şeklinde gelen kategori id'leri stringden diziye çevrilir
                $qb->whereIn('sub_category_id',$subcategories);// bu kategorilerdeki basic ürünlerin getirilmesi için gerekli query builder hazırlanır
            }


            $data = $qb->offset($offset)->limit($limit)->get()->each(function ($baseproduct) use($stores){ //basic üründen türetilen en ucuz ürünün de beraberinde gelmesi için query builder ayarlaması yapılır
                $productquery = Product::query()->where('basic_product_id','=',$baseproduct->id)->orderBy('price','ASC');
                if(count($stores)!=0){
                    $productquery->whereIn('store_id',$stores);
                }
                $baseproduct->cheapest=$productquery->first();
            });


            $data->each(function ($basicproduct){
                $basicproduct->setAppends(['product_photos'])->makehidden(['photos']);
            });



            return response([
                "data"=>$data,
                "status"=>true,
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
       //  asset(Storage::URL($request->file('p1')->store('public/images/dnm')));
        $request->validate([
            'name' => 'required|string|unique:basic_products',
            'description' => 'required',
            'sub_category_id' => 'required',
            'photos' => 'required'
        ]);

        $photos =  $request->file('photos');

        if(count($photos)==3) {
            $input = $request->all();
            $product = BasicProduct::create($input);

            if ($product!="") {
                $i=0;
                foreach ($photos as $photo){
                    $product->photos()->create([
                        "path" => $photo->store('public/images'),
                        "type" => $i
                    ]);
                    $i++;
                }
            }

            $product = BasicProduct::with('subcategory')->with('photos')->find($product->id);

            $product->photos->each(function ($photo){
                $photo->id=$photo->id;
                $photo->path=asset(Storage::url($photo->path));
                $photo->type=$photo->type;
            });
            //                ->each(function ($product){
//                    $product->photos->each(function ($photo){
//                        $photo->id=$photo->id;
//                        $photo->path=asset(Storage::url($photo->path));
//                        $photo->type=$photo->type;
//                        return $photo;
//                    });
//                });

            return response([
                "data" => $product,
                "status" => true,
            ], 201);
        }else{
            return response([
                "message" => "missing product photos",
                "status" => false,
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BasicProduct  $basicproduct
     * @return \Illuminate\Http\Response
     */
    public function show(BasicProduct $basicproduct)  // girilen idyi bulup gösterme
    {
        $data= $basicproduct->with('products')->find($basicproduct->id);
        $data->setAppends(['product_photos'])->makehidden(['photos']);
        return response([
            "data"=>$data,
            "status"=>true
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BasicProduct  $basicproduct
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)  //girilen idyi güncelleme
    {
        $input = $request->all();
        return $input;


//        $input = $request->all();
//        $basicproduct->update($input);
//
//        return response([
//            "data" => $basicproduct,
//            "status" => true
//        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BasicProduct  $basicproduct
     * @return \Illuminate\Http\Response
     */
    public function destroy(BasicProduct $basicproduct)   //girilen idyi silme
    {
        $basicproduct->delete();
        Photo::destroy($basicproduct->photos);

        $basicproduct->photos->each(function ($photo){
            Storage::delete($photo->path);
        });

        return response([
            "data"=>$basicproduct
        ],200);
    }
}
