var submit = document.querySelector('.search-button');
var search = document.querySelector('.searchInput');
var resultItems = document.querySelector('.results');

submit.addEventListener('click', function(e){
	e.preventDefault();
	var query = search.value;
	var limit = "15";
	var type = "album";
	var api = `https://api.spotify.com/v1/search?query=${query}&offset=0&limit=${limit}&type=${type}`;
	console.log(api);
	makeRequest(api);
})
function makeRequest(url){
	var request = new XMLHttpRequest();

	request.open('GET', url, true)

	request.onload = function(){
		
		if(request.status >= 200 && request.status < 400){
			var data = JSON.parse(request.responseText);
			renderPage(data.albums.items);
			

		}
		else{
			console.log('response error', request);
		}
	}
	request.onerror = function(){
		console.log('connection error')
	}
	request.send();
	console.log("anything")
}
function renderPage(results){

		var listItem = "";
		console.log(results)

		for (var i = 0; i < results.length; i++) {
			listItem += '<article>';
			listItem += '<img src="'+ results[i].images +'" alt="" />';
			listItem += '<h2>' + results[i].name + '</h2>';
			listItem += '<p>' + results[i].artists.name + '</p>';
			listItem += '</article>';
		}

		resultItems.insertAdjacentHTML('beforeend', listItem);
	
}
// results.forEach((result, index, array) => {
	// 	var listItem = document.createElement('li');
	// 	listItem.innerHTML = result.name;
	// 	resultItems.appendChild(listItem);