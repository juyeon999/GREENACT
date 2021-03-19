//userTest, db로 구현 필요
const users = [{ username: "green@gmail.com", password: "123123" }];

const login = (request, response) => {
  const { username, password } = request.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  user !== undefined ? response.status(200) : response.status(400);
  console.log(JSON.stringify(user));
  response.json(JSON.stringify(user));
};

module.exports = login;
