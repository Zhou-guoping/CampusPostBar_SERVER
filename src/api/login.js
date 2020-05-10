import ajax from './http'

//const BASE_URL='http://server.campus.com/console' //=>在config/index.js中添加代码解决跨域问题


/*管理员登录获验证码*/
export const reqValidateCode=(adminName,password)=>ajax('/admin-center/login/validate?adminName='+adminName+'&password='+password,{adminName,password},'POST')

/*管理员登录*/
export const reqAdminLogin=(adminName,password,smsCode)=>ajax('/admin-center/login/admin',{adminName,password,smsCode},'POST')

/*管理员信息*/
export const reqAdminInfo=()=>ajax('/system-center/admin')

/*管理员退出登录*/
export const reqAdminLogout=()=>ajax('/system-center/admin',{},'PUT')

/*更新管理员密码*/
export const reqUpdatePW=(adminName,password,smsCode)=>ajax('/admin-center/admin',{adminName,password,smsCode},'PUT')

/*忘记密码时点击发送验证码按钮*/
export const reqGetCode=(adminName)=>ajax('/admin-center/code',{adminName},'GET')



