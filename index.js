// index.js
import 'dotenv/config';
import { Client, GatewayIntentBits, Events } from 'discord.js';
import { execute as whitelistSetupExecute } from './commands/whitelist-setup.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds // Slash commands only need this
  ]
});

client.once(Events.ClientReady, (c) => {
  console.log(`✅ Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== 'whitelist') return;

  const sub = interaction.options.getSubcommand();
  if (sub === 'setup') {
    try {
      await whitelistSetupExecute(interaction);
    } catch (err) {
      console.error(err);
      if (!interaction.replied) {
        await interaction.reply({ content: '❌ Something went wrong.', ephemeral: true });
      }
    }
  }
});

client.login(process.env.TOKEN);