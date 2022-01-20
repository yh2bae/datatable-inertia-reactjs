<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public $loadDefault = 10;
    public function index (Request $request)
    {
        $request->validate([
            'direction' => ['in:asc, desc'],
            'field' => ['in:name, username, email, created_at'],
        ]);

        $query = User::query();

        if($request->q) 
        {
            $query->where('name', 'like', '%' .$request->q. '%')
                  ->orWhere('username', 'like', '%' .$request->q. '%')
                  ->orWhere('email', 'like', '%' .$request->q. '%')
                  ->orWhere('address', 'like', '%' .$request->q. '%')
                  ->orWhere('created_at', 'like', '%' .$request->q. '%');
        }

        if($request->has(['field', 'direction'])) {
            $query->orderBy($request->field, $request->direction);
        }

        $users = new UserCollection($query->paginate($request->load));

        return inertia('Users/Index', ['users' => $users]);
    }
}
