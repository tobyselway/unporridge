<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileController extends Controller
{
    
    public function index() {
        return collect(Storage::disk('files')->files())
            ->map(fn($filename) => [
                'filename' => $filename,
                'size' => Storage::disk('files')->size($filename),
                'ext' => Str::of($filename)->explode('.')->last(),
                'mimetype' => Storage::disk('files')->getMimeType($filename),
            ]);
    }

    public function show($file) {
        return Storage::disk('files')->download($file);
    }

    public function store(Request $request) {
        $request->file('file')
            ->storeAs(
                'files',
                $request->file('file')->getClientOriginalName()
            );
    }

}
