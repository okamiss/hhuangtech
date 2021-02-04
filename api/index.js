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

export const GetList = params => this.$get('/rs/col/type/list',params)