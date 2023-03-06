// renders from Views folder

// get homepage
exports.homepage = async (req, res) => {
  const locals = {
    title: "Notes",
    description: "Free Notes app",
  };
  res.render("index", {
    locals,
    layout:'../views/layouts/front_page.ejs'
  });
};
// get about
exports.about = async (req, res) => {
  const locals = {
    title: "About - Notes",
    description: "Free Notes app",
  };
  res.render("about", locals);
};
