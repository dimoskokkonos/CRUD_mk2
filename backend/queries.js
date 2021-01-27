const {Pool} = require('pg'); 

const pool = new Pool({ 
    user: 'postgres', 
    host: 'localhost', 
    database: 'backend', 
    password: 'temp', 
    dialect: 'postgres', 
    port: 5432,
    max: 30
}); 

const getAll = async (request, response) => {
  const client = await pool.connect();

  try {
    const results = await client.query('SELECT * FROM Employee ORDER BY id ASC')

    client.end();
    response.status(200).json(results.rows)

  } catch (error) {
    throw error;

  } 
   
}

const getEntryById = async (request, response) => {
  const client = await pool.connect();

  try {
    const id = parseInt(request.params.id)

    const results = await client.query('SELECT * FROM Employee WHERE id = $1', [id])

    client.end();
    response.status(200).json(results.rows)

  } catch (error) {
    throw error;

  }   
}

const createEntry = async (request, response) => {
  const client = await pool.connect();

  try {
    const {id, last_name, first_name, is_active, date_of_birth } = request.body

    const results = await client.query(
      'INSERT INTO Employee (last_name, first_name, is_active, date_of_birth) VALUES ($1, $2, $3, $4)', 
      [last_name, first_name, is_active, date_of_birth]
    )
    client.end();
    response.status(200).send(`Employee added with ID: ${id}`)

  } catch (error) {
    throw error;

  }     
}

const updateEntry= async (request, response) => {
  const client = await pool.connect();

  try {
    const id = parseInt(request.params.id)
    const { last_name, first_name, is_active, date_of_birth } = request.body


    await client.query('UPDATE Employee SET last_name = $1, first_name = $2, is_active = $3, date_of_birth = $4  WHERE id = $5', [last_name, first_name, is_active, date_of_birth, id])

    client.end();
    response.status(200).send(`Employee modified with ID: ${id}`)

  } catch (error) {
    throw error;

  }   
}

const deleteEntry = async (request, response) => {
  const client = await pool.connect();

  try {
    const id = parseInt(request.params.id)

    await client.query('DELETE FROM Employee WHERE id = $1', [id])
    
    response.status(200).send(`Employee deleted with ID: ${id}`)
    client.end();

  } catch (error) {
    throw error;

  }    
}

module.exports = {
    getAll,
    getEntryById,
    createEntry,
    updateEntry,
    deleteEntry,
}
