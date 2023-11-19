//
// GUI/DOM functions.
//

// Populate #main with the menu screen.
function showMenu() {
    // Update page title
    const header = document.getElementById('header');
    header.innerHTML = 'Virtual Queue';
    document.title = 'Virtual Queue';

    // Clear #main
    const main = document.getElementById('main');
    main.innerHTML = '';

    let content = '<div class="description">Choose a virtual queue.</div>';
    content += '<div class="menu" id="queues">';

    for (let queue of queues) {
        content += '<button class="queue">' + queue.name + '</button>';
    }

    content += '</div>'; // End first menu
    content += '<div class="menu"><button class="queue opposite">' + newQueueName + '</button></div>'; // Second menu

    if (isDemo) {
        content += '<div class="description">' + demoMessage + '</div>'
    }

    main.innerHTML = content;

    // Add event listeners
    addMenuListeners();
}

// Populate #main with a specified queue's view.
function showQueue(queue) {
    if (queue == null || queue.name == '') {
        throw ("Trying to populate null/empty queue");
    }

    thisQueueName = queue.name;

    const header = document.getElementById('header');
    header.innerHTML = queue.name + '\'s Virtual Queue';
    document.title = queue.name + '\'s Virtual Queue';

    // Clear #main
    const main = document.getElementById('main');
    main.innerHTML = '';

    // Form (name, phone number, add button, pull button)
    let content = '';

    content += '<div class="form"><input type="text" id="name" placeholder="Name"><input type="tel" id="number" placeholder="Phone number">'
    content += '<button id="add">Add to Queue</button><button id="pull">Pull from Queue</button><button id="delete" class="opposite">Delete Queue</button></div>';

    // Next in line, empty queue div
    content += '<div class="description">Next in line:</div>';
    content += '<div id="queue"></div>';

    // Push out current DOM content
    main.innerHTML = content;

    // Populate queue with the selected queue's data            
    populateQueue(queue.data);
}

// Populate the queue list with data. 
// Queue = array of {name, number} objects
function populateQueue(queue) {
    const queueElement = document.getElementById('queue');
    let content = '';

    for (i = 0; i < queue.length; i++) {
        let thisName = queue[i].name;
        let thisNumber = queue[i].number;

        content += `<div class="item" data-name="${thisName}" data-number="${thisNumber}">`;
        content += `<span class="name">${thisName}</span>`;
        content += `<span class="number">${thisNumber}</span>`;
        content += '<span class="action">Delete</span></div>';
    }

    queueElement.innerHTML = content;

    addQueueListeners();
}