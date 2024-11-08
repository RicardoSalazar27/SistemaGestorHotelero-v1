<?php

namespace Controllers;

use Model\Nivel;

class APINiveles {
    public static function listar(){
        $niveles = Nivel::all('ASC');
        echo json_encode($niveles);
    }
}

?>