<?php

namespace Controllers;

use Model\Categoria;

class APICategorias {
    public static function listar(){
        $categorias = Categoria::all();
        echo json_encode($categorias);
    }
}

?>