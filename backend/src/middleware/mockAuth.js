export const mockAuth = (req, res, next) => {
  req.user = { sub: "ClerkID123" };
  next();
};
