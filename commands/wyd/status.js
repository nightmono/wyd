const { SlashCommandBuilder } = require('discord.js');
const { userExists, getTask } = require('./../../tasks.js');

module.exports = {
    category: 'wyd',
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Check the status of your current task'),
    async execute(interaction) {
        const userID = interaction.user.id;

        if (userExists(userID)) {
            const userTask = getTask(userID);
            const duration = userTask.duration;
            const task = userTask.task;
            const timePassed = userTask.timePassed;

            let title;
            if (duration == -1) {
                title = `It has been ${timePassed} minutes`;
            } else {
                title = `It has been ${timePassed} out of ${duration} minutes`;
            }

            const embed = {
                color: 0x2A7BDE,
                title: title,
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
