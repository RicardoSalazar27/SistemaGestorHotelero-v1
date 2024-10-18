<?php 

require_once __DIR__ . '/../includes/app.php';

use Controllers\APIUsuarios;
use MVC\Router;
use Controllers\AuthController;
use Controllers\DashboardController;
use Controllers\HabitacionesController;
use Controllers\informacionController;
use Controllers\UsuariosController;

$router = new Router();


// Login
$router->get('/login', [AuthController::class, 'login']);
$router->post('/login', [AuthController::class, 'login']);
$router->post('/logout', [AuthController::class, 'logout']);

// Crear Cuenta
$router->get('/registro', [AuthController::class, 'registro']);
$router->post('/registro', [AuthController::class, 'registro']);

// Formulario de olvide mi password
$router->get('/olvide', [AuthController::class, 'olvide']);
$router->post('/olvide', [AuthController::class, 'olvide']);

// Colocar el nuevo password
$router->get('/reestablecer', [AuthController::class, 'reestablecer']);
$router->post('/reestablecer', [AuthController::class, 'reestablecer']);

// Confirmación de Cuenta
$router->get('/mensaje', [AuthController::class, 'mensaje']);
$router->get('/confirmar-cuenta', [AuthController::class, 'confirmar']);


$router->get('/admin/index', [DashboardController::class, 'index']);
$router->get('/admin/configuracion/informacion', [informacionController::class, 'index']);
$router->get('/admin/usuarios', [UsuariosController::class, 'index']);


// API'S
$router->get('/api/usuarios/listar', [APIUsuarios::class, 'listar']);

$router->comprobarRutas();