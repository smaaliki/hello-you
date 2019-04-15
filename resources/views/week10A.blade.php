<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Week 10A: JSON Data</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href='/css/helloyou.css' type='text/css' rel='stylesheet'>
    <style>
        #eastConf {
            /*background-color: blue; */
            width: 50%;
            float: left;
            clear: left;

        }
        #westConf {
            /*background-color: red;*/
            width: 50%;
            float: right;
            clear: right;
        }
    </style>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js"></script>
    <script type="text/javascript" src="/js/p5.dom.min.js"></script>
    <script src="/js/week10A.js"></script>
</head>
<body>
<div class="flex-center position-ref full-height">
    <div id = "eastConf">
    </div>
    <div id = "westConf">
    </div>
</div>
</body>
</html>