deployd
=======
Instalar MongoDB

export NODE_PATH="/usr/lib/node_modules"

 
http://docs.mongodb.org/manual/tutorial/install-mongodb-on-red-hat-centos-or-fedora-linux/
 
loopback queries
================

http://chocomputer.com:3000/api/reservas?filter[where][fecha]=2014-06-30

more examples

http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Findmatchinginstances


 
loopback with mongodb
=====================

 1.- slc lb project aytob

 2.- cd aytob

 3.- npm install loopback-datasource-juggler --save

4.- npm install loopback-connector-mongodb --save

5.- slc lb datasource mongodb --connector mongodb

6.- slc lb model reservas --data-source mongodb

7.- edit datasources.json and:

"mongodb": {
    "connector": "mongodb",
    "host": "localhost",
    "database": "demo"
  }
 
 
 
Install mysql server
====================
 
sudo yum install mysql-server
sudo chkconfig mysqld on
sudo service mysqld start
 
mysqladmin -u root password root
 
mysql -u root -p
create database chat;
grant all on chat.* to chatuser@localhost identified by 'passw';
grant all on chat.* to prueba@localhost identified by 'prueba';
 
 
NAVICAT (grant privileges)
=======
GRANT ALL PRIVILEGES ON *.* TO  manol@81.000.000.89  IDENTIFIED  BY  'passw';



Loopback with mysql connection
==============================
 
1.- slc lb project chat
2.- cd chat
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
 
6.- slc run
 

LLamada mediante http desde angular a la api de loopback
========================================================
GET (deployd)
       
       $http.get( 'myweb.com:2403/messages' ) // liria en castellano
      .then(function (datos) { 
                alert(JSON.stringify(datos.data));   
      }); 
                    
 
 
POST (loopback)
     
     $http({
        url: 'http://myweb.com:3000/api/products',
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
=======
 
forever start production.js
forever stop 0
forever list
 
 
MONGO
=====

mongo
show dbs
use mydb
show collections


