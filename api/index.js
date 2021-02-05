
import { post, get } from '../src/utils/http'


export const  GetSid  = () => get('/plm/login?__login=true&__ajax=json&username=c3lzdGVt&password=aEhUZWNoMTIz')
// export const  GetList  = () => get('/japi/login/loginForWeb')
export const  GetMenuList  = params => get('/plm/node/children',params)  //获取菜单列表
export const  GetDomDetail  = params => get('/plm/node/get',params)  //获取节点详情
export const  CreateDom  = params => get('/plm/node/create',params)  //创建子节点
export const  DeleteDom  = params => get('/plm/node/remove',params)  //删除子节点
export const  EidtDom  = params => post('/plm/node/modify',params)  //编辑子节点




