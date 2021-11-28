<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/files', fn() => collect(Storage::disk('files')->files())->map(fn($filename) => [
    'filename' => $filename,
    'size' => Storage::disk('files')->size($filename),
    'ext' => Str::of($filename)->explode('.')->last(),
    'mimetype' => Storage::disk('files')->getMimeType($filename),
]));

Route::get('/files/{file}', fn($file) => Storage::disk('files')->download($file));

Route::post('/files', fn(Request $request) => $request->file('file')->storeAs('files', $request->file('file')->getClientOriginalName()));
