var submit = document.querySelector('.search-button');
var search = document.querySelector('.searchInput');
var resultItems = document.querySelector('.results');
var message = document.querySelector('.messageResults');

submit.addEventListener('click', function(e){
	e.preventDefault();
	resultItems.innerHTML='';
	var query = search.value;
	var limit = "9";
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
	// console.log("anything")
}
function renderPage(results){

	var listItem = "";

	message.innerHTML= 'Results for ' + search.value;
	console.log(message);
		for (var i = 0; i < results.length; i++) {
			// console.log(results[i]);
			if(results.length > 0)
			{
				listItem += '<article>';
				listItem += '<img src="'+ results[i].images[0].url +'" alt="" />';
				listItem += '<div>';
				listItem += '<h3>' + results[i].name + '</h3>';
				listItem += '<p>' + results[i].artists[0].name + '</p>';
				listItem += '</div>';
				listItem += '</article>';
			}
			else
			{
				message.innerHTML= 'Sorry! No results for ' + search.value;
				
			}
				
		}

		resultItems.insertAdjacentHTML('afterbegin', listItem);
		resultItems.insertBefore(message, resultItems.firstChild);
		
		
	
}

		
	
// results.forEach((result, index, array) => {
// 		var listItem = document.createElement('li');
// 		listItem.innerHTML = result.name;
// 		

	// })
