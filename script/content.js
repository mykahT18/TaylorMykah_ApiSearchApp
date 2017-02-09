var submit = document.querySelector('.search-button');
var search = document.querySelector('.searchInput');
var resultItems = document.querySelector('.results');
var message = document.querySelector('.messageResults');
var nav = document.querySelector('.mainNav'); 
var menu = document.querySelector('.ham');

submit.addEventListener('click', function(e){
	e.preventDefault();
	resultItems.innerHTML='';
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
	// console.log("anything")
}
function renderPage(results){

	var listItem = "";

	message.innerHTML= 'Results for ' + search.value;
	console.log(message);
	if(results.length > 0){
		for (var i = 0; i < results.length; i++) {
			// console.log(results[i]);
			
			
				listItem += '<article>';
				listItem += '<img src="'+ results[i].images[0].url +'" alt="" />';
				listItem += '<div>';
				listItem += '<h3>' + results[i].name + '</h3>';
				listItem += '<p>' + results[i].artists[0].name + '</p>';
				listItem += '</div>';
				listItem += '</article>';
				
		}
	}else
			{
				message.innerHTML= 'Sorry! No results for ' + search.value;
				
			}
		resultItems.insertAdjacentHTML('afterbegin', listItem);
		resultItems.insertBefore(message, resultItems.firstChild);
		
		
	
}
function showNav(event){

    event.preventDefault();    
    var target = event.target;

    //checking if it is open
    if(nav.classList.contains("active")){
    	nav.classList.remove('active');
    	menu.classList.remove('close');

    } else {
    	nav.className += ' active';
	    target.className += ' close';
    }
   

}

    var el = document.querySelector('.ham');
    el.addEventListener('click', showNav); 


		
