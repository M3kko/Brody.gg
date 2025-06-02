

export default function handler(req, res) {
    const links = [
      'discord://discord.com/channels/@me/1278908744335626370/1299984795274711130',
      

    ];
  
    const pick = links[Math.floor(Math.random() * links.length)];
  
    res.writeHead(302, { Location: pick });
    res.end();
  }
  