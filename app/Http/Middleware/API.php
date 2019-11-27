<?php
namespace App\Http\Middleware;
use Closure;
class API
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $response->header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Content-Range, Content-Disposition, Content-Description, X-Auth-Token, X-Requested-With');
        $response->header('Access-Control-Allow-Origin', 'http://localhost:3000');
        $response->header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        $response->header('Access-Control-Allow-Credentials', 'true');
        //add more headers here
        return $response;
    }
}
