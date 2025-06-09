import getElements from "../api";
import SuccessResponseHandler from "../SuccessResponseHandler";
import ErrorResponseHandler from "../ErrorReponseHandler";

const API_BASE_URL = "https://app.wewantwaste.co.uk/";

describe("getElements", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns SuccessResponseHandler on successful fetch", async () => {
    const mockData = { foo: "bar" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockData,
    });

    const result = await getElements("/test");
    expect(result).toBeInstanceOf(SuccessResponseHandler);
    expect(result).toMatchObject({
      success: true,
      statusCode: 200,
      data: mockData,
      message: "Data Fetched Successfully",
    });
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/test`);
  });

  it("returns ErrorResponseHandler on failed fetch (non-2xx)", async () => {
    const mockError = { error: "fail" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => mockError,
    });

    const result = await getElements("/fail");
    expect(result).toBeInstanceOf(ErrorResponseHandler);
    expect(result).toMatchObject({
      success: false,
      status: 404,
      error: mockError,
      message: "Failed Request",
    });
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/fail`);
  });

  it("returns ErrorResponseHandler on fetch error", async () => {
    const mockError = new Error("Network error");
    (fetch as jest.Mock).mockRejectedValueOnce(mockError);

    const result = await getElements("/error");
    expect(result).toBeInstanceOf(ErrorResponseHandler);
    expect(result).toMatchObject({
      success: false,
      status: 500,
      error: mockError,
      message: "Request Failed",
    });
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/error`);
  });
});
