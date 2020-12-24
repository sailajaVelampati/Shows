const fetchData = (url, successCallback) => {
  return fetch(url)
    .then((res) => res.json())
    .then(
      (result) => {
        successCallback(result);
      },
      (error) => {
        console.log(error);
      }
    );
};

export default fetchData;
