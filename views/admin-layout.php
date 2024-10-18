<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AdminLTE 3 | <?php echo $titulo;?></title>

    <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="/build/resources/plugins/fontawesome-free/css/all.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="/build/resources/dist/css/adminlte.min.css">

</head>

<body class="hold-transition sidebar-mini">
    <div class="wrapper">

        <!-- Header -->
        <?php include_once __DIR__ .'/templates/header.php'; ?>

        <!-- Sidebar -->
        <?php include_once __DIR__ .'/templates/sidebarmenu.php'; ?>

        <!-- Contenido principal -->
        <div class="content-wrapper">
            <?php echo $contenido; ?>
        </div>

        <!-- Sidebar derecho opcional -->
        <aside class="control-sidebar control-sidebar-dark">
            <div class="p-3">
                <h5>Title</h5>
                <p>Sidebar content</p>
            </div>
        </aside>

        <!-- Footer -->
        <?php include_once __DIR__ .'/templates/footer.php'; ?>
    </div>

    <!-- jQuery -->
    <script src="/build/resources/plugins/jquery/jquery.min.js"></script>

    <!-- Bootstrap 4 -->
    <script src="/build/resources/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- AdminLTE App para la versión 3.1.0 -->
    <script src="/build/resources/dist/js/adminlte.min.js"></script>
</body>
</html>
