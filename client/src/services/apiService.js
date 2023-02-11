import axios from 'axios';
//const baseUrl = process.ENV.baseUrl;
const baseUrl = process.env.baseUrl

export const getData = async (props) => {
    const { method,endpoint,payload } = props;
    const baseUrl = window.location.url;
    let request = endpoint;
    
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
    try {
        const response = await axios.get(request,{headers})
        return response?.data || {};

    } catch (error) {
        console.log(error);
    }
}

export const fetchData1 = (method, endpoint, data, onUploadProgress) => {
    
    return async (dispatch, getState) => {
      const userDetails = getState();
      //console.log("fetchdata1 called");
      let requestParams = {
        url: baseUrl + endpoint, //Baseurl.url + endpoint,
        method: method,
        //onUploadProgress: onUploadProgress,
      };
  
      let headers = {
        "Content-Type": "application/json;charset=UTF-8"
        //"multipart/form-data",
      };
    //   if (
    //     userDetails &&
    //     userDetails?.UserReducer &&
    //     userDetails?.UserReducer?.user?.token
    //   ) {
    //     Object.assign(headers, {
    //       Authorization: `Bearer ${userDetails?.UserReducer?.user?.token}`,
    //       // 'X-Authorization': `Bearer ${userDetails?.UserReducer?.user?.token}`
    //     });
    //   }
    //   Object.assign(requestParams, {
    //     headers: {
    //       ...headers,
    //     },
    //   });
      //let params = JSON.stringify(data);
      let params = data;
  
      if (method === "GET") {
        Object.assign(requestParams, {
          params: data,
        });
      } else if (data) {
        Object.assign(requestParams, {
          data: params,
        });
      }
    //   axios.interceptors.response.use(
    //     function (response) {
    //       localStorage.setItem('isUnAuth', false)
    //       //console.log(response);
    //       return response;
    //     },
    //     function (error) {
    //       //console.log(error);
    //       const { config, response } = error;
    //       const originalRequest = config;
  
    //       if (response && response.status === 401) {
    //         dispatch(setLoadingStatus(false));
    //         localStorage.setItem('isUnAuth', true)
    //         dispatch(logoutUser())
    //           .then((res) => {
                 //console.log(res);
  
    //             if (res == "success") {
    //               this.props.history.push("/login");
    //             }
    //           })
    //           .catch((err) => err) //console.log(err));
    //       } else {
    //         localStorage.setItem('isUnAuth', false)
  
    //         return Promise.reject(error);
    //       }
    //     }
    //   );
  
  
      return new Promise((resolve, reject) => {
        //let isUnAuth = localStorage.getItem('isUnAuth')
        // ---------------------------->>>>>> this will return promise  means return response directly into the component need not to store every response
        //if (isUnAuth === null || isUnAuth === 'false') {
            
          axios(requestParams)
            .then((resp) => {
  
  
              if (resp.status == 200 || resp.status == 204) {
                resolve(resp.data);
              } else {
                reject(resp.data);
              }
            })
            .catch((error) => {
              //console.log(error.response);
              if (error.status !== 401) {
                reject(error?.response?.data);
              }
  
            });
        //}
      });
  
    };
  };