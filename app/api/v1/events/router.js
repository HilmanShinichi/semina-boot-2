const express = require("express");
const router = express();
const { create, index, find, update, destroy, changeStatus } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.get("/events", authenticateUser, authorizeRoles("organizer","admin","owner"), index);
router.get("/events/:id", authenticateUser, authorizeRoles("organizer"), find);
router.put(
  "/events/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  update
);
router.delete(
  "/events/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  destroy
);

router.put(
  '/events/:id/status',
  authenticateUser,
  authorizeRoles('organizer'),
  changeStatus
);
router.post("/events", authenticateUser, authorizeRoles("organizer"), create);

module.exports = router;
