var app = angular.module('comment', []);

app.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.test = 'Hello world!';
    $scope.comments = [
      {title:'Comment 1', upvotes:5},
      {title:'Comment 2', upvotes:6},
      {title:'Comment 3', upvotes:1},
      {title:'Comment 4', upvotes:4},
      {title:'Comment 5', upvotes:3}
    ];

    $scope.addComment = function() {
      if($scope.formContent === '') { return; }
      console.log("In addComment with "+$scope.formContent);
      $scope.create({
        title: $scope.formContent,
        upvotes: 0,
      });
      $scope.formContent = '';
    };
    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes += 1;
        });
    };
   
 $scope.incrementUpvotes = function(comment) {
      $scope.upvote(comment);
    };


  $scope.getAll = function() {
	console.log("in get all")
    return $http.get('/comments').success(function(data){
     	console.log('in get all success! data: '+data)
	 angular.copy(data, $scope.comments);
    });
  };
  $scope.getAll()
  $scope.create = function(comment) {
	console.log("inside create function! ")
    return $http.post('/comments', comment).success(function(data){
      $scope.comments.push(data);
    });
  };
  }
]);

app.controller('MainTabCtrl', [
  '$scope','$http',
  
  function($scope,$http){

    $scope.test = 'Hello world! in tabs';
   
    $scope.tabs =[
      {title:'This is a tab', content:'This is a note within the tab'}

    ];


    //initiate an array to hold all active tabs
    $scope.activeTabs = [];

    //check if the tab is active
    $scope.isOpenTab = function (tab) {
      // console.log("in isOpen tab: "+tab)
        //check if this tab is already in the activeTabs array
        if ($scope.activeTabs.indexOf(tab) > -1) {
            //if so, return true
            return true;
        } else {
            //if not, return false
            return false;
        }
    }
    
    //function to 'open' a tab
    $scope.openTab = function (tab) {
        console.log("in open tab: "+tab)
        //check if tab is already open
        if ($scope.isOpenTab(tab)) {
            //if it is, remove it from the activeTabs array
            $scope.activeTabs.splice($scope.activeTabs.indexOf(tab), 1);
        } else {
            //if it's not, add it!
            $scope.activeTabs.push(tab);
        }
    }

    $scope.addTab = function(input_title,input_content){
      console.log("In add tab with "+$scope.title+" and "+$scope.content);
      $scope.tabs.push({title:$scope.title, content: $scope.content})
    
    }


  }
]);



