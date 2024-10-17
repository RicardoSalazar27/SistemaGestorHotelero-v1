<?php

function debuguear($variable) : string {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}
function s($html) : string {
    $s = htmlspecialchars($html);
    return $s;
}

function pagina_actual($path) : bool{
    return str_contains($_SERVER['PATH_INFO'] ?? '/', $path) ? true : false;
}

function is_auth() : bool{
    if(!isset($_SESSION)){
        session_start();
    }
    return isset($_SESSION['nombre']) && !empty($_SESSION);
}

function tiene_rol(String $rol_id): bool {
    if(!$_SESSION['rol_id'] || $_SESSION['rol_id'] !== $rol_id){
        header('Location: /');
    }
    return true;
}


function aos_animacion(){
    $efectos = ['fade_up', 'fade_down', 'fade_left', 'fade_right', 'flip_left', 'flip_right', 'zoom-in', 'zoom-in-up', 'zoom-in-down', 'zoom-out'];
    $efecto = array_rand($efectos, 1); //retorna indice del arregflo
    echo ' data-aos="' . $efectos[$efecto] . '" ';//busca con el indice y ya encuentra/ imprime el nombre
}
