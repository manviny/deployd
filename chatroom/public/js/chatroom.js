var todoApp = angular.module('chatroom',  ['onsen.directives']);

todoApp.controller('ChatController', function($scope, $http, $location, $anchorScroll) {
  
  $scope.mensajes = [];
 // $scope.goDown();

   $scope.goDown = function () {
                $location.hash('down');
                $anchorScroll();
            }
            $scope.goUp = function () {
                $location.hash('up');
                $anchorScroll();
            }
  /**
   * Lee mensajes al cargar la app
   * @param  {[type]} messages [description]
   * @return {[type]}          [description]
   */
  dpd.messages.get(function(messages) { 
    if (messages) { 
      messages.forEach(function(m) {
      var today = new Date(m.date);
      var hora = ((today.getHours()<10) ? ("0"+today.getHours()) : today.getHours() )+ ":"+ ((today.getMinutes()<10) ? ("0"+today.getMinutes()) : today.getMinutes()) ;
        $scope.mensajes.push({'nombre':m.sender, 'mensaje': m.message, 'time':hora});
        // renderMessage(m);
      });
      $scope.$apply(function () {
        $scope.mensajes;
      });
    }
  });


  /**
   * [Se crea un nuevo mensaje
   * @param  {[type]} m [description]
   * @return {[type]}   [description]
   */
  dpd.messages.on('create', function(m) {
    // renderMessage(message);
    // alert("create");
    $scope.goDown();
      var today = new Date(m.date);
      var hora = ((today.getHours()<10) ? ("0"+today.getHours()) : today.getHours() )+ ":"+ ((today.getMinutes()<10) ? ("0"+today.getMinutes()) : today.getMinutes()) ;
      $scope.$apply(function () {
            $scope.mensajes.push({'nombre':m.sender, 'mensaje': m.message, 'time':hora});
        });
    
  });




  // $scope.$watch("chatText", function(newValue, oldValue){
  //     console.log(newValue + " " + oldValue)
  // });
$scope.detecta = function(evento){
  console.debug("evento",evento);
  if(evento.charCode == 13) $scope.addTodo();
}


  function renderMessage(message) {
    var $el = $('<li>');
    $el.append('<strong>' + message.sender + ': </strong>');
    $el.append(message.message);
    $el.appendTo('#chatbox');
  }


  


  $scope.addTodo = function(title) {
    var sender = $('#screen-name').val();
    var message = $('#message').val();
  
      //$scope.mensajes.push({'nombre':sender, 'mensaje':message, 'time':'ee'});


    dpd.messages.post({
      sender: sender,
      message: message
    }, function(message, err) {
      if (err) {
        if (err.message) {
          alert(err.message);
        } else if (err.errors) {
          var errors = "";
          if (err.errors.sender) {
            errors += err.errors.sender + "\n";
          } 
          if (err.errors.message) {
            errors += err.errors.message + "\n";
          } 
          alert(errors);
        }
      } else {
        $('#message').val('');
      }
    });

    return false;

  };

  $scope.changeCompleted = function(todo) {
    // Update the todo
    $http.put('/todos/' + todo.id, {
      completed: todo.completed
    }).error(function(err) {
      return alert(err.message || (err.errors && err.errors.completed) || "an error occurred");
    });
  };

  $scope.removeCompletedItems = function() {
    $http.get('/todos', {
      params: {
        completed: true
      }
    }).success(function(todos) {
      todos.forEach(function(t) { deleteTodo(t); });
    });
  };

  function deleteTodo(todo) {
    $http.delete('/todos/' + todo.id, {
      params: {
        completed: true
      }
    }).success(function() {
      // Find the index of an object with a matching id
      var index = $scope.todos.indexOf(
          $scope.todos.filter(function(t) {
            return t.id === todo.id;
          })[0]);

      if (index !== -1) {
        $scope.todos.splice(index, 1);
      }
    }).error(function(err) {
      alert(err.message || "an error occurred");
    });
  }

});




