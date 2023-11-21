//
// Queue manipulation functions. Interacts with data, minimal data validation.
//

// Remove an item from the queue.
// Queue = the name of the queue to check
// Name = the name to remove, optional
// Returns the name of the person returned.
function removeFromQueue(queueName, name) {
    // If no queue, throw an error
    if (queueName == null || !getQueueFromName(queueName)) {
        throw ('Queue is null or not Object, cannot remove ' + name);
    }

    const queueData = getQueueFromName(queueName).data;
    // If no name, remove the top item of the queue
    if (name == null || name == '') {
        let removedName = queueData[0].name;
        queueData.splice(0, 1);
        return removedName;
    } else {
        for (let i = 0; i < queueData.length; i++) {
            if (queueData[i].name == name) {
                // console.log('Found the one to remove');
                queueData.splice(i, 1);
                return name;
            }
        }
    }
}

// Add an item to the queue.
// Queue = the name of the queue to add to
// Name = the name to add to queue
// Number = the phone number to add to queue
function addToQueue(queueName, name, number) {
    const queueData = getQueueFromName(queueName).data;
    queueData.push({ 'name': name, 'number': number });
}

// Add a new queue to the list.
// Name = the name of the queue to create.
// This assumes duplicate checking has already happened.
function newQueue(name) {
    if(name == null || name.trim() == '') {
        throw('Cannot create queue with null/empty name.');
    }
    queues.push({ 'name': name, 'data': [] });
    return name;
}

// Delete a queue with the specified name.
function deleteQueue(name) {
    // Can't use getQueueFromName, we need an index.
    for (let i = 0; i < queues.length; i++) {
        if (queues[i].name.trim().toLowerCase() == name.trim().toLowerCase()) {
            console.log('Matching queue name detected: ' + name);
            queues.splice(i, 1);
            break;
        }
    }
}

// Helper function to get a queue object from its name.
function getQueueFromName(name) {
    if (name == null || name == '') {
        throw ('Cannot getQueueFromName because name is null or empty');
    }
    for (let queue of queues) {
        if (queue.name.trim().toLowerCase() == name.trim().toLowerCase()) {
            return queue;
        }
    }
    return null;
}