<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AdminLTE 3 | <?php echo $titulo;?></title>

    <!-- Fuente de Google Fonts (Source Sans Pro) -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">

    <!-- Importación de FontAwesome para los íconos -->
    <link rel="stylesheet" href="/build/resources/plugins/fontawesome-free/css/all.min.css">

    <!-- Hoja de estilo principal de AdminLTE -->
    <link rel="stylesheet" href="/build/resources/dist/css/adminlte.min.css?v=3.2.0">
</head>

<body class="hold-transition sidebar-mini">
    <div class="wrapper">

        <!-- Header -->
        <?php include_once __DIR__ .'/templates/header.php'; ?>

        <!-- SIdebar -->
        <?php include_once __DIR__ .'/templates/sidebarmenu.php'; ?>

        <!-- Contenido principal del sitio -->
        <div class="content-wrapper">
            <!-- Imprime el contenido dinámico de la página actual -->
            <?php echo $contenido; ?>
        </div>

        <!-- Sidebar derecho opcional (Control Sidebar) -->
        <aside class="control-sidebar control-sidebar-dark">
            <div class="p-3">
                <h5>Title</h5>
                <p>Sidebar content</p>
            </div>
        </aside>

        <!-- Footer -->
        <?php include_once __DIR__ .'/templates/footer.php'; ?>
    </div>

    <!-- Script para jQuery, necesaria para ciertas funcionalidades de AdminLTE -->
    <script src="/build/resources/plugins/jquery/jquery.min.js"></script>

    <!-- Script para Bootstrap, necesario para los componentes interactivos como modales, alertas, etc. -->
    <script src="/build/resources/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Script principal de AdminLTE, incluye las funcionalidades de la plantilla -->
    <script src="/build/resources/dist/js/adminlte.min.js?v=3.2.0"></script>
</body>

</html>
