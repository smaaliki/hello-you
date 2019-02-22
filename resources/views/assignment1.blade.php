<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Assignment 1: Bauhaus</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href='/css/helloyou.css' type='text/css' rel='stylesheet'>

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js"></script>
    <script type="text/javascript" src="/js/p5.dom.min.js"></script>
    <script src="/js/sketch.js"></script>
</head>
<body>
<div class="flex-center position-ref full-height">
    <div class="content">
        <div class="title m-b-md">
            Samer Maaliki
        </div>
        <h2>Assignment 1: Bauhaus</h2>
        <div style='text-align:left;'>
            <p>
                Below are recreations of a couple of Bauhaus inspired works of art.  The first, in the upper right quadrant,
                is the <a href="https://www.harvardartmuseums.org/collections/object/221724?position=7">"Black and Red Color Exercise"</a> by Hansgeorg Knoblauch (c. 1932).  It is recreated in the upper left quadrant
                of the canvas.
            </p>
            <p>
            In the bottom left quadrant, is the <a href="https://www.harvardartmuseums.org/tour/the-bauhaus/slide/6353">"Jocular Sounds"</a> by Wassily Knadinsky (c. 1929).  In the bottom right
                of that painting is what I first perceived to be a bull.  It inspired my work in the bottom right quadrant,
                in which I drew a reindeer utilizing the same colors from that painting.
            </p>
            To interact with these recreations:
            <ul>
                <li>If you hover the mouse over the upper left quadrant, the number of "pizza slices" will vary.</li>
                <li>You can drag the reindeer's antlers down or up and its head will always go back to the original position once you let go, or once the mouse goes outside of the bottom right quadrant.</li>
            </ul>
        </div>
        <div id='assignment1'>
        </div>
        <div style='text-align:left;'>
            <p>The images of the paintings that were used in this exercise, were obtained from the Bauhaus collection at the <a href='https://www.harvardartmuseums.org/'>Harvard Art Museums</a> website.
            Below are links to the original images that were used in this exercise:</p>
            <a href='https://www.harvardartmuseums.org/collections/object/221724?position=7'><img src='/images/Knoblauch.jpg' alt='Black and Red Color Exercise by Hansgeorg Knoblauch' style="width:100px;"></a>
            <a href='https://www.harvardartmuseums.org/tour/the-bauhaus/slide/6353'><img src='/images/Knadinsky.jpg' alt='Jocular Sounds by Wassily Knadinsky' style="width:100px;"></a>
        </div>
    </div>
</div>
</body>
</html>