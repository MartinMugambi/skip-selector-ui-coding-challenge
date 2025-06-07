import { useState, useEffect } from "react";
import getElements from "../services/api";
import SuccessResponseHandler from "../services/SuccessResponseHandler";
const useFetchHook = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getElements(url)
      .then((response) => {
        if (response instanceof SuccessResponseHandler) {
          setData(response.data ?? []);
        }
      })
      .catch((error) => {});
  }, []);

  return { data };
};

export default useFetchHook;
