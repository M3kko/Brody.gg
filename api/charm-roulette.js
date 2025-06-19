

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
      'discord://discord.com/channels/@me/1278908744335626370/1299506258814177280',
      'discord://discord.com/channels/@me/1278908744335626370/1299550724816109670',
      'discord://discord.com/channels/@me/1278908744335626370/1299976017527439445',
      'discord://discord.com/channels/@me/1278908744335626370/1299978069913899060',
      'discord://discord.com/channels/@me/1278908744335626370/1300139073599705089',
      'discord://discord.com/channels/@me/1278908744335626370/1300273934691995648',
      'discord://discord.com/channels/@me/1278908744335626370/1300307785346580511',
      'discord://discord.com/channels/@me/1278908744335626370/1300316863737364564',
      'discord://discord.com/channels/@me/1278908744335626370/1300488126921179259',
      'discord://discord.com/channels/@me/1278908744335626370/1300944666577076264',
      'discord://discord.com/channels/@me/1278908744335626370/1301265934618726461',
      'discord://discord.com/channels/@me/1278908744335626370/1301639919386628167',
      'discord://discord.com/channels/@me/1278908744335626370/1301725347850748046',
      'discord://discord.com/channels/@me/1278908744335626370/1302181202496847914',
      'discord://discord.com/channels/@me/1278908744335626370/1302901044891746327',
      'discord://discord.com/channels/@me/1278908744335626370/1303910369827360888',
      'discord://discord.com/channels/@me/1278908744335626370/1302831856391290912',
      'discord://discord.com/channels/@me/1278908744335626370/1285936094491447358',
      'discord://discord.com/channels/@me/1278908744335626370/1299518803243438212',
      'discord://discord.com/channels/@me/1278908744335626370/1300565976563318837',
      'discord://discord.com/channels/@me/1278908744335626370/1306839473509630023',
      'discord://discord.com/channels/@me/1278908744335626370/1311212299360669726',
      'discord://discord.com/channels/@me/1278908744335626370/1312676563451646012',
      'discord://discord.com/channels/@me/1278908744335626370/1314132490688008212',
      'discord://discord.com/channels/@me/1278908744335626370/1331146908181336114',
      'discord://discord.com/channels/@me/1278908744335626370/1335502190449786912',
      'discord://discord.com/channels/@me/1278908744335626370/1354678666558308413',
      'discord://discord.com/channels/@me/1278908744335626370/1375714467802906666',
      'discord://discord.com/channels/@me/1278908744335626370/1307271669991211128',
      'discord://discord.com/channels/@me/1278908744335626370/1377765062470799420',
      'discord://discord.com/channels/@me/1278908744335626370/1378199417722503253',
      'discord://discord.com/channels/@me/1278908744335626370/1378629250932015115',
      'discord://discord.com/channels/@me/1278908744335626370/1383702585562763407',
      'discord://discord.com/channels/@me/1278908744335626370/1341875609533550766',
      'discord://discord.com/channels/@me/1278908744335626370/1340184506749157407',
      'discord://discord.com/channels/@me/1278908744335626370/1322009108726939743',
      'discord://discord.com/channels/@me/1278908744335626370/1322022323259441172',
      'discord://discord.com/channels/@me/1278908744335626370/1321412010461892640',




    ];
  
    const pick = links[Math.floor(Math.random() * links.length)];
  
    res.writeHead(302, { Location: pick });
    res.end();
  }
  