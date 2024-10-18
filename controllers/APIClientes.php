<?php

namespace Controllers;

use Model\Cliente;

class APIClientes {
    public static function listar(){
        $clientes = Cliente::all();
        echo json_encode($clientes);
    }
}

?>