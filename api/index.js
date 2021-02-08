
import { post, get } from '../src/utils/http'


export const  GetSid  = () => get('/plm/login?__login=true&__ajax=json&username=c3lzdGVt&password=aEhUZWNoMTIz')

/*
    节点
*/
export const  GetMenuList  = params => get('/plm/node/children',params)  //获取菜单节点列表
export const  GetDomDetail  = params => get('/plm/node/get',params)  //获取节点详情
export const  CreateDom  = params => post('/plm/node/create',params)  //创建子节点
export const  DeleteDom  = params => get('/plm/node/remove',params)  //删除子节点
export const  EidtDom  = params => post('/plm/node/modify',params)  //编辑子节点

/*
    扩展字段
*/

export const  GetCode  = params => get('/plm/node/sharding/extcol/extended',params)  //获取扩展列
export const  GetListType  = () => get('/plm/rs/col/type/list')  //获取列表类型
export const  AddField  = params => post('/plm/node/sharding/extcol/extend',params)  //获取字段详情
export const  ApiFieldRecover  = params => post('/plm/node/sharding/extcol/recover',params)  //删除
export const  ApiFieldReuse  = params => post('/plm/node/sharding/extcol/reuse',params)  //启用
export const  ApiFieldStop  = params => post('/plm/node/sharding/extcol/stop',params)  //停用


/*
    字典
*/

export const  GetDictList  = params => get('/plm/dict/children',params)  //获取字典列表
export const  CreateDict  = params => post('/plm/dict/create',params)  //创建字典
export const  DeleteDict  = params => post('/plm/dict/delete',params)  //删除字典    
export const  GetDictQuery  = params => get('/plm/dict/item/get',params)  //查询字典项  
export const  CreateDictTerm  = params => get('/plm/dict/item/create',params)  //创建字典项  






