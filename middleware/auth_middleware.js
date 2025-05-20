// middleware/auth_middleware.js

import dotenv from "dotenv";
dotenv.config();

// Middleware to validate the API Key function
export const validateApiKey = (req, res, next) => {
  req.headers["x-api-key"] = process.env.API_KEY;
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    console.warn("API key missing in request headers");
    return res.status(401).json({ message: "Unauthorized: API key missing" });
  }
  if (apiKey !== process.env.API_KEY) {
    console.warn("Invalid API key provided");
    return res.status(401).json({ message: "Unauthorized: Invalid API key" });
  }
  next();
};