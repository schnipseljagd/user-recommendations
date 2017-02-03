var chakram = require('chakram'),
    expect = chakram.expect;

var api_endpoint = process.env.API_ENDPOINT;

const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

const buildUri = (resource) => {
  return api_endpoint + "/" + resource;
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
  var aUser,
  aPlace;

  before("set up default user and a place", () => {
    return createUser('some unkown user')
      .then(response => aUser = response.body)
      .then(response => createPlace(response.id, 'foo restaurant'))
      .then(response => aPlace = response.body);
  });

  it("should create a recommendation to a place created by another user", () => {
    return createUser('foobar')
      .then(response => createRecommendation(aPlace.id, response.body.id))
      .then(response => readRecommendationsByUserId(response.body.userId))
      .then(response => {
        body = response.body;
        expect(response).to.have.status(200);
        expect(body).to.have.lengthOf(1);
        expect(body[0].userId).to.not.be.empty;
        expect(body[0].placeId).to.be == aPlace.id;
      });
  });

  it("should create a recommendation when a user creates a place", () => {
    const checkRecommendations = () => {
      return readRecommendationsByUserId(aUser.id)
        .then(response => {
          if (response.body.length === 0) {
            console.log('response:' + JSON.stringify(response.body))
              return delay(1000).then(() => checkRecommendations());
          }
          body = response.body;
          expect(response).to.have.status(200);
          expect(body).to.have.lengthOf(1);
          expect(body[0].userId).to.be == aUser.id;
          expect(body[0].placeId).to.be == aPlace.id;
        });
    };
    return checkRecommendations();
  });
})
