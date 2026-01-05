const localStorageMock = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = String(value);
  },
  clear() {
    this.store = {};
  },
  removeItem(key) {
    delete this.store[key];
  },
};

global.localStorage = localStorageMock;

global.window = {
  localStorage: localStorageMock,
  dispatchEvent: jest.fn(),
};

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});