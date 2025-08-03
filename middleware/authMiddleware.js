export const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  // Store the requested URL to redirect after successful login
  req.session.redirectTo = req.originalUrl;
  res.redirect("/login");
};
