<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Week 1</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href='/css/helloyou.css' type='text/css' rel='stylesheet'>

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js"></script>
    <script type="text/javascript" src="/js/p5.dom.min.js"></script>
    <script src="/js/week1.js"></script>
</head>
<body>
<div class="flex-center position-ref full-height">
    <div class="content">
        <div class="title m-b-md">
            Samer Maaliki
        </div>
        <div>
            <h2>Week 1 Informal Exercise</h2>
        </div>
        <div id='circle'>
        </div>
        <div>
            <p>
                This is a circle that starts off from a 0 pixel radius and keeps growing until it touches the edges of the canvas.
                Once, it reaches the edge of the canvas, it starts shrinking back to 0 pixels.  Also, the colors of the canvas and
                the inner circle are complementary.  They reverse colors once the circle touches the outer edge of the canvas.
            </p>
        </div>
    </div>
</div>
</body>
</html>