<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Week 2: Clock</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href='/css/helloyou.css' type='text/css' rel='stylesheet'>

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js"></script>
    <script type="text/javascript" src="/js/p5.dom.min.js"></script>
    <script src="/js/week2.js"></script>
</head>
<body>
<div class="flex-center position-ref full-height">
    <div class="content">
        <div class="title m-b-md">
            Samer Maaliki
        </div>
        <div>
            <h2>Week 2 Informal Exercise</h2>
        </div>
        <div id='clock'>
        </div>
        <div>
            <p>
                This is work-in-progress of a clock that goes faster if you move the mouse to the right.
                You can actually make time stop by putting the mouse in the middle and if you would like
                to go back in time to save the world (or come up with google), going all the way to the left
                will reverse time.
            </p>
        </div>
    </div>
</div>
</body>
</html>