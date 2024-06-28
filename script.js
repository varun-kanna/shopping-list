const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

const addItem = (e) => {
	e.preventDefault();

	const newItem = itemInput.value;

	// Validate Input
	if (newItem === '') {
		alert('Please add an item');
		return;
	}

	// Create list item
	const li = document.createElement('li');
	li.appendChild(document.createTextNode(newItem));

	const button = createButton('remove-item btn-link text-red');

	li.appendChild(button);
	// Add li to the DOM
	itemList.appendChild(li);

	checkUI();
	itemInput.value = '';
};

function createButton(classes) {
	const button = document.createElement('button');
	button.className = classes;
	const icon = createIcon('fa-solid fa-xmark');
	button.appendChild(icon);
	return button;
}

function createIcon(classes) {
	const i = document.createElement('i');
	i.className = classes;
	return i;
}

function removeItem(e) {
	if (e.target.parentElement.classList.contains('remove-item')) {
		if (confirm('Are you sure?')) {
			e.target.parentElement.parentElement.remove();
		}
		checkUI();
	}
}

function clearItems() {
	// itemList.innerHTML = ''  // This is slower
	while (itemList.firstChild) {
		itemList.firstChild.remove();
	}
	checkUI();
}

function checkUI() {
	// Must be in here, not global. When changes are made, this is needed to work properly
	const items = itemList.querySelectorAll('li');
	if (items.length === 0) {
		clearBtn.style.display = 'none';
		itemFilter.style.display = 'none';
	} else {
		clearBtn.style.display = 'block';
		itemFilter.style.display = 'block';
	}
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);

checkUI();
