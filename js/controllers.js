
var requestFormApp = angular.module('requestFormApp', ['ngRoute']);


requestFormApp.controller('HomeCtrl', function ($scope, $http, $location, dateFilter) {
	var API_PATH = $location.host() == 'localhost' ? 'http://localhost/jotform/request_for_banner_designs_form/app/' : 'http://mtrinitaria.com/test/jotform/request_for_banner_designs_form/app/';
	$scope.title = 'Home';

  $scope.game = '';
  
  $scope.gamesList = [
    {name:'GoW', id:'gow', characters:[] },
    {name:'Jelly Splash', id:'jellySplash', 
      characters:[{name:'Red'}, {name:'Blue'}, {name:'Green'}, {name:'Purple'}, {name:'Yellow'}], 
      animations:[{name:'Jump'}, {name:'Wave'}, {name:'Gift'}, {name:'Okay'}],
      patterns:[{name:'Pattern 1', src:'pattern1.jpg'},{name:'Pattern 2', src:'pattern2.jpg'},{name:'Pattern 3', src:'pattern3.jpg'} ]
    }
  ]
  $scope.animations = [
    {name:'Jump'},
    {name:'Gift'},
    {name:'Okay'},
    {name:'Wave'}
  ];
  $scope.backgrounds = [
    {name:'Transparent'},
    {name:'Color', colors:['#ffffff']},
    {name:'Gradient', colors:['#ffffff', '#ff0000']},
    {name:'Patterns' }
  ];


  $scope.select = function(item) {
  	item.selected = (item.selected ? false : true);

  	if (!$scope.selectedCharacters) {
  		$scope.selectedCharacters = [];
  	}
  	if (item.selected) {
      $scope.selectedCharacters.push(item);
  		// console.log(item.name);
  	} else {
  		$scope.selectedCharacters.splice($scope.selectedCharacters.indexOf(item), 1);
  	}
  }

  $scope.createBanner = function() {
  	var data = {};
  	// data.name = $scope.myform.name;
  	// data.email = $scope.myform.email;
  	// data.contactNumber = $scope.myform.contactNumber;
  	// data.bannerType = $scope.myform.bannerType.name;
  	// data.format = $scope.form.format.selects;
  	// data.sizes = $scope.form.sizes.lists;
  	// data.adServer = $scope.myform.adServer.name;
  	// data.notes = $scope.myform.notes;
  	// data.created = new Date();

    // create json
    var json = {
      background:$scope.background,
      cta:$scope.cta
    }
    console.log(json)

    // remove iframe
    if (document.getElementById('adFrame')){
      document.getElementById('adFrame').parentElement.removeChild(document.getElementById('adFrame'));
    }
    // then create iframe
    var elIframe=document.createElement('iframe');
    elIframe.setAttribute('id', 'adFrame');
    elIframe.setAttribute('style', 'overflow: hidden; width: 100%; height: 100%; padding: 0px; margin: 0px; display: block; background-color: transparent;');
    elIframe.setAttribute('scrolling', 'no');
    elIframe.setAttribute('frameborder', '0');
    document.querySelectorAll('.banner-container')[0].appendChild(elIframe);
    // add js template
    var doc = document.getElementById('adFrame').contentWindow.document;
    var tempJS = doc.createElement('script');
    tempJS.setAttribute('type', 'text/javascript');
    tempJS.setAttribute('src', 'templates/wooga2/wooga.js?s1=http%3A%2F%2Ftraktum.com%2F%3Fa%3D65553%26c%3D172531%26s2%3D%7BBIDID%7D&s2=&s3=&json=' + JSON.stringify(json));
    doc.getElementsByTagName('head')[0].appendChild(tempJS);
  }

  

});




