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
        throw ('Trying to populate null/empty queue');
    }
    
    // Define the content of the back button
    const backButtonContent = '< Back to Menu';
    
    thisQueueName = queue.name;

    // Update 
    const header = document.getElementById('header');
    header.innerHTML = thisQueueName + '\'s Virtual Queue';
    document.title = thisQueueName + '\'s Virtual Queue';

    // Clear #main
    const main = document.getElementById('main');
    main.innerHTML = '';

    // Form (name, phone number, add button, pull button)
    let content = '';

    content += '<div class="description"><button class="opposite" id="back">' + backButtonContent + '</button></div>'

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

    if(content == '') {
        content = '<span class="description">Queue is empty.</span>';
    }

    queueElement.innerHTML = content;

    addQueueListeners();
}

// Show a notification on the bottom corner of the screen.
// Text = the notifi
function showNotification(text, timeout) {
    if(text == null || text == '') {
        throw('Cannot show null/empty notification.');
    }
    if(timeout == null || timeout < 0) {
        // Use default timeout
        timeout = notificationTimeout;
    }

    let stack = document.getElementById('notification-stack');

    // Create the main container div
    const container = document.createElement("div");
    container.className = "notification";
    // Set timestamp as a unique identifier for future removal
    container.setAttribute('data-timestamp', Date.now());

    // Create the content span
    const content = document.createElement("span");
    content.className = "notification-content";
    content.innerHTML = text;

    // Create the close button span
    const close = document.createElement("span");
    close.className = "close-btn";
    close.textContent = "X";
    close.setAttribute('onclick', 'closeNotification(this.parentElement)');

    container.appendChild(content);
    container.appendChild(close);

    stack.appendChild(container);
    // stack.outerHTML = stack.outerHTML; // Doesn't seem to be necessary

    setTimeout(function() {
        // Remove the child element

        // console.log('About to try to remove ' + container.outerHTML);
        closeNotification(container);
        // console.log("Child element removed after " + notificationTimeout + " seconds");
      }, timeout * 1000);
}

// Removes notifications by matching timestamps with timestamps in the stack.
// This is a sort of workaround to not being able to just use element.remove(),
// which doesn't seem to affect the surrounding DOM. This uses parent.removeChild(),
// with the specified child element found by iterating through children & matching.
function closeNotification(elem) {
    if(elem == null || elem.getAttribute('data-timestamp') == null || elem.getAttribute('data-timestamp') == '') {
        throw('Element or its timestamp are null/empty.');
    }
    let stack = document.getElementById('notification-stack');
    if (stack.hasChildNodes()) {
        // console.log('Iterating through child nodes to find which one to remove.')
        // console.log('Wanting to find: ' + elem.getAttribute('data-timestamp'));
        let searchTimestamp = elem.getAttribute('data-timestamp');
        for(let i = 0; i < stack.children.length; i++) {
            let thisTimestamp = stack.children[i].getAttribute('data-timestamp');
            if(thisTimestamp == searchTimestamp) {
                // console.log('Found ' + thisTimestamp);
                stack.removeChild(stack.children[i]);
                break;
            }
        }
    }
    // stack.outerHTML = stack.outerHTML; // Doesn't seem to be necessary
}