const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Client } = require("pg");

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const PG_URI = process.env.PG_URI;

const client = new Client({
  connectionString: PG_URI,
});

client.connect();

const app = express();
app.use(express.json());

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Access Denied, No Token Provided");
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
};

// Get all products route
app.get("/products", verifyToken, (req, res) => {
  let query;
  if (req.user.permission === "read_product") {
    query = "SELECT * FROM products WHERE active = true";
  } else if (req.user.permission === "admin") {
    query = "SELECT * FROM products";
  } else {
    return res.status(403).send("Access Denied, Not Authorized");
  }
  client.query(query, (err, result) => {
    if (err) throw err;
    res.send(result.rows);
  });
});

// Get a single product route
app.get("/products/:id", verifyToken, (req, res) => {
  let query;
  if (req.user.permission === "read_product") {
    query = "SELECT * FROM products WHERE active = true AND id = $1";
  } else if (req.user.permission === "admin") {
    query = "SELECT * FROM products WHERE id = $1";
  } else {
    return res.status(403).send("Access Denied, Not Authorized");
  }
  const id = req.params.id;
  client.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send(result.rows[0]);
  });
});

// Add a new product route
app.post("/products", async (req, res) => {
    try {
      const decoded = jwt.verify(req.headers.authorization.split(" ")[1], SECRET_KEY);
      if (!decoded.permissions.includes("manage_product")) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { name, description, price } = req.body;
      const newProduct = await pool.query("INSERT INTO products (name, description, price, status) VALUES ($1, $2, $3, $4) RETURNING *", [name, description, price, "active"]);
      return res.status(201).json(newProduct.rows[0]);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ message: "Server error" });
    }
  });
  
  // Update a product route
  app.put("/products/:id", async (req, res) => {
    try {
      const decoded = jwt.verify(req.headers.authorization.split(" ")[1], SECRET_KEY);
      if (!decoded.permissions.includes("manage_product")) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { name, description, price } = req.body;
      const product = await pool.query("UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 AND status = $5 RETURNING *", [name, description, price, req.params.id, "active"]);
      if (!product.rowCount) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product.rows[0]);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ message: "Server error" });
    }
  });
  
  // Soft delete a product route
  app.delete("/products/:id", async (req, res) => {
    try {
      const decoded = jwt.verify(req.headers.authorization.split(" ")[1], SECRET_KEY);
      if (!decoded.permissions.includes("manage_product")) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const product = await pool.query("UPDATE products SET status = $1 WHERE id = $2 AND status = $3 RETURNING *", ["deleted", req.params.id, "active"]);
      if (!product.rowCount) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({ message: "Product deleted" });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ message: "Server error" });
    }
  });
  

  //Hard delete

  app.delete("/products/:id/hard", async (req, res) => {
    try {
      const authorizationHeader = req.headers["authorization"];
      if (!authorizationHeader)
        return res.status(401).json({ error: "Unauthorized" });
  
      const token = authorizationHeader.split(" ")[1];
      jwt.verify(token, SECRET_KEY, async (error, decoded) => {
        if (error) return res.status(401).json({ error: "Unauthorized" });
        if (!decoded.admin)
          return res.status(403).json({ error: "Forbidden" });
  
        const product = await pool.query(
          "SELECT * FROM products WHERE product_id = $1",
          [req.params.id]
        );
        if (!product.rows[0])
          return res.status(404).json({ error: "Product not found" });
  
        await pool.query("DELETE FROM products WHERE product_id = $1", [
          req.params.id
        ]);
        return res.status(200).json({ message: "Product deleted successfully" });
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });