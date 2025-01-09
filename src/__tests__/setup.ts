import "@testing-library/jest-dom";

class MockTextEncoder {
  encode(input: string): Uint8Array {
    return new Uint8Array(Buffer.from(input));
  }
}

class MockTextDecoder {
  decode(input?: BufferSource): string {
    return input ? Buffer.from(input as ArrayBuffer).toString() : "";
  }
}

global.TextEncoder = MockTextEncoder as any;
global.TextDecoder = MockTextDecoder as any;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/",
  }),
  useNavigate: () => jest.fn(),
  BrowserRouter: function BrowserRouter({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return children;
  },
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

window.scrollTo = jest.fn();
window.innerWidth = 1024;
window.innerHeight = 768;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Test Setup", () => {
  it("should setup test environment", () => {
    expect(true).toBe(true);
  });
});
