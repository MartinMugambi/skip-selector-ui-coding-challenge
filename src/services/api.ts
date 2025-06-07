import API_BASE_URL from "../constants/contants";
import SuccessResponseHandler from "./SuccessResponseHandler";
import ErrorResponseHandler from "./ErrorReponseHandler";

type ApiResponse = SuccessResponseHandler | ErrorResponseHandler;

const request = async (url: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`);
    if (!response.ok) {
      const error = await response.json();

      return new ErrorResponseHandler(
        false,
        response.status,
        error,
        "Failed Request"
      );
    }

    const data = await response.json();

    return new SuccessResponseHandler(
      true,
      response.status,
      data,
      "Data Fetched Successfully"
    );
  } catch (error) {
    return new ErrorResponseHandler(
      false,
      500,
      error?.message ?? error,
      "Request Failed"
    );
  }
};

const getElements = (url: string) => request(url);

export default getElements;
