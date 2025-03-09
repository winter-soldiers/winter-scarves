const client = require('./client.cjs');
const {Client, createScarves, getAllScarves, getScarvesByMaterial, getScarvesByPrice, getScarvesByColor, getScarvesById, updateScarves, deleteScarves } = require('./scarves.cjs');

const dropTables = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS scarves
    `);
  } catch(err) {
    console.log(err);
  }
}

//create tables
const createTables = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS scarves;
      CREATE TABLE scarves (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        material VARCHAR(30) NOT NULL,
        price INTEGER NOT NULL,
        color VARCHAR(30) NOT NULL,
        description VARCHAR(255) NOT NULL
      )
    `);
  } catch(err) {
    console.log(err);
  }
}
//create scarves
const createInitialScarves = async () => {
  try {
    await client.query(`
      INSERT INTO scarves (name, material, price, color, description)
      VALUES 
        ('Winter Warmth', 'wool', 25, 'red', 'A warm winter scarf'),
        ('Summer Breeze', 'cotton', 15, 'blue', 'A light summer scarf'),
        ('Evening Elegance', 'silk', 35, 'green', 'An elegant evening scarf'),
        ('Luxury Wrap', 'cashmere', 45, 'purple', 'A luxurious winter scarf'),
        ('Summer Light', 'linen', 55, 'white', 'A light and airy summer scarf')
    `);
  } catch(err) {
    console.log(err);
  }
}
//conect to db
const syncAndSeed = async () => {
  await client.connect();
  console.log('CONNECTED TO THE DB');
  
  console.log('DROPPING TABLES');
  await dropTables();
  console.log('TABLES DROPPED');
//
  console.log('CREATING TABLE');
  await createTables();
  console.log('TABLE CREATED');

  //add data 
  console.log('CREATING SCARVES');
  await createInitialScarves();
  console.log('SCARVES CREATED');

  const scarveslist = await getAllScarves();
  console.log('SCARVES LIST', scarveslist);
// 
  const scarvesByMaterial = await getScarvesByMaterial('wool');
  console.log('SCARVES BY MATERIAL', scarvesByMaterial);

//
  const scarvesByPrice = await getScarvesByPrice(25);
  console.log('SCARVES BY PRICE', scarvesByPrice);

//
  const scarvesByColor = await getScarvesByColor('red');
  console.log('SCARVES BY COLOR', scarvesByColor);

//
  const scarvesById = await getScarvesById(1);
  console.log('SCARVES BY ID', scarvesById);

//
  const updatedScarve = await updateScarves(1, { price: 30 });
  console.log('UPDATED SCARVE', updatedScarve);

//
  const deletedScarve = await deleteScarves(1);
  console.log('DELETED SCARVE', deletedScarve);


  await client.end();
  console.log('DISCONNECTED FROM THE DB');
};

syncAndSeed();