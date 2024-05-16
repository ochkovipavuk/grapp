import sys
from app import app

if __name__ == '__main__':
    host = sys.argv[1] if len(sys.argv) > 1 else '127.0.0.1'
    port = int(sys.argv[2]) if len(sys.argv) > 2 else 5000
    debug = bool(sys.argv[3]) if len(sys.argv) > 3 else False

    app.run(host=host, port=port, debug=debug)
