// commands/whitelist-setup.js
import { AttachmentBuilder } from 'discord.js';
import 'dotenv/config'; // so we can read TOKEN from .env

export async function execute(interaction) {
    if (interaction.user.id !== '365943186599706625') {
        return interaction.reply({ content: 'You are not allowed to run this command.', ephemeral: true });
      }

  const role = interaction.options.getRole('role');
  const serverId = interaction.guild.id;

  // Pull the bot token from your .env
  const botToken = process.env.TOKEN;

  const config = `{
  "token": "${botToken}",
  "discord_server_id": "${serverId}",
  "entries": [
    {
      "roles": ["${role.id}"],
      "type": "whitelist"
    }
  ]
}`;

  const file = new AttachmentBuilder(Buffer.from(config, 'utf8'), {
    name: 'autowhitelist.json5'
  });

  await interaction.reply({
    content: `📝 Generated config for role: ${role.name} in server: ${interaction.guild.name}`,
    files: [file],
    ephemeral: true
  });
}