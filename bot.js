const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'OposicionesPolicia.aternos.me',
        port: 32679,
        username: 'BOT24H',
        version: '1.20.4' // Configurado para versiones 1.20.x/26.3
    });

    bot.on('spawn', () => {
        console.log('[NPC] El bot ha aparecido correctamente en el mapa.');
        
        // Si tu servidor requiere contraseña al entrar, quita las // de la línea de abajo:
        // setTimeout(() => bot.chat('/login TuContraseña'), 3000);
    });

    bot.on('login', () => {
        console.log('[NPC] Conexión establecida con el servidor.');
    });

    // Rutina Anti-AFK segura (salto suave y movimiento de cámara cada 30 segundos)
    setInterval(() => {
        if (!bot || !bot.entity) return;

        try {
            // Salto controlado
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 400);

            // Giro de cámara ligero para demostrar actividad al servidor
            const yaw = bot.entity.yaw + 0.5;
            const pitch = bot.entity.pitch;
            bot.look(yaw, pitch, true);

            console.log('[NPC] Acción anti-AFK ejecutada.');
        } catch (err) {
            console.log(`[NPC] Error en rutina anti-AFK: ${err.message}`);
        }
    }, 30000);

    // Reintentar conexión automáticamente si el servidor lo expulsa o se reinicia
    bot.on('end', (reason) => {
        console.log(`[NPC] Desconectado por: ${reason}. Reintentando en 15 segundos...`);
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => console.log(`[NPC] Error de red: ${err.message}`));
}

createBot();
