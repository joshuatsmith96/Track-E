import "dotenv/config";
import { verifyToken } from "@clerk/backend";

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    const verifiedToken = await verifyToken(token, {
      jwtKey: process.env.CLERK_JWT_KEY,
      authorizedParties: ["http://localhost:5173"],
    });

    req.user = { sub: verifiedToken.sub };
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
