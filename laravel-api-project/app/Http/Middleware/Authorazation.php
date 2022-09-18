<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Authorazation
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$userlevels)
    {
        $user = Auth::user();
        if($user !=""){
            if(in_array($user->user_level,$userlevels)){
                return $next($request);
            }else{
                return response([
                    'error'=>"You are not authorized for this request",
                    "data"=>$user
                ],401);
            }
        }else{
            return response(['error'=>"You are not authorized for this request"],401);
        }
    }
}
