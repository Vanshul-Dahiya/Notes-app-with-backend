const Note = require("../models/Notes");
const mongoose = require("mongoose");

// get dashboard
exports.dashboard = async (req, res) => {
  let perPage = 12;
  let page = req.query.page || 1;

  const locals = {
    title: "Dashboard",
    description: "Free Notes app",
  };

  try {
    Note.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    res.render("dashboard/index", {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};
