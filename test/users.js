var chakram = require('chakram'),
    expect = chakram.expect;

const buildUri = (resource) => {
  return "https://hg15e295u8.execute-api.eu-west-1.amazonaws.com/dev/" + resource;
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

const createRecommendation = (userId, placeId) => {
  return chakram.post(buildUri('recommendations'), {"userId": userId, "placeId": placeId});
};

const readRecommendationsByUserId = (userId) => {
  return chakram.get(buildUri('recommendations/' + userId));
};

describe("users resource", () => {
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

describe("places resource", () => {
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
        expect(body.createdBy).to.not.be.empty;
      });
  });
})

describe("recommendations resource", () => {
  it("should create a recommendation by a user", function () {
    this.timeout(10000);
    return createUser('foobar')
      .then(response => createPlace(response.body.id, 'foo restaurant'))
      .then(response => createRecommendation(response.body.createdBy, response.body.id))
      .then(response => readRecommendationsByUserId(response.body.userId))
      .then(response => {
        body = response.body;
        expect(body).to.have.lengthOf(1);
        expect(body[0].userId).to.not.be.empty;
        expect(body[0].placeId).to.not.be.empty;
        expect(response).to.have.status(200);
      });
  });

  it.skip("should recommend a place created by another user", () => {
  });
})
