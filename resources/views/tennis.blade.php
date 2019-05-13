<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Final Project: Tennis</title>

    <style>
        body {
            padding: 0;
            margin: 0;
            width: 100%;
            float: left;
            clear: left;
        }

        #headerArea {
            width: 100%;
            height: 75px;
            float: left;
            clear: left;
        }

        #courtArea {
            width: 98%;
            float: left;
            clear: left;
            padding: 1%;
        }

        #settingsArea {
            background-color: rgb(245, 245, 245);
            border-style: solid;
            border-color: rgb(0, 0, 0);
            float: right;
            clear: right;
            width: 0;
            padding: 1%;
            font-family: sans-serif;
        }

        .logo {
            width: 225px;
            height: 50px;
            padding: 10px 0 0 10px;
        }

        button {
            border: none;
            padding: 0.5rem 0.5rem;
            background: #ffffff;
            font-family: sans-serif;
            font-size: 1rem;
            cursor: pointer;
            text-align: center;
        }
    </style>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js"></script>
    <script type="text/javascript" src="/js/p5.dom.min.js"></script>
    <!--<script src="libraries/p5.sound.min.js"></script>-->
    <script src="/js/tennis.js"></script>
</head>
<body>
<div id="headerArea">
    <img class="logo" src="images/logo.png">
</div>
<div id="courtArea">
</div>
<div id="settingsArea">
</div>
</body>
</html>