// Add event listeners to the header. Should only be run once
function addHeaderListeners() {
    const header = document.getElementById('header');
    header.addEventListener('click', function () {
        showMenu();
    });
}

// Add event listeners, after using showMenu().
function addMenuListeners() {
    // First remove listeners
    const main = document.getElementById('main');
    main.outerHTML = main.outerHTML;

    // Select a Queue buttons, including New Queue
    const queueElements = document.querySelectorAll('.queue');
    queueElements.forEach(function (element) {
        let name = element.innerHTML;
        element.addEventListener('click', function () {
            // handleQueueSelection handles "New Queue" itself.
            handleQueueSelection(name);
        });
    });
}

// Add event listeners, after using showQueue().
function addQueueListeners() {
    // First remove listeners
    const main = document.getElementById('main');
    main.outerHTML = main.outerHTML;

    // Delete Queue button
    const deleteButton = document.querySelector('#delete');
    deleteButton.addEventListener('click', function () {
        // Find the name of the queue
        handleDeleteQueue(thisQueueName);
    });

    // Add to Queue button
    const add = document.querySelector('#add');
    add.addEventListener('click', function () {
        // Get form values
        const name = document.getElementById('name').value;
        const number = document.getElementById('number').value;

        handleAddToQueue(thisQueueName, name, number);
    });

    // Pull from Queue button
    const pull = document.querySelector('#pull');
    pull.addEventListener('click', function () {
        // Find the name of the queue
        handlePullFromQueue(thisQueueName);
    });

    // Delete button for specific queue items
    const deleteItemButtons = document.querySelectorAll('.action');
    deleteItemButtons.forEach(function (element) {
        // Handle queue selection with the given queue name
        let name = element.parentElement.getAttribute('data-name');
        element.addEventListener('click', function () {
            handleDeleteItem(name);
        });
    });
}

//
// Specific handler functions. Interact with GUI and provide data validation.
//

// Handle queue click from menu. "New Queue" (newQueueName) is an option
function handleQueueSelection(name) {
    // console.log('Click detected on ' + name + ', running handleQueueSelection');
    if (name == null || name == '') {
        throw ('handleQueueSelection called with null/empty name');
    }
    if (name == newQueueName) {
        // They clicked New Queue, start the process of making a new queue.
        let newName = '', validName = false;
        while (newName != null && validName == false) {
            newName = prompt('Name for the new queue:');
            validName = true;
    
            if (newName.trim() == '') {
                validName = false;
                // showNotification('Cannot make queue with empty name.');
                continue;
            }
            if (getQueueFromName(newName)) {
                // showNotification('A queue with that name already exists.');
                validName = false;
            }
        }
        // validName is true if this code is reached.
        newQueue(newName);
        showMenu();
        showNotification('New queue <strong>' + newName + '</strong> created.');
    }
    if (getQueueFromName(name)) {
        showQueue(getQueueFromName(name));
    }
}

// Handle deleting a whole queue
function handleDeleteQueue(name) {
    // Null throws
    // console.log("Handling delete queue");
    if (name == null || name == '') {
        throw ('handleDeleteQueue called with null/empty name');
    }
    // Are you sure? Type if so.
    let promptName = prompt('Do you really want to delete the queue? Type the queue name if so.');
    if (promptName.trim().toLowerCase() == name.trim().toLowerCase()) {
        deleteQueue(name);
        showMenu();
        showNotification('Deleted queue <strong>' + name + '</strong>.');
    }
}

// Handle delete click from queue
function handleDeleteItem(name) {
    // console.log('Trying to delete ' + name);
    // Are you sure?
    if (confirm('Do you really want to delete ' + name + ' from the queue?')) {
        // console.log(getQueueFromName(thisQueueName)); // before
        removeFromQueue(thisQueueName, name);
        // console.log(getQueueFromName(thisQueueName)); // after
        populateQueue(getQueueFromName(thisQueueName).data);
        showNotification('Deleted <strong>' + name + '</strong> from the queue.');
    }
}

// Handle Add button from queue
function handleAddToQueue(queueName, name, number) {
    // Verify form content
    // console.log('Handling add to queue');
    if (queueName == null || !getQueueFromName(queueName) || name == null || number == null) {
        throw ('Null value or queue, cannot add to queue.');
    }
    const queueData = getQueueFromName(queueName).data;
    // Check for any other names (maybe don't check because 2 people with same name could join)
    // for(let item of queueData) {
    //     if(item.name)
    // }

    // TODO: validate phone number
    addToQueue(queueName, name, number);
    populateQueue(getQueueFromName(queueName).data);
    showNotification('Added <strong>' + name + '</strong> to the queue.');
}

// Handle Pull button from queue
// Name = the queue name
function handlePullFromQueue(queue) {
    // Check if queue can be pulled from
    if (getQueueFromName(queue) && getQueueFromName(queue).data) { // Make sure queue & its data exist
        if (getQueueFromName(queue).data.length <= 0) {
            showNotification('Cannot pull from an empty queue.');
            return;
        }
    }

    // Are you sure?
    if (confirm('Do you really want to pull from the queue?')) {
        let removedName = removeFromQueue(queue);
        populateQueue(getQueueFromName(queue).data);
        showNotification('Pulled <strong>' + removedName + '</strong> from the queue.');
    }
}