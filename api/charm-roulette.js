

export default function handler(req, res) {
    const links = [
      'https://discord.com/channels/@me/1278908744335626370/1378900109236113528',
      'https://discord.com/channels/@me/1278908744335626370/1299984795274711130',
      'https://discord.com/channels/@me/1278908744335626370/1375160685473959967'
    ];
  
    const pick = links[Math.floor(Math.random() * links.length)];
  
    res.writeHead(302, { Location: pick });
    res.end();
  }
  