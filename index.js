const express = require("express");
const tokens = require("./token");

const app = express();
const port = process.env.PORT || 5000;

//this is for testing the token service
//go to http://localhost:5000/generate-read-token to test token generation. 
//Repeat with /generate-manage-token, /generate-read-manage-token, etc..

app.get("/generate-read-token", tokens.generateReadToken);
app.get("/generate-manage-token", tokens.generateManageToken);
app.get("/generate-read-manage-token", tokens.generateReadManageToken);
app.get("/generate-admin-token", tokens.generateAdminToken);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});