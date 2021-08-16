import { useAuth } from "../contexts/AuthProvider";

const API_URL = "http://localhost:8000";

interface Ifetch {
  url: string;
  method?: string;
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
}: Ifetch) => {
  if (!method) {
    method = "GET";
  }

  const handleNetworkErrors = (res) => {
    if (!res.ok) {
      alert(res.statusText);
    }
    return res;
  };

  const done = ({ message, data }) => {
    if (handleMessage) {
      handleMessage(message);
    }
    if (handleData) {
      handleData(data);
    }
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
          done({ message: json.message });
          break;
        case status >= 500 && status <= 599:
          done({ message: json.message });
          break;
        case status >= 200 && status <= 299:
          done({ message: json.message, data: json.data });
          break;
      }
    })
    .catch((err) => handleMessage(err));
};

export default fetchAndHandleResponse;
