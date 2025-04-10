
let names = [];
let selectedNamesHistory = [];

function updateNameList() {
    const nameList = document.getElementById('nameList');
    nameList.innerHTML = '';

    names.forEach(function(name) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = name;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-sm btn-danger';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function() {
            removeName(name);
            saveNamesToLocalStorage();
        });

        li.appendChild(removeBtn);
        nameList.appendChild(li);
    });

    document.getElementById('remainingCount').textContent = `Remaining names: ${names.length}`;
}

function removeName(nameToRemove) {
    const index = names.indexOf(nameToRemove);
    if (index > -1) {
        names.splice(index, 1);
        updateNameList();
    }
}

document.getElementById('addNameBtn').addEventListener('click', function() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    if (name !== '') {
        names.push(name);
        nameInput.value = '';
        updateNameList();
        saveNamesToLocalStorage();
        alert(`${name} has been added to the list!`);
    }
});

document.getElementById('selectNameBtn').addEventListener('click', function() {
    if (names.length > 0) {
        const randomIndex = Math.floor(Math.random() * names.length);
        const selectedName = names[randomIndex];
        selectedNamesHistory.push(selectedName);
        highlightSelectedName(selectedName);
        names.splice(randomIndex, 1);
        updateNameList();
        saveNamesToLocalStorage();
        alert(`${selectedName} has been selected!`);
    } else {
        alert("No names left to select!");
    }
});

function highlightSelectedName(name) {
    const selectedDisplay = document.getElementById('selectedName');
    selectedDisplay.textContent = `Selected: ${name}`;
}

function sortNames() {
    names.sort();
    updateNameList();
    saveNamesToLocalStorage();
}

const sortButton = document.createElement('button');
sortButton.textContent = 'Sort Names';
sortButton.className = 'btn btn-info mt-2';
document.querySelector('.form-group').appendChild(sortButton);
sortButton.addEventListener('click', sortNames);

const clearAllButton = document.createElement('button');
clearAllButton.textContent = 'Clear All Names';
clearAllButton.className = 'btn btn-danger mt-2';
document.querySelector('.form-group').appendChild(clearAllButton);
clearAllButton.addEventListener('click', function() {
    if (confirm("Are you sure you want to clear all names?")) {
        names = [];
        updateNameList();
        document.getElementById('selectedName').textContent = '';
        saveNamesToLocalStorage();
    }
});

document.getElementById('nameInput').addEventListener('input', function() {
    const filterValue = this.value.toLowerCase();
    const filteredNames = names.filter(name => name.toLowerCase().includes(filterValue));
    updateFilteredList(filteredNames);
});

function updateFilteredList(filteredNames) {
    const nameList = document.getElementById('nameList');
    nameList.innerHTML = '';
    filteredNames.forEach(function(name) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = name;
        nameList.appendChild(li);
    });
    document.getElementById('remainingCount').textContent = `Remaining names: ${filteredNames.length}`;
}

function displaySelectedNamesHistory() {
    const historyDiv = document.getElementById('historySection');
    historyDiv.innerHTML = '<h4>Selected Names History:</h4>';
    const historyList = document.createElement('ul');

    selectedNamesHistory.forEach(function(name) {
        const li = document.createElement('li');
        li.textContent = name;
        historyList.appendChild(li);
    });

    historyDiv.appendChild(historyList);
}

const filterHistoryInput = document.createElement('input');
filterHistoryInput.type = 'text';
filterHistoryInput.placeholder = 'Filter history...';
filterHistoryInput.className = 'form-control mt-2';
document.querySelector('.form-group').appendChild(filterHistoryInput);
filterHistoryInput.addEventListener('input', function() {
    const filterValue = this.value.toLowerCase();
    const filteredHistory = selectedNamesHistory.filter(name => name.toLowerCase().includes(filterValue));
    updateFilteredHistoryList(filteredHistory);
});

function updateFilteredHistoryList(filteredHistory) {
    const historyDiv = document.getElementById('historySection');
    const historyList = historyDiv.querySelector('ul');
    historyList.innerHTML = '';
    filteredHistory.forEach(function(name) {
        const li = document.createElement('li');
        li.textContent = name;
        historyList.appendChild(li);
    });
}

const clearHistoryButton = document.createElement('button');
clearHistoryButton.textContent = 'Clear History';
clearHistoryButton.className = 'btn btn-danger mt-2';
document.querySelector('.form-group').appendChild(clearHistoryButton);
clearHistoryButton.addEventListener('click', function() {
    if (confirm("Are you sure you want to clear the history?")) {
        selectedNamesHistory = [];
        displaySelectedNamesHistory();
    }
});

function saveNamesToLocalStorage() {
    localStorage.setItem('names', JSON.stringify(names));
}

function loadNamesFromLocalStorage() {
    const storedNames = JSON.parse(localStorage.getItem('names'));
    if (storedNames) {
        names = storedNames;
        updateNameList();
    }
}

window.onload = function () {
    loadNamesFromLocalStorage();
    displaySelectedNamesHistory();
};
```
