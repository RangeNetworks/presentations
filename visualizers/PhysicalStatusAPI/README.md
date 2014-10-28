Notes
=====

These visualizers were originally written as internal demos for other developers at Range Networks. They are cobbled together as proof-of-concepts and use snippets of code from many different libraries. Hopefully others can learn from how they were implemented and also get a better understanding of what can be done with the PhysicalStatus API data.

Demo videos here:

 1. ARFCN grid (visualizer1.html): https://www.dropbox.com/s/z4453j5qtqex2yx/PhysicalStatusAPIWebSocket.mov?dl=0
 1. streaming toggleable charts (visualizer2.html): https://www.dropbox.com/s/286wfljjsxfkhkr/PhysicalStatusAPIWebSocket2.m4v?dl=0
 1. RAN graph (visualizer3.html): https://www.dropbox.com/s/6dugq3wn72kvfsu/PhysicalStatusAPIWebSocket3.m4v?dl=0

Code and libraries used:

 * http://arborjs.org
 * http://smoothiecharts.org
 * http://omnipotent.net/jquery.sparkline/#s-about
 * https://github.com/deckarep/TornadoZeroMQ-WS-Demo
 * http://jquery.com
 * http://jqueryui.com

Enjoy!

Setup
=====

Enable publishing of API data:

    OpenBTS> devconfig NodeManager.API.PhysicalStatus 0.1

Install Python Tornado:

    $ sudo apt-get install python-pip
    $ sudo pip install tornado

Start a quick webserver:

    $ cd PhysicalStatusAPI

    # Python 2.x:
    $ python -m SimpleHTTPServer 8080

    # Python 3.x:
    $ python -m http.server 8080

Start the ZMQ <-> Websocket bridge:

    $ python ./basic-websocket.py

Open the directory in a browser and choose a visualizer:

    http://your-ip:8080
