var chakram = require('chakram'),
    expect = chakram.expect;

const buildUri = (resource) => {
  return "https://q5tpgkykzg.execute-api.us-east-1.amazonaws.com/dev/" + resource;
};

const createUser = (name) => {
  return chakram.post(buildUri('users'), {"name": name});
};

const readAllUser = (name) => {
  return chakram.get(buildUri('users'));
};

const createPlace = (userId, title) => {
  return chakram.post(buildUri('places'), {"userId": userId, "title": title});
};

const readAllPlaces = (title) => {
  return chakram.get(buildUri('places'));
};

describe("/users resource", () => {
  it("should create a new user", () => {
    return createUser('foobar')
      .then(response => readAllUser())
      .then(response => {
        expect(response).to.have.json('[0].name', 'foobar');
        expect(response).to.have.status(200);
      });
  });

  it("should return the created user", () => {
    return createUser('foobar')
      .then(response => {
        body = response.body;
        expect(response).to.have.status(200);
        expect(body.name).to.be.eq('foobar');
        expect(body.id).to.not.be.empty;
      });
  });
})

describe("/places resource", () => {
  it("should create a new place", () => {
    return createUser('foobar')
      .then(response => createPlace(response.body.id, 'foo restaurant'))
      .then(response => readAllPlaces())
      .then(response => {
        expect(response).to.have.json('[0].title', 'foo restaurant');
        expect(response).to.have.status(200);
      });
  });

  it("should return a place response", () => {
    return createUser('foobar')
      .then(response => createPlace(response.body.id, 'foo restaurant'))
      .then(response => {
        body = response.body;
        expect(response).to.have.status(200);
        expect(body.title).to.be.eq('foo restaurant');
        expect(body.id).to.not.be.empty;
      });
  });
})
