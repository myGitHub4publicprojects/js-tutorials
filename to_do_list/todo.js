function styleToggle () {
	var span = this.nextSibling;
	if (this.checked) {
		span.style.textDecoration = 'line-through'
	}
	else {
		span.style.textDecoration = 'none'
	};
}

function rename () {
	var newName = prompt('new name:');
	if (!newName || newName=='' || newName==' '){
		return false;
	}
	this.innerText = newName;
}

function removeParentLi () {
	var li = this.parentElement;
	// removeElement(li);
	li.parentNode.removeChild(li);
	// to remove element you need to point not only the element but also its parent
}


function addItem (list, itemText) {
	totalItems ++;
	var li = document.createElement('li');
	var input = document.createElement('input');
	input.type = 'checkbox';
	input.id = totalItems;
	// input.addEventListener("click", function(){styleToggle(input.id)}, false);
	input.onclick = styleToggle;
	var span = document.createElement('span');
	span.innerText = itemText;
	span.ondblclick = rename;
	var removeBox = document.createElement('div');
	removeBox.className = 'remove';
	removeBox.innerText = 'X';
	removeBox.onclick = removeParentLi;
	li.appendChild(input);
	li.appendChild(span);
	li.appendChild(removeBox);
	// <li><input type="checkbox"><span>some item</span></li>
	list.appendChild(li);
}
var totalItems = 0;
var userInput = document.getElementById('userInput');
userInput.focus();
userInput.onkeyup = function (event) {
	// event.which -> ENTER
	// only proceed when key pressed is ENTER
	if (event.which==13) {
		var itemText = userInput.value;
		if (itemText=='' || itemText==' ') {
			return false
		}
		addItem(document.getElementById('toDoList'), itemText);
		userInput.value = ''
	}
};
// assign onclick to a function that in its body calls addItem - assiginig to additem(arg) will not work
// as this would call the function and wait for the return