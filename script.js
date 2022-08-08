const todos = [];
let toggle = false;
let done = true;
const addTodoInput = document.createElement('input');
addTodoInput.classList.add('addTodoInput');
const addTodoButton = document.createElement('button');
addTodoButton.classList.add('addTodoButton');
const todo = document.createElement('div');
todo.classList.add('todo-area');
const ShowDone = document.createElement('button');
ShowDone.classList.add('btnShowDone');
ShowDone.innerText = 'show todos is Done';
const add = document.createElement('button');
add.classList.add('add');
add.innerText = '+';
const addTodo = (val) => {
	if (val) {
		addTodoButton.style.display = 'inline';
		addTodoInput.style.display = 'inline';
		add.style.display = 'none';
		document.querySelector('input').focus();
	} else {
		addTodoButton.style.display = 'none';
		addTodoInput.style.display = 'none';
		add.style.display = 'inline';
	}
};
add.addEventListener('click', () => addTodo(true));
ShowDone.style.display = 'none';
addTodoButton.style.display = 'none';
addTodoInput.style.display = 'none';
const donesFilter = () => {
	let done = todos.filter((todo) => todo.isCompleted === true);
	if (done.length > 0) return (ShowDone.style.display = 'block');
	else return (ShowDone.style.display = 'none');
};

addTodoButton.innerText = 'submit';

window.onload = function () {
	document.querySelector('input').focus();
};

document.onkeydown = function (e) {
	if (e.key == 'Enter') {
		Enter(false);
		document.querySelector('input').focus();
	}
};
addTodoButton.addEventListener('click', () => {
	Enter(false);
	document.querySelector('input').focus();
});

const toggleColor = document.createElement('button');
toggleColor.innerText = 'toggle color';
const Enter = (val) => {
	if (addTodoInput.value === '' && !val) {
		alert('Please enter a value');
	} else if (!val) {
		const newTodo = {
			title: addTodoInput.value,
			isCompleted: false,
			id: Date.now(),
		};
		todos.push(newTodo);
		addTodos(todos);
		donesFilter();
		console.log(todos);
		addTodo(false);
	} else {
		addTodos(todos);
		donesFilter();
		console.log(todos);
	}
};

const addTodos = (todoArr) => {
	todo.innerText = '';
	todoArr.forEach((item, index) => {
		addTodoInput.value = '';
		const areaTodo = document.createElement('div');
		areaTodo.classList.add('area-todo');
		const todoButton = document.createElement('button');
		const changeButton = document.createElement('button');
		const todoButtonRemove = document.createElement('button');
		todoButtonRemove.innerText = 'REMOVE';
		changeButton.innerText = 'EDIT';

		todoButtonRemove.classList.add(`btn${item.id}`);
		todoButton.classList.add(`btn${item.id}`);
		todoButton.innerText = 'Done';
		const p_text = document.createElement('p');
		p_text.innerText = item.title;
		if (item.isCompleted) {
			todoButton.innerText = 'UnDone';
			p_text.style.textDecoration = 'line-through';
		}
		todo.appendChild(areaTodo);
		areaTodo.appendChild(p_text);
		areaTodo.appendChild(todoButton);
		areaTodo.appendChild(todoButtonRemove);
		areaTodo.appendChild(changeButton);
		todoButtonRemove.addEventListener('click', (item) => {
			// debugger;
			console.log(item.target.className);
			console.log(item.target.className.split('btn')[1]);
			const isId = (element) =>
				+element.id === item.target.className.split('btn')[1];
			let indx = todos.findIndex(isId);
			todos.pop(todos[indx]);
			addTodos(todos);
		});
		changeButton.addEventListener('click', () => {
			const updateTodo = document.createElement('input');
			const updateTodoButton = document.createElement('button');
			updateTodoButton.innerText = 'Update';
			updateTodo.type = 'text';
			updateTodo.value = item.title;
			p_text.style.display = 'none';
			todoButton.style.display = 'none';
			todoButtonRemove.style.display = 'none';
			changeButton.style.display = 'none';

			areaTodo.appendChild(updateTodo);
			areaTodo.appendChild(updateTodoButton);

			updateTodo.focus();

			updateTodoButton.addEventListener('click', () => {
				const isId = (element) => +element.id === +item.id;
				let indx = todos.findIndex(isId);
				todos[indx].title = updateTodo.value;
				if (updateTodo.value === '') {
					alert('is Empty');
				} else {
					Enter(true);
				}
			});
		});

		todoButton.addEventListener('click', (item) => {
			const isId = (element) =>
				+element.id === +item.target.className.split('btn')[1];
			let indx = todos.findIndex(isId);
			if (todos[indx].isCompleted) {
				todoButton.innerText = 'Done';
				p_text.style.textDecoration = 'initial';
			} else {
				todoButton.innerText = 'UnDone';
				p_text.style.textDecoration = 'line-through';
			}
			todos[indx].isCompleted = !todos[indx].isCompleted;
			donesFilter();
		});
	});
};
ShowDone.addEventListener('click', () => {
	let dones = [];
	if (done) {
		console.log(todos[0].isCompleted);
		dones = todos.filter((item) => {
			if (item.isCompleted == false) return true;
		});

		addTodos(dones);
	} else {
		addTodos(todos);
	}
	done = !done;
});
toggleColor.addEventListener('click', () => {
	const btns = document.querySelectorAll('button');
	const inputs = document.querySelectorAll('input');
	if (!toggle) {
		document.body.style.backgroundColor = 'black';
		document.body.style.color = 'white';
		btns.forEach((b) => {
			b.style.backgroundColor = 'black';
			b.style.color = 'white';
			b.style.border = 'white 1px solid ';
		});
		inputs.forEach((i) => {
			i.style.backgroundColor = 'black';
			i.style.color = 'white';
			i.style.border = 'white 1px solid ';
		});
	} else {
		document.body.style.backgroundColor = 'white';
		document.body.style.color = 'black';
		btns.forEach((b) => {
			b.style.backgroundColor = 'white';
			b.style.color = 'black';
			b.style.border = 'black 1px solid ';
		});
		inputs.forEach((i) => {
			i.style.backgroundColor = 'white';
			i.style.color = 'black';
			i.style.border = 'black 1px solid ';
		});
	}
	toggle = !toggle;
});

document.body.appendChild(addTodoInput);
document.body.appendChild(add);
document.body.appendChild(addTodoButton);
document.body.appendChild(toggleColor);
document.body.appendChild(todo);
document.body.appendChild(ShowDone);
