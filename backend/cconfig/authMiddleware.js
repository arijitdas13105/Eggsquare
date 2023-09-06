



const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization');

  try {
    if (!token) {
      return res.status(401).json({ error: "Unauthorized, missing token" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Store the customer ID in the request for later use
    req.customerId = decoded.customerId;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized, invalid token" });
  }
};

module.exports = verifyToken;
//     req.customerId is where we keep the customer ID after we extract it from the token in the request.
// decoded.customerId is the actual customer ID we find inside the decoded token, which we later store in req.customerId.
