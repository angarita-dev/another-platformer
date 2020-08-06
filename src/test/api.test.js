import Api from '../classes/api';

beforeEach(() => {
  jest.clearAllMocks();
});

test('Submit score correctly', async () => {
  fetch.mockResponse(JSON.stringify({ result: "Leaderboard score created correctly." }));

  const name = 'TestingUser';
  const score = 4;

  const api_response = await Api.saveScore(name, score);

  expect(api_response).toEqual(true)
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('Submit score error', async () => {
  fetch.mockReject(() => Promise.reject("API is down"));

  const name = 'TestingUser';
  const score = 4;

  const api_response = await Api.saveScore(name, score);

  expect(api_response).toEqual(false)
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('Get data', async () => {
  fetch.mockResponse(JSON.stringify({ result: [
    { name: 'First', score: 3 },
    { name: 'Second', score: 2 },
    { name: 'Third', score: 1 }
  ]}));

  const orderDataSpy = jest.spyOn(Api, 'orderData');
  const api_response = await Api.getData();

  expect(api_response).toEqual([
    { name: 'First', score: 3 },
    { name: 'Second', score: 2 },
    { name: 'Third', score: 1 }
  ]);

  expect(orderDataSpy).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('Get data order by score', async () => {
  fetch.mockResponse(JSON.stringify({ result: [
    { name: 'Second', score: 2 },
    { name: 'Third', score: 1 },
    { name: 'First', score: 3 }
  ]}));

  const orderDataSpy = jest.spyOn(Api, 'orderData');
  const api_response = await Api.getData();

  expect(api_response).toEqual([
    { name: 'First', score: 3 },
    { name: 'Second', score: 2 },
    { name: 'Third', score: 1 }
  ]);

  expect(orderDataSpy).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('Get data error', async () => {
  fetch.mockReject(() => Promise.reject("API is down"));

  const api_response = await Api.getData();

  expect(api_response).toEqual([]);
});
