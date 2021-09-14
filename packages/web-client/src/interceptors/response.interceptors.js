import axios from "axios";

const createResponseInterceptor = (history) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      //console.log(error);
      console.log(error);
      if (error.response.status === 401) {
        // unauthorized
        // history.push("/sign-in");
        window.location.replace("http://localhost:3000/#/sign-in");
      }
      if (error.response.status === 404) {
        // not found
        window.location.replace("http://localhost:3000/#/404");
        //history.push("/404");
      }
      if (error.response.status === 500) {
        // server error
        window.location.replace("http://localhost:3000/#/500");
        //  history.push("/#/500");
      }
      return Promise.reject(error);
    }
  );
};

export default createResponseInterceptor;
