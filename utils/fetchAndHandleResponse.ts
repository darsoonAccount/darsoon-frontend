import { useAuth } from "../contexts/AuthProvider";

const API_URL = "http://localhost:8000";

interface Ifetch {
  url: string;
  method: string;
  token: string;
  body?: object;
  handleMessage?: (message: string) => void;
  handleData?: (data: object) => void;
}

const fetchAndHandleResponse = async ({
  url,
  method,
  body,
  token,
  handleData,
  handleMessage,
}) => {
  const handleNetworkErrors = (res) => {
    if (!res.ok) {
      alert(res.statusText);
    }
    return res;
  };

  let status = null;

  fetch(API_URL + url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  })
    .then(handleNetworkErrors)
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((json) => {
      console.log("json", json);
      switch (true) {
        case status >= 400 && status <= 499:
          handleMessage(json.message);
          break;
        case status >= 500 && status <= 599:
          handleMessage(json.message);
          break;
        case status >= 200 && status <= 299:
          handleMessage(json.message);
          console.log("HHERRRER?", json.data);
          handleData(json.data);
          break;
      }
    })
    .catch((err) => handleMessage(err));
};

export default fetchAndHandleResponse;
