var App = angular.module("todo", ["LocalStorageModule"]);

App.controller("TodoListCtrl", function ($scope, localStorageService) {

    $scope.init = function () {
        $scope.newTodo = {};
        $scope.todos = [];

        if (!localStorageService.get("todoList")) {
            $scope.todos = [
                {Name:"Prepare a breakfast", isDone:true},
                {Name:"Get to work", isDone:true},
                {Name:"Lunch time", isDone:true},
                {Name:"Work some more", isDone:true},
                {Name:"Go home", isDone:false},
                {Name:"Pull an all-nighter", isDone:true},
                {Name:"Sleep", isDone:false}
            ];           
        }else{
            $scope.todos = localStorageService.get("todoList");
        }
    };

    $scope.getDate = function () {
        var today = new Date();
        var mm = today.getMonth() + 1;
        var dd = today.getDate();
        var yyyy = today.getFullYear();

        var date = dd + "/" + mm + "/" + yyyy;

        return date;
    };

    $scope.addTodo = function  (todoItem) {
        todoItem.isDone = false;
        $scope.todos.push(todoItem);
        $scope.newTodo = {};
    };

    $scope.deleteTodo = function  (index) {
        $scope.todos.splice(index, 1);
    };

    $scope.markAllDone = function () {
        $scope.todos.forEach(function (todo) {
            todo.isDone = true;
        });
    };

    $scope.uncheckAllDone = function () {
        $scope.todos.forEach(function (todo) {
            todo.isDone = false;
        });
    };

    $scope.doneCount = function () {
        var todolistDone = 0;
        $scope.todos.forEach(function (todo) {
            if (todo.isDone === true) {
                todolistDone += 1;
            }
        });
        return todolistDone;
    };

    $scope.clearCompleted = function () {
        var kill = [];
        for (var i = 0; i < $scope.todos.length; i++) {
            if ($scope.todos[i].isDone)
                kill.push(i);
        }

        for (var i = 0; i < kill.length; i++)
            $scope.todos.splice(kill[i] - i, 1);
    };

    $scope.almostOneNotDone = function () {
        var todolistDone = $scope.doneCount();
        if (todolistDone < $scope.todos.length) {
            return true;
        } else
            return false;
    };

    $scope.deleteAll = function () {
        $scope.todos = [];
    };

	$scope.$watch("todos",function  (newVal,oldVal) {
	    if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
	        localStorageService.add("todoList",angular.toJson(newVal));
	    }
	},true);

});