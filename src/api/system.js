import ajax from "./http";

/*系统中心API*/

/*发送系统通知*/
export const reqSystemNotification=(notifyContent)=>ajax(`/system-center/sysNotify?notifyContent=${notifyContent}`,{},'POST')

/*系统通知历史记录查询*/
export const reqGetSystemNotification=(page,pageSize)=>ajax(`/system-center/sysNotify`,{page,pageSize},'GET')

/*查询反馈详情*/
export const reqFeedbackDetail=(feedbackId)=>ajax(`/system-center/feedback/${feedbackId}`,{},'GET')

/*查询反馈列表*/
export const reqFeedback=(feedbackType,page,pageSize)=>ajax(`/system-center/feedback`,{feedbackType,page,pageSize},'GET')

/*修改密码*/
export const reqChangePWD=(oldPassword,newPassword)=>ajax(`/system-center/admin/password?oldPassword=${oldPassword}&newPassword=${newPassword}`,{},'PUT')

/*更改绑定手机号*/
export const  reqChangePhone=(password,mobilePhone)=>ajax(`/system-center/admin/mobilePhone?password=${password}&mobilePhone=${mobilePhone}`,{},'PUT')
