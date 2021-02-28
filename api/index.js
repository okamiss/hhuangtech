import { post, get } from '../src/utils/http'

export const GetSid = () =>
  get(
    '/plm/login?__login=true&__ajax=json&username=c3lzdGVt&password=aEhUZWNoMTIz'
  )

/*
    节点
*/
export const GetMenuList = (params) => get('/plm/node/children', params) //获取菜单节点列表
export const GetDomDetail = (params) => get('/plm/node/get', params) //获取节点详情
export const CreateDom = (params) => post('/plm/node/create', params) //创建子节点
export const DeleteDom = (params) => get('/plm/node/remove', params) //删除子节点
export const EidtDom = (params) => post('/plm/node/modify', params) //编辑子节点

/*
    扩展字段
*/

export const GetCode = (params) =>
  post('/plm/node/sharding/extcol/extended', params) //获取扩展列
export const GetListType = () => get('/plm/rs/col/type/list') //获取列表类型
export const AddField = (params) =>
  post('/plm/node/sharding/extcol/extend', params) //获取字段详情
export const ApiFieldRecover = (params) =>
  post('/plm/node/sharding/extcol/recover', params) //删除
export const ApiFieldReuse = (params) =>
  post('/plm/node/sharding/extcol/reuse', params) //启用
export const ApiFieldStop = (params) =>
  post('/plm/node/sharding/extcol/stop', params) //停用

/*
    字典
*/

export const GetDictList = (params) => get('/plm/dict/children', params) //获取字典列表
export const CreateDict = (params) => post('/plm/dict/create', params) //创建字典
export const DeleteDict = (params) => post('/plm/dict/delete', params) //删除字典
export const GetDictQuery = (params) => get('/plm/dict/item/get', params) //查询字典项
export const CreateDictTerm = (params) => post('/plm/dict/item/create', params) //创建字典项
export const CreateDictTermRel = (params) =>
  post('/plm/dict/item/relation/create', params) //创建字典关联项
export const DeleteDictTermRel = (params) =>
  post('/plm/dict/item/relation/delete', params) //删除字典关联项

export const MoveDict = (params) =>
  post('/plm/dict/directory/relation/move', params) //创建字典

/*
    目录
*/

export const GetFileList = (params) =>
  get('/plm/dict/directory/children', params) //获取目录列表

export const AddChildFile = (params) =>
  post('/plm/dict/directory/create', params) //增加目录

export const DelChildFile = (params) =>
  post('/plm/dict/directory/delete', params) //删除目录

export const UpdateFile = (params) => post('/plm/dict/directory/update', params) //更新目录
export const MoveFile = (params) => post('/plm/dict/directory/move', params) //移动目录

// 联动
export const linkage = (params) =>
  post('/plm/core/ext/column/related/define', params) //联动

export const getObjLink = (params) =>
  get('/plm/node/sharding/extcol/object/links', params) //获取联动列

export const getDictUsed = (params) => get('/plm/dict/item/used', params) //通过字典代码查询已经使用的字典项
export const getRelatedInstance = (params) =>
  get('/plm/core/ext/column/related/get/related/instance', params) //查询联动实例

export const getRelatedQuery = (params) =>
  get('/plm/core/ext/column/related/query', params) // 查询关联关系
