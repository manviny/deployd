deployd
=======
Instalar MongoDB

export NODE_PATH="/usr/lib/node_modules"

 
http://docs.mongodb.org/manual/tutorial/install-mongodb-on-red-hat-centos-or-fedora-linux/
 
 
sudo yum install mysql-server
sudo chkconfig mysqld on
sudo service mysqld start
 
mysqladmin -u root password root
 
mysql -u root -p
create database chat;
grant all on chat.* to chatuser@localhost identified by 'passw';
grant all on chat.* to prueba@localhost identified by 'prueba';
 
 
NAVICAT
GRANT ALL PRIVILEGES ON *.* TO  manol@81.000.000.89  IDENTIFIED  BY  'passw';
Crear nueva app con conexiopn mysql

 
1.- slc lb project chat
2.- cd chat
slc run
 
 
3.- slc lb datasource mysql --connector mysql
 
 
4.- slc lb model book -i --data-source mysql
bookModel = app.models.books; (add to app.js)
 
add to datasources.json
  "mysql": {
    "connector": "mysql",
    "host": "localhost",
    "username": "chatuser",
    "port": 3306,
    "password": "passw",
    "database": "chat"
  }
change to you models.json
    "dataSource": "db", => "dataSource": "mysql",
 
5.- npm install loopback-connector-mysql --save
 
slc run
 
Crear nueva app con conexiopn mongodb

1.- slc lb project chat
2.- cd chat
3.-  slc lb datasource mongodb --connector mongodb
4.- slc lb model book --data-source mongodb
5.- npm install loopback-connector-mongodb --save
 
 
npm install loopback-datasource-juggler
npm install loopback-connector-mongodb
 
# Run the following steps in your terminal...
 
# make sure you have node and mongo installed
npm install strong-cli
 
# create a loopback project
slc lb project mongo-example
cd mongo-example
 
# create a loopback model
slc lb model todo
 
# tell loopback you want to use mongodb
# add the following to datasources.json
...
"mongodb": {
    "connector": "mongodb",
    "host": "localhost",
    "database": "demo",
    "username": "demo",
    "password": "demo",
    "port": 27017
  }
 
 
    "connector": "mongodb",
    "url": "mongodb://localhost:27015"
...
 
# hit mongodb from node
# add this to app.js
var Todo = app.models.todo;
Todo.create({
  title: 'install loopback and connect to mongodb',
  done: true
});
 
# start the app in the background
node app &
 
# hit mongodb over REST
curl localhost:3000/api/todos
[{"id": 1, "title": "install loopback and connect to mongodb", "done": true}]
 
# learn more here
open http://loopback.io
 
LLamada mediante http desde angular a la api de loopback

GET (deployd)
       $http.get( 'http://ec2-54-76-138-4.eu-west-1.compute.amazonaws.com:2403/messages' ) // liria en castellano
      .then(function (datos) { 
                alert(JSON.stringify(datos.data));   
      }); 
                    
 
 
POST (loopback)
     $http({
        url: 'http://ec2-54-76-138-4.eu-west-1.compute.amazonaws.com:3000/api/products',
        method: "POST",
        data: {"sender":"Manol","message":"desde p24"},
    })
    .then(function(response) {
            alert("success");
            alert(JSON.stringify(response));
        }, 
        function(response) { // optional
            alert("fail");
            alert(JSON.stringify(response));
        }
    );
 
FOREVER

 
forever start production.js
forever stop 0
forever list
 
 
