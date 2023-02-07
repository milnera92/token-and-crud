const jwt = require("jsonwebtoken");
const { Client } = require("pg");
require("dotenv").config();
const pgPassword = process.env.PG_PASSWORD;

const client = new Client({
  connectionString: `postgres://morqftzh:${pgPassword}@jelani.db.elephantsql.com/morqftzh`
});

const SECRET_KEY = process.env.SECRET_KEY;
const expiresIn = "10m";

// Endpoint A: Generate a token with read_product permission
exports.generateReadToken = async (req, res) => {
  try {
    const token = jwt.sign({ permission: "read_product" }, SECRET_KEY, {
      expiresIn,
    });

    await storeToken(token);
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Endpoint B: Generate a token with manage_product permission
exports.generateManageToken = async (req, res) => {
  try {
    const token = jwt.sign({ permission: "manage_product" }, SECRET_KEY, {
      expiresIn,
    });

    await storeToken(token);
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Endpoint C: Generate a token with both read_product and manage_product permissions
exports.generateReadManageToken = async (req, res) => {
  try {
    const token = jwt.sign(
      { permission: ["read_product", "manage_product"] },
      SECRET_KEY,
      {
        expiresIn,
      }
    );

    await storeToken(token);
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Endpoint D: Generate a token with admin permission
exports.generateAdminToken = async (req, res) => {
  try {
    const token = jwt.sign({ permission: "admin" }, SECRET_KEY, {
      expiresIn,
    });

    await storeToken(token);
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Store the generated token in the database
const storeToken = async (token) => {
  await client.connect();

  const query = `
    INSERT INTO tokens (token)
    VALUES ($1)
  `;

  await client.query(query, [token]);
  await client.end();
};