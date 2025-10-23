const { Clerk } = require("@clerk/clerk-sdk-node");

const clerk = new Clerk({
  apiKey: process.env.CLERK_PUBLISHABLE_KEY,
});

module.exports = clerk;
