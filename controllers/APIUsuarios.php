<?php

namespace Controllers;

use Model\Usuario;

class APIUsuarios {
    public static function listar(){
        $usuarios = Usuario::all();
        echo json_encode($usuarios);
    }
}

?>