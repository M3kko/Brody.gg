

export default function handler(req, res) {
    const links = [
      'discord://discord.com/channels/@me/1278908744335626370/1299984795274711130',
      'discord://discord.com/channels/@me/1278908744335626370/1385011860499071091',
      'discord://discord.com/channels/@me/1278908744335626370/1385014014647599176',
      'discord://discord.com/channels/@me/1278908744335626370/1281486138191908865',
      'discord://discord.com/channels/@me/1278908744335626370/1281474654820630599',
      'discord://discord.com/channels/@me/1278908744335626370/1279676220732211221',
      'discord://discord.com/channels/@me/1278908744335626370/1280023701051539572', 
      'discord://discord.com/channels/@me/1278908744335626370/1285363816309457009',
      'discord://discord.com/channels/@me/1278908744335626370/1285377350552518697',
      'discord://discord.com/channels/@me/1278908744335626370/1286362929486102640',
      'discord://discord.com/channels/@me/1278908744335626370/1288111239477723259',
      'discord://discord.com/channels/@me/1278908744335626370/1291484748748820480',
      'discord://discord.com/channels/@me/1278908744335626370/1292421078290927667',
      'discord://discord.com/channels/@me/1278908744335626370/1295326165795475538',
      'discord://discord.com/channels/@me/1278908744335626370/1296063111903711323',
      'discord://discord.com/channels/@me/1278908744335626370/1296067586978480139',
      'discord://discord.com/channels/@me/1278908744335626370/1296315950106152971',
      'discord://discord.com/channels/@me/1278908744335626370/1297696056175366214',
      'discord://discord.com/channels/@me/1278908744335626370/1297735381428469831',
      'discord://discord.com/channels/@me/1278908744335626370/1298522441035026484',
      'discord://discord.com/channels/@me/1278908744335626370/1299090207466983444',
      'discord://discord.com/channels/@me/1278908744335626370/1299095767792877682',
      'discord://discord.com/channels/@me/1278908744335626370/1299171838269853807',
      'discord://discord.com/channels/@me/1278908744335626370/1299229226955702293',

    ];
  
    const pick = links[Math.floor(Math.random() * links.length)];
  
    res.writeHead(302, { Location: pick });
    res.end();
  }
  