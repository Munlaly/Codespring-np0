

const toDo = document.querySelector("#to-do-list ul"); 
const input = document.querySelector('#add input');

let state = [];

// Save the current state to localStorage
function saveState() {
    const savedState = JSON.stringify(state);
    localStorage.setItem('saved-state', savedState);
}

// Load state from localStorage
function loadState() {
    const saved = localStorage.getItem('saved-state');
    if (saved) {
        state = JSON.parse(saved);
    } else {
        state = [];
    }
}

// Rebuild the UI from the current state
function buildDom(state) {
    toDo.innerHTML = ''; // Clear existing list
    for (const element of state) {
        toDo.appendChild(createNew(element.text, element.checked, element.id));
    }
}

// Handle adding new items
const addBtn = document.querySelector("#add-btn");

addBtn.addEventListener("click", () => {
    
    const inputVal = input.value.trim();

    if (!inputVal) return;

    const id = Math.random(); // Random unique ID
    const newItem = { text: inputVal, checked: false, id };
    state.push(newItem); // Save the data
    const newElement = createNew(newItem.text, newItem.checked, newItem.id);

    toDo.appendChild(newElement); // Show in UI
    input.value = ''; // Clear input
    saveState(); // Save to localStorage
    
    
});

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { // Check if Enter key is pressed
         const inputVal = input.value.trim();

    if (!inputVal) return;

    const id = Math.random(); // Random unique ID
    const newItem = { text: inputVal, checked: false, id };
    state.push(newItem); // Save the data
    const newElement = createNew(newItem.text, newItem.checked, newItem.id);

    toDo.appendChild(newElement); // Show in UI
    input.value = ''; // Clear input
    saveState(); // Save to localStorage
    }
    
});

// Create a new <li> element with checkbox and remove button
function createNew(text, checked, id) {
    const li = document.createElement('li');
    li.id = id;

    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = checked;

    const span = document.createElement('span');
    span.textContent = text;

    const rmBtn = document.createElement('button');
    rmBtn.classList.add('pretty-btn', 'remove-btn');
    rmBtn.textContent = 'X';

    // Handle checkbox changes (update state)
    label.addEventListener('change', () => {
        const index = state.findIndex(item => item.id === id);
        if (index !== -1) {
            state[index].checked = input.checked;
            saveState();
        }

        
        if (input.checked) {
            span.style.textDecoration = 'line-through';
        } else {
            span.style.textDecoration = 'none';
        }
    });

    // Handle remove button
    rmBtn.addEventListener('click', () => {
        li.remove(); // Remove from UI
        state = state.filter(item => item.id !== id); // Remove from state
        saveState(); // Save changes
    });

    label.appendChild(input);
    label.appendChild(span);
    //label.appendChild(rmBtn);
    li.appendChild(label);
    li.appendChild(rmBtn);

    return li;
}

// Load and display saved state on page load
loadState();
buildDom(state);
