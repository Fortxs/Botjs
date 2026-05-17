const mineflayer = require('mineflayer');

function iniciarBot() {

  const bot = mineflayer.createBot({
    host: 'SemiAnarquia8.aternos.me',
    port: 38669,
    username: 'BotSemiAnarquia',
    version: '1.16.5'
  });

  bot.on('login', () => {
    console.log('✅ Bot conectado!');
  });

  bot.on('spawn', () => {
    console.log('🎮 Bot entrou no servidor!');

    // Coloca em spectator
    setTimeout(() => {
      bot.chat('/gamemode spectator BotSemiAnarquia');
    }, 3000);

    let frente = true;

    // TP a cada 5 minutos
    setInterval(() => {
      if (!bot.entity) return;

      const pos = bot.entity.position;

      let x = pos.x;
      let y = pos.y;
      let z = pos.z;

      if (frente) {
        z += 1;
      } else {
        z -= 1;
      }

      frente = !frente;

      bot.chat(`/tp BotSemiAnarquia ${x.toFixed(1)} ${y.toFixed(1)} ${z.toFixed(1)}`);

    }, 300000);
  });

  // Detecta criativo
  bot.on('playerUpdated', (player) => {
    if (!player || !player.username) return;

    if (player.username === bot.username) return;

    // 1 = Criativo
    if (player.gamemode === 1) {

      bot.chat(`/kill ${player.username}`);

      setTimeout(() => {
        bot.chat(`/ban ${player.username} SEM CRIATIVO NO SERVIDOR`);
      }, 1000);
    }
  });

  bot.on('kicked', (reason) => {
    console.log('❌ Kickado:', reason);
  });

  bot.on('error', (err) => {
    console.log('⚠️ Erro:', err.message);
  });

  // Reconecta sozinho
  bot.on('end', () => {
    console.log('🔄 Reconectando em 10 segundos...');

    setTimeout(() => {
      iniciarBot();
    }, 10000);
  });
}

iniciarBot();
