// middleware/ownerOrAdmin.js
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const victim = await User.findById(req.params.userid);
    if (!victim) return res.status(404).json({ msg: "User not found" });

    /*  Allow only:
          – site-wide admins, or
          – the specific admin who created this user
    */
    const requester = req.user; // set by your auth middleware
    //const isOwner = victim.created_by?.equals(requester.id);
    const isOwner = victim.created_by === requester.id;
    const isAdmin = requester.admin_status === true;

    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ msg: "You can only delete users you created" });
    }

    // Attach victim doc so the route does not query again
    req.victim = victim;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
