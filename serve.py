from sanic import Sanic

app = Sanic()
app.static('/', 'dist')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
