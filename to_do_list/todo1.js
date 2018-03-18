// this works
// see how function is assigned to onclick

function addItem () {
	var newLi = document.createElement('li');
	newLi.innerText = 'Hello';
	list = document.getElementById('toDoList');
	list.appendChild(newLi)
}

var btn = document.getElementById('addNew');
btn.onclick = addItem;
// do not call the function as this would wait for the return,
// instead just assign to a name of function