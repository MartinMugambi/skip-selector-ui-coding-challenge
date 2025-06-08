import SuccessResponseHandler from "../SuccessResponseHandler";

describe("SuccessResponseHandler", () => {
  it("should initialize with default success and message values", () => {
    const data = [{ id: 1, name: "Test" }];
    const response = new SuccessResponseHandler(true, 200, data);

    expect(response.success).toBe(true);
    expect(response.statusCode).toBe(200);
    expect(response.data).toEqual(data);
    expect(response.message).toBe("Data Fetched Successfully");
  });

  it("should initialize with custom message when provided", () => {
    const data = { key: "value" };
    const customMessage = "Custom Success Message";
    const response = new SuccessResponseHandler(true, 201, data, customMessage);

    expect(response.success).toBe(true);
    expect(response.statusCode).toBe(201);
    expect(response.data).toEqual(data);
    expect(response.message).toBe(customMessage);
  });

  it("should handle falsy success value", () => {
    const data = null;
    const response = new SuccessResponseHandler(false, 400, data);

    expect(response.success).toBe(false);
    expect(response.statusCode).toBe(400);
    expect(response.data).toBeNull();
    expect(response.message).toBe("Data Fetched Successfully");
  });

  it("should handle undefined data", () => {
    const response = new SuccessResponseHandler(true, 200, undefined);

    expect(response.success).toBe(true);
    expect(response.statusCode).toBe(200);
    expect(response.data).toBeUndefined();
    expect(response.message).toBe("Data Fetched Successfully");
  });
});
