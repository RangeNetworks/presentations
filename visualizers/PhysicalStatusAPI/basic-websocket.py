#WS <-> ZMQ Code originally from: https://github.com/deckarep/TornadoZeroMQ-WS-Demo, modified to update WS standard

import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web

#import zmq and install zmq's event loop as part of tornado
import zmq
from zmq.eventloop import ioloop
from zmq.eventloop.zmqstream import ZMQStream
ioloop.install()


socket_connections = []

#todo - refactor such that this belongs to part of the websocket handler class (more object oriented)
def setupZmqSubscriber(address):
    ctx = zmq.Context()
    s = ctx.socket(zmq.SUB)
    s.connect(address)
    s.setsockopt(zmq.SUBSCRIBE, "")

    stream = ZMQStream(s)
    def echo(msg):
    	print "receiving message: %s" % msg
        #stream.send_multipart(msg)
        for socket in socket_connections:
            socket.write_message(msg[0] + '\r\n\r\n')
    stream.on_recv(echo)
#ioloop.IOLoop.instance().start()

class WSHandler(tornado.websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True
    def open(self):
        print 'new connection'
        #self.write_message("Hello World")
        socket_connections.append(self)
    def on_message(self, message):
        print 'message received %s' % message

    def on_close(self):
        socket_connections.remove(self)
        print 'connection closed'


application = tornado.web.Application([
    (r'/ws', WSHandler),
])


if __name__ == "__main__":
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8888)
    setupZmqSubscriber("tcp://127.0.0.1:45160")
    tornado.ioloop.IOLoop.instance().start()