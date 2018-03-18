// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark (e) {
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if (!validateForm(siteName, siteUrl)) {
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl,
	}

	console.log(bookmark)

	// local storage test
	// localStorage.setItem('myKey', 'some strign for value');
	// console.log(localStorage.getItem('myKey'));
	// localStorage.removeItem('myKey');
	// console.log(localStorage.getItem('myKey'));

	// test if bookmarks is null
	if (localStorage.getItem('bookmarks')===null) {
		// init array
		var bookmarks = [];
		// add to array
		bookmarks.push(bookmark);
		// set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	else {
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	// clear form
	document.getElementById('myForm').reset();

	// re-fetch bookmarks
	fetchBookmarks();

	e.preventDefault();
	// use e and e.preventDefault() to prevent sumbitting form and reload page after submit is clicked
}

// delete bookmark
function deleteBookmark(url) {
	// get bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	for (var i=0; i<bookmarks.length; i++) {
		if (bookmarks[i].url == url) {
			// remove from array
			bookmarks.splice(i, 1);
		}
	}
	// re-set local storage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// re-fetch bookmarks
	fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks () {
	// get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	// build output
	bookmarksResults.innerHTML = '';
	for (var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		var visit = '<a class="btn btn-info" target="_blank"' +
					'href ="' + url + '">visit</a>';
		var remove = '<a onclick="deleteBookmark(' +
					"\'" + url + "\'" + ')"' + 
					'class="btn btn-danger" href ="#">Remove</a>';
		bookmarksResults.innerHTML += '<div class="well">' +
										'<h3>' +
										name + visit + remove +
										'</h3></div>';
	}
}

// form validation
function validateForm (siteName, siteUrl) {
	if (!siteName || !siteUrl) {
		alert('Please fill in the form');
		return false;
	}

	// validate url pattern
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	if (!siteUrl.match(regex)) {
		alert('Please use a valid url');
		return false;
	}

	return true;
}