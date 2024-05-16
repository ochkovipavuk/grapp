# grapp
### Grapp - это веб-приложение для визуализации и работы с графами.

Приложение состоит из серверной и клиентской части. Серверная часть написана на python flask, база данных sqlite, клиент состоит из стандартных html, css, js.

Переходим в директорию куда планируется поставить приложение.
```
git clone https://github.com/ochkovipavuk/grapp.git
```
Для работы приложения необходимы установленые python и его библиотеки flask и flask_sqlalchemy. При их отсутствии пишем в консоли следующие команды:
```
pip install flask
pip install flask_sqlalchemy
```

Запуск приложения происходит через файл run.py. Для этого в директории расположения приложения пишем в консоли команду с аргументами host port debug:
```
run.py 127.0.0.1 8080 True
```
Параметр debug - True указывает на необходимость работы flask в режиме debug.

Приложение запущено.

---
# grapp
### Grapp is a web application for visualizing and working with graphs.

The application consists of a server and a client part. The server part is written in python flask, the sqlite database, the client consists of standard html, css, js.

Go to the directory where you plan to install the application.
```
git clone https://github.com/ochkovipavuk/grapp.git
```
For the application to work, python and its flask and flask_sqlalchemy libraries must be installed. In their absence, we write the following commands in the console:
```
pip install flask
pip install flask_sqlalchemy
```

The application is launched via a file run.py . To do this, in the application location directory, write a command in the console with the arguments host port debug:
```
run.py 127.0.0.1 8080 True
```
The debug - True parameter indicates the need for flask to work in debug mode.

The application is running.
