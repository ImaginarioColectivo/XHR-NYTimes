`use strict`

/*const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;*/

//migración de XMLHTTPRequest a jQuery con Ajax

const $form = $('#search-form');
const $searchField = $('#search-keyword');
const $responseContainer = $('#response-container');
let searchedForText;

/*form.addEventListener('submit', function (e) {
	e.preventDefault();
	responseContainer.innerHTML = '';
	searchedForText = searchField.value;
	getNews();
});*/

$form.submit(function (e) {
	e.preventDefault();
	$responseContainer.html('');
	searchedForText = $searchField.val();
	getNews();
});


/*function getNews() {
	const articleRequest = new XMLHttpRequest();
	articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=b84599c03d80463b8e76e59a38b93acb`);
	articleRequest.onload = addNews;
	articleRequest.onerror = handleError;
	articleRequest.send();
}*/

function getNews() {
	$.ajax({
		url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=b84599c03d80463b8e76e59a38b93acb`
	}).done(addNews)
	.fail(handleError);
}

/*function addNews() {
	const data = JSON.parse(this.responseText);
	const article = data.response.docs[0];
	const title = article.headline.main;
	const snippet = article.snippet;

	let li = document.createElement('li');
	li.className = 'articleClass';
	li.innerText = snippet;

	responseContainer.appendChild(li);
}*/

function addNews(news) {
	const articles = news.response.docs;

	articles.forEach(function(article){
	const title = article.headline.main;
	const snippet = article.snippet;

	let $li = $('<li>').addClass('articleClass').text(snippet);

	$responseContainer.append($li);

	});
}

function handleError() {
	console.log('Se ha presentado un error');
}