import { verifyToken } from "@clerk/clerk-sdk-node";

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const session = await verifyToken(token);
    req.user = session;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
    console.error(err);
  }
};
