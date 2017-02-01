var chakram = require('chakram'),
    expect = chakram.expect;

const buildUri = (resource) => {
  return "https://q5tpgkykzg.execute-api.us-east-1.amazonaws.com/dev/" + resource;
};

const createUser = (resource, name) => {
  return chakram.post(buildUri(resource), {"name": name});
};

const readAllUser = (resource, name) => {
  return chakram.get(buildUri('users'));
};

describe("/users resource", () => {
  it("should return a user response", () => {
    return createUser('users', 'foobar')
      .then(response => {
        body = response.body;
        expect(response).to.have.status(200);
        expect(body.name).to.be.eq('foobar');
        expect(body.id).to.not.be.empty;
      });
  });

  it("should create a new user", () => {
    return createUser('users', 'foobar')
      .then(response => readAllUser('users'))
      .then(response => {
        expect(response).to.have.json('[0].name', 'foobar');
        expect(response).to.have.status(200);
      });
  });
})
