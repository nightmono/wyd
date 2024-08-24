const tasks = {};

function userExists(userID) {
    return userID in tasks;
}

function setTask(userID, task, duration, channelID) {
    tasks[userID] = { task: task, duration: duration, timePassed: 0, channelID };
}

function getTask(userID) {
    return tasks[userID];
}

function deleteTask(userID) {
    delete tasks[userID];
}

function alertUser(userID, client) {
    const userTask = getTask(userID);
    const duration = userTask.duration;
    const task = userTask.task;
    const timePassed = userTask.timePassed;
    const channelID = userTask.channelID;

    const embed = {
        color: 0xE9AD0C,
        fields: [
            { name: 'Duration', value: (duration > 0) ? `${duration} minutes` : 'Unsure', inline: true },
            { name: 'Task', value: task, inline: true },
        ],
    };
    const finishMessage = 'If you\'re finished, run the `/finish` command!';

    if (duration == -1) {
        embed.title = 'Hey! How is your task going?';
        embed.description = `It has been ${timePassed} minutes. ${finishMessage}`;
    } else if (timePassed == duration) {
        embed.title = 'Hey! Time\'s up!';
        embed.description = `${finishMessage} If you need more than ${duration} minutes, you can keep working as usual.`;
    } else {
        embed.title = 'Hey! How is your task going?';
        embed.description = `It has been ${timePassed} out of ${duration} minutes. ${finishMessage}`;
    }

    const channel = client.channels.cache.get(channelID);
    channel.send({ content: `<@${userID}>`, embeds:[embed] });
}

function updateTaskLoop(client) {
    // Temp bandaid solution for the time for now
    console.log(`${new Date().toLocaleTimeString()} Updating tasks`);
    for (const [userID, task] of Object.entries(tasks)) {
        task.timePassed++;
        console.log(`${userID}, ${task.timePassed} passed`);
        if (task.timePassed % 15 == 0) {
            console.log(`Pinging this user ${task.channelID}`);
            alertUser(userID, client);
        }
    }
}

module.exports = {
    userExists,
    setTask,
    getTask,
    deleteTask,
    updateTaskLoop,
};