class NewsController {
  index(req, res) {
    res.render("news");
  }

  show(req, res) {
    res.send("NESCAFE");
  }
}

module.exports = new NewsController();
