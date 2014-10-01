
var requestFormApp = angular.module('requestFormApp', ['ngRoute']);


requestFormApp.controller('HomeCtrl', function ($scope, $http, $location, dateFilter) {
	var API_PATH = $location.host() == 'localhost' ? 'http://localhost/jotform/request_for_banner_designs_form/app/' : 'http://mtrinitaria.com/test/jotform/request_for_banner_designs_form/app/';
	$scope.title = 'Home';

  $scope.game = '';
  
  $scope.gamesList = [
    {name:'GoW', id:'gow' },
    {name:'Jelly Splash', id:'jellySplash' }
  ];

  $http.get('games.json').success(function(res) {
    $scope.gamesList = res;
    // $scope.game.data = res;
    // $scope.setRandom();
  });

  $scope.loadData = function(json) {
    $http.get('templates/' + json + '/data.json').success(function(res) {
      $scope.game.data = res;
      $scope.setRandom();
    });
  };

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  $scope.setRandom = function() {
    // random background
    var randBg = parseInt(Math.random() * $scope.game.data.backgrounds.length);
    $scope.background = $scope.game.data.backgrounds[randBg];

    // random cta
    var randCta = parseInt(Math.random() * $scope.game.data.ctas.length);
    $scope.cta = $scope.game.data.ctas[randCta];
    
    // random characters
    var randChars = [];
    for (var i=0; i<$scope.game.data.characters.length; i+=1) {
      $scope.game.data.characters[i].selected = false;
      randChars.push($scope.game.data.characters[i]);
    }
    randChars = shuffle(randChars);
    if (!$scope.selectedCharacters) {
      $scope.selectedCharacters = [];
    }
    $scope.selectedCharacters.length = 0;
    var len = ($scope.selectedCharacters.length > 5 ? 5 : $scope.selectedCharacters.length);
    for (var i=0; i<5; i+=1) {
      // randChars[i].selected = true;
      $scope.select(randChars[i]);
    }

    // update the baner preview
    $scope.updateBanner();
  };

  $scope.getGradient = function(colors) {
    if (!colors) return;
    colors = colors.split(',');
    var bgStr ='';
    bgStr += 'background: -moz-linear-gradient(top, '+colors[0]+' 0%, '+colors[1]+' 100%);';
    bgStr += 'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,'+colors[0]+'), color-stop(100%,'+colors[1]+'));';
    bgStr += 'background: -webkit-linear-gradient(top, '+colors[0]+' 0%,'+colors[1]+' 100%);';
    bgStr += 'background: -o-linear-gradient(top, '+colors[0]+' 0%,'+colors[1]+' 100%);';
    bgStr += 'background: -ms-linear-gradient(top, '+colors[0]+' 0%,'+colors[1]+' 100%);';
    bgStr += 'background: linear-gradient(to bottom, '+colors[0]+' 0%,'+colors[1]+' 100%);';
    bgStr += 'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='+colors[0]+', endColorstr='+colors[1]+',GradientType=0 );';

    return bgStr;
  };


  $scope.select = function(item) {
    if (!item) return;
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

  $scope.updateBanner = function() {
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
      cta:$scope.cta,
      characters:$scope.selectedCharacters
    }
    // console.log(json);

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
    tempJS.setAttribute('src', 'templates/'+$scope.game.id+'/wooga.js?s1=http%3A%2F%2Ftraktum.com%2F%3Fa%3D65553%26c%3D172531%26s2%3D%7BBIDID%7D&s2=&s3=&json=' + JSON.stringify(json));
    doc.getElementsByTagName('head')[0].appendChild(tempJS);
  }

  

});




