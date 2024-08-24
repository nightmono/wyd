const { SlashCommandBuilder } = require('discord.js');
const { userExists, getTask, deleteTask } = require('./../../tasks.js');

module.exports = {
    category: 'wyd',
    data: new SlashCommandBuilder()
        .setName('finish')
        .setDescription('Finish you current task'),
    async execute(interaction) {
        const userID = interaction.user.id;

        if (userExists(userID)) {
            const userTask = getTask(userID);
            const duration = userTask.duration;
            const task = userTask.task;
            const timePassed = userTask.timePassed;
            const timeDifference = duration - timePassed;

            deleteTask(userID);

            let durationMessage;
            if (duration == -1) {
                durationMessage = `You took ${timePassed} minutes! Now you know how long you'll need for next time!`;
            } else if (timeDifference > 0) {
                durationMessage = `You took ${timePassed} minutes! That's ${timeDifference} minutes faster than what you set (${duration})!`;
            } else if (timeDifference < 0) {
                durationMessage = `You took ${timePassed} minutes, ${timeDifference * -1} minutes extra than what you set (${duration}) but at least you completed the task :D!`;
            } else {
                durationMessage = `You took exactly ${duration} minutes! Right on time`;
            }

            const embed = {
                color: 0x33D17A,
                title: 'Congrats on finishing your task!',
                description: durationMessage,
                fields: [
                    { name: 'Duration', value: (duration > 0) ? `${duration} minutes` : 'Unsure', inline: true },
                    { name: 'Task', value: task, inline: true },
                ],
            };
            await interaction.reply({ embeds: [embed] });
        } else {
            const embed = {
                color: 0xF66151,
                title: 'You have no set task, use `/start` to start one!',
            };
            await interaction.reply({ embeds: [embed] });
        }
    },
};
