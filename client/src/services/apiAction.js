import { fetchData } from "./apiService";

export const sunBurstChartData = ({ method, endPoint, payload }) => {
    
    return (dispatch) => {
        
        return new Promise((resolve, reject) => {
          
            dispatch(fetchData(method, endPoint, payload)) 
                .then((resp) => {
                  
                    if (resp.status === "success") {
                        //toastr.success(resp?.message)
                        resolve(resp)
                    } else {
                        reject(resp?.message);
                        //toastr.error(resp?.message);
                    }
                }).catch((err) => {
                    reject(err);
                    //toastr.error(err?.message)
                });
        })
    }
  }