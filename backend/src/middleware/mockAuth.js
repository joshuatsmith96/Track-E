export const mockAuth = (req, res, next) => {
  req.user = { sub: "UniqueID123" };
  next();
};
