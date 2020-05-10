import ajax from './http'

/*用户中心请求*/

/*获取用户信息 √ */
export const reqGetUserList=(userId,userName,userNickname,userState,page,pageSize)=>ajax(`/user-center/users`,{userId,userName,userNickname,userState,page,pageSize},'GET')

/*用户详情 √*/
export const reqUserInfo=(userId)=>ajax(`/user-center/user/${userId}`,{},'GET')

/*启用、停用用户 √*/
export const reqUserStatus=(userId,remark)=>ajax(`/user-center/user?userId=${userId}&remark=${remark}`,{},'PUT')

/*获取助手列表*/
export const reqGetAssistantList=(adminId,adminName,adminState,checkState,page,pageSize)=>ajax(`/user-center/assistants`,{adminId,adminName,adminState,checkState,page,pageSize},'GET')

/*启用、停用助手*/
export const reqAssistantState=(adminId,remark)=>ajax(`/user-center/assistant?adminId=${adminId}&remark=${remark}`,{},'PUT')

/*吧主列表查询*/
export const reqGetHostList=(adminId,adminName,adminState,checkState,page,pageSize)=>ajax(`/user-center/admins`,{adminId,adminName,adminState,checkState,page,pageSize},'GET')

/*启用、停用吧主*/
export const reqHostState=(adminId,remark)=>ajax(`/user-center/admin?adminId=${adminId}&remark=${remark}`,{},'PUT')

/*审核吧主、助手*/
export const reqCheck=(adminId,checkState,comments)=>ajax(`/user-center/admin/check`,{adminId,checkState,comments},'PUT')






/*贴吧中心请求*/

/*贴吧列表查询*/
export const reqGetPostBar=(postBarId,postBarName,adminId,adminName,postBarState,checkState,page,pageSize)=>ajax(`/bar-center/post-bars`,{postBarId,postBarName,adminId,adminName,postBarState,checkState,page,pageSize},"GET")

/*审核贴吧*/
export const reqCheckPostBar=(checkState,comments,postBarId)=>ajax(`/bar-center/post-bar/check`,{checkState,comments,postBarId},'PUT')

/*停用贴吧*/
export const reqStopPostBar=(postBarId,remark)=>ajax(`/bar-center/post-bar/${postBarId}?remark=${remark}`,{},'PUT')
