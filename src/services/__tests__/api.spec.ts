import getElements from "../api";
import ErrorResponseHandler from "../ErrorReponseHandler";
import SuccessResponseHandler from "../SuccessResponseHandler";

// Mock the fetch API
global.fetch = jest.fn();

// Mock the API_BASE_URL constant
jest.mock("../../constants/contants", () => ({
  API_BASE_URL: "https://api.example.com",
}));

describe("getElements", () => {
  const mockUrl = "/test-endpoint";
  const fullUrl = `https://api.example.com${mockUrl}`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return SuccessResponseHandler for successful API response", async () => {
    const mockData = [{ id: 1, name: "Test" }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const response = await getElements(mockUrl);

    expect(fetch).toHaveBeenCalledWith(fullUrl);
    expect(response).toBeInstanceOf(SuccessResponseHandler);
    expect(response).toEqual(
      new SuccessResponseHandler(
        true,
        200,
        mockData,
        "Data Fetched Successfully"
      )
    );
  });

  it("should return ErrorResponseHandler for non-OK API response", async () => {
    const mockError = { code: "NOT_FOUND", message: "Resource not found" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: jest.fn().mockResolvedValueOnce(mockError),
    });

    const response = await getElements(mockUrl);

    expect(fetch).toHaveBeenCalledWith(fullUrl);
    expect(response).toBeInstanceOf(ErrorResponseHandler);
    expect(response).toEqual(
      new ErrorResponseHandler(false, 404, mockError, "Failed Request")
    );
  });

  it("should return ErrorResponseHandler for network error", async () => {
    const errorMessage = "Network Error";
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const response = await getElements(mockUrl);

    expect(fetch).toHaveBeenCalledWith(fullUrl);
    expect(response).toBeInstanceOf(ErrorResponseHandler);
    expect(response).toEqual(
      new ErrorResponseHandler(false, 500, errorMessage, "Request Failed")
    );
  });

  it("should handle error without message property", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce({});

    const response = await getElements(mockUrl);

    expect(fetch).toHaveBeenCalledWith(fullUrl);
    expect(response).toBeInstanceOf(ErrorResponseHandler);
    expect(response).toEqual(
      new ErrorResponseHandler(false, 500, {}, "Request Failed")
    );
  });
});
