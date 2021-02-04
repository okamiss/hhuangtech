// function getList(){
//     this.$get("/rs/col/type/list")
//     .then((response) => {
//       console.log(response);
//     })
//     .catch(() => {
//       console.log("erer");
//     });
// }
// export  {
//     getList
// }

import { post, get } from '../src/utils/http'
// console.log( post, get) 

// export const  GetList  = params => get('/japi/login/loginForWeb',params)

export const GetList = function (params) {
   return get('/japi/login/loginForWeb', params)
}