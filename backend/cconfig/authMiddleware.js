

//authMiddlewate 

const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: "Unauthorized, missing token" });
  }

  try {
    // const decoded = await jwt.verify(token, "arijitdas");
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

//     req.customerId is where we keep the customer ID after we extract it from the token in the request.
// decoded.customerId is the actual customer ID we find inside the decoded token, which we later store in req.customerId.

    req.customerId = decoded.customerId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized, invalid token" });
  }
};

module.exports = verifyToken;

