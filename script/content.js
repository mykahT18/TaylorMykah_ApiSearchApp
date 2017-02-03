var submit = document.querySelector('.search-button');
var search = document.querySelector('.searchInput');
var resultItems = document.querySelector('.results');

submit.addEventListener('click', function(e){
	e.preventDefault();
	var query = search.value;
	var limit = "10";
	var type = "album";
	var api = `https://api.spotify.com/v1/search?query=${query}&offset=0&limit=${limit}&type=${type}`;
	console.log(api);
	makeRequest(api);
})
function makeRequest(url){
	var request = new XMLHttpRequest();
	
	request.open('GET', url, true)

	request.onload = function(){
		console.log("anything")
		if(request.status >= 200 && request.status < 400){
			var data = JSON.parse(request.responseText);
			console.log(data);
		}
		else{
			console.log('response error', request);
		}
	}
	request.onerror = function(){
		console.log('connection error')
	}
	request.send();
}