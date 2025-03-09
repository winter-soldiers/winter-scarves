const client = require('./client.cjs');

const createScarves = async (material, price, color, description) => {
  try {
    await client.query(`
      INSERT INTO scarves (material, price, color, description)
      VALUES ($1, $2, $3, $4)
    `, [material, price, color, description]);
    return true;
  } catch(err) {
    console.error('Error creating scarf:', err);
    return false;
  }
}

const getAllScarves = async () => {
  try {
    const { rows: scarves } = await client.query(`
      SELECT * FROM scarves
    `);
    return scarves;
  } catch(err) {
    console.error('Error getting all scarves:', err);
    return [];
  }
}

const getScarvesByMaterial = async (material) => {
  try {
    const { rows: scarves } = await client.query(`
      SELECT * FROM scarves WHERE material = $1
    `, [material]);
    return scarves;
  } catch(err) {
    console.error('Error getting scarves by material:', err);
    return [];
  }
}

const getScarvesByPrice = async (price) => {
  try {
    const { rows: scarves } = await client.query(`
      SELECT * FROM scarves WHERE price = $1
    `, [price]);
    return scarves;
  } catch(err) {
    console.error('Error getting scarves by price:', err);
    return [];
  }
}

const getScarvesByColor = async (color) => {
  try {
    const { rows: scarves } = await client.query(`
      SELECT * FROM scarves WHERE color = $1
    `, [color]);
    return scarves;
  } catch(err) {
    console.error('Error getting scarves by color:', err);
    return [];
  }
}

const getScarvesById = async (id) => {
  try {
    const { rows: [scarf] } = await client.query(`
      SELECT * FROM scarves WHERE id = $1
    `, [id]);
    return scarf || null;  // Return null if no scarf found
  } catch(err) {
    console.error(`Error getting scarf by id ${id}:`, err);
    return null;
  }
}

const deleteScarves = async (id) => {
  try {
    const { rowCount } = await client.query(`
      DELETE FROM scarves 
      WHERE id = $1
      RETURNING *
    `, [id]);
    return rowCount > 0;  // Returns true if scarf was deleted, false if id not found
  } catch(err) {
    console.error(`Error deleting scarf with id ${id}:`, err);
    return false;
  }
}
 // update scarf
const updateScarves = async (id, updates) => {
  try {
    const setColumns = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    
    const values = [id, ...Object.values(updates)];
    
    const { rows: [scarf] } = await client.query(`
      UPDATE scarves 
      SET ${setColumns}
      WHERE id = $1
      RETURNING *
    `, values);
    
    return scarf || null;
  } catch(err) {
    console.error(`Error updating scarf with id ${id}:`, err);
    return null;
  }
}

module.exports = {
  createScarves,
  getAllScarves,
  getScarvesByMaterial,
  getScarvesByPrice,
  getScarvesByColor,
  getScarvesById,
  updateScarves,
  deleteScarves
}