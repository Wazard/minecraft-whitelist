// deploy-commands.js
import 'dotenv/config';
import { REST, Routes, SlashCommandBuilder } from 'discord.js';

const commands = [
  new SlashCommandBuilder()
    .setName('whitelist')
    .setDescription('Whitelist utilities')
    .addSubcommand(sub =>
      sub
        .setName('setup')
        .setDescription('Generate autowhitelist.json5 for AutoWhitelist')
        .addRoleOption(opt =>
          opt
            .setName('role')
            .setDescription('Role to whitelist')
            .setRequired(true)
        )
    )
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

async function main() {
  try {
    console.log('📡 Registering global slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('✅ Slash commands registered globally.');
    console.log('⚠️ Note: Global commands can take up to 1 hour to appear.');
  } catch (err) {
    console.error(err);
  }
}

main();