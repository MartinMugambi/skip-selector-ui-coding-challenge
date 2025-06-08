import ErrorResponseHandler from "../ErrorReponseHandler";

describe("ErrorResponseHandler", () => {
  it("should initialize with default success, status, and message values", () => {
    const error = new Error("Test Error");
    const response = new ErrorResponseHandler(false, 500, error);

    expect(response.success).toBe(false);
    expect(response.status).toBe(500);
    expect(response.error).toEqual(error);
    expect(response.message).toBe("Errror Message");
  });

  it("should initialize with custom message when provided", () => {
    const error = { code: "NOT_FOUND", details: "Resource not found" };
    const customMessage = "Custom Error Message";
    const response = new ErrorResponseHandler(false, 404, error, customMessage);

    expect(response.success).toBe(false);
    expect(response.status).toBe(404);
    expect(response.error).toEqual(error);
    expect(response.message).toBe(customMessage);
  });

  it("should handle custom status code", () => {
    const error = null;
    const response = new ErrorResponseHandler(false, 400, error);

    expect(response.success).toBe(false);
    expect(response.status).toBe(400);
    expect(response.error).toBeNull();
    expect(response.message).toBe("Errror Message");
  });

  it("should handle undefined error", () => {
    const response = new ErrorResponseHandler(false, 500, undefined);

    expect(response.success).toBe(false);
    expect(response.status).toBe(500);
    expect(response.error).toBeUndefined();
    expect(response.message).toBe("Errror Message");
  });

  it("should handle success set to true", () => {
    const error = new Error("Unexpected Success");
    const response = new ErrorResponseHandler(
      true,
      200,
      error,
      "Success in Error"
    );

    expect(response.success).toBe(true);
    expect(response.status).toBe(200);
    expect(response.error).toEqual(error);
    expect(response.message).toBe("Success in Error");
  });
});
