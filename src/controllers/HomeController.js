class HomeController {
  async index(request, response) {
    response.json('Index');
  }
}

export default new HomeController();
