const { SlashCommandBuilder } = require('discord.js');
const { userExists, setTask, getTask } = require('./../../tasks.js');

module.exports = {
    category: 'wyd',
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Start a new task')
        .addStringOption(option =>
            option
                .setName('task')
                .setDescription('The task you want to complete')
                .setRequired(true),
        )
        .addStringOption(option =>
            option
                .setName('duration')
                .setDescription('How long you think the task will take')
                .setRequired(true)
                .addChoices(
                    { name: 'Not sure', value: '-1' },
                    { name: 'About 15 mins', value: '15' },
                    { name: 'Half an hour tops', value: '30' },
                    { name: 'An hour maybe', value: '60' },
                    { name: 'Multiple hours', value: '180' },
                ),
        ),
    async execute(interaction) {
        const userID = interaction.user.id;

        if (userExists(userID)) {
            const embed = {
                color: 0xF66151,
                title: 'You already have a task going!',
                description: 'Use `/status` for more details',
                fields: [
                    { name: 'Task', value: getTask(userID).task },
                ],
            };
            await interaction.reply({ embeds: [embed] });
        } else {
            const task = interaction.options.getString('task');
            const duration = interaction.options.getString('duration');
            setTask(userID, task, duration, interaction.channel.id);
            const embed = {
                color: 0x33D17A,
                title: 'Created new task!',
                description: 'I will ask how you\'re doing in 15 minutes',
                fields: [
                    { name: 'Duration', value: (duration > 0) ? `${duration} minutes` : 'Unsure', inline: true },
                    { name: 'Task', value: task, inline: true },
                ],
            };
            await interaction.reply({ embeds: [embed] });
        }
    },
};
