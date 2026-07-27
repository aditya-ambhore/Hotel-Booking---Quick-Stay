import { getAuth } from "@clerk/express";

export const requireAuth = (req, res, next) => {
  const { userId } = getAuth(req);

  console.log("UserId:", userId);

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  req.userId = userId;

  next();
};
