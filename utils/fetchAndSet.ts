const fetchAndSet = async (url, setter) => {
  fetch(url)
    .then(handleNetworkErrors)
    .then((res) => {
      const status = res.status;
      const message = res.json().message;
      switch (true) {
        case status >= 400 && status < 500:
          alert(message);
        case status >= 500 && status < 600:
          alert(message);
        case status >= 200 && status < 300:
          const data = json().data;
          setter(data);
      }
    });
};

const handleNetworkErrors = (res) => {
  if (!res.ok) {
    alert(res.statusText);
  }
  return res;
};
export default fetchAndSet;
