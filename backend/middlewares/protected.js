import jwt from "jsonwebtoken";

const Protected = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res
        .status(404)
        .json({ success: false, message: "No token found. Please login." });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Only admins are allowed to access this route.",
    });
  }
};

export { Protected, adminOnly };
