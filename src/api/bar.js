
import ajax from "./http";

/*贴吧中心请求*/

/*贴吧头像修改*/
export const reqChangeHeadImg=(postBarId,headImg)=>ajax(`/bar-center/post-bar/headImg/${postBarId}?headImg=${headImg}`,{},'PUT')

/*贴吧简介修改*/
export const reqChangeIntro=(postBarId,introduce)=>ajax(`/bar-center/post-bar/introduce/${postBarId}?introduce=${introduce}`,{},'PUT')

/*
***资料管理
*/

/*吧内文件查询*/
export const reqBarFiles=(fileId,fileName,userId,userNickname,page,pageSize)=>ajax(`/bar-center/files`,{fileId,fileName,userId,userNickname,page,pageSize},'GET')

/*获取贴吧详情*/
export const reqPostBarInfo=(postBarId)=>ajax(`/bar-center/post-bar/${postBarId}`,{},'GET')

/*删除文件*/
export const reqDeleteFile=(fileId)=>ajax(`/bar-center/file/${fileId}`,{},'DELETE')

/*
***帖子管理
* */

/*吧内贴子查询*/
export const reqGetPosts=(postId,postContent,userId,userNickName,page,pageSize)=>ajax(`/bar-center/posts`,{postId,postContent,userId,userNickName,page,pageSize},'GET')

/*查询贴子评论列表*/
export const reqPostComments=(postId,page,pageSize)=>ajax(`/bar-center/comments/${postId}?page=${page}&pageSize=${pageSize}`,{},'GET')

/*贴子评论回复列表*/
export const reqGetCommentsReply=(commentId,page,pageSize)=>ajax(`/bar-center/reply/${commentId}?page=${page}&pageSize=${pageSize}`,{},'GET')

/*吧内帖子删除*/
export const reqDeletePost=(postId)=>ajax(`/bar-center/post/${postId}`,{},'DELETE')

/*贴子评论删除*/
export const reqDeletePostComment=(commentId)=>ajax(`/bar-center/comments/${commentId}`,{},'DELETE')

/*贴子评论回复删除*/
export const reqDeleteCommentReply=(replyId)=>ajax(`/bar-center/comments/${replyId}`,{},'DELETE')

/*
***公告管理
* */

/*新建公告*/
export const reqCreateNotice=(noticeContent,noticeTitle,noticeType)=>ajax(`/bar-center/notice`,{noticeContent,noticeTitle,noticeType},'POST')

/*删除公告*/
export const reqDeleteNotice=(noticeId)=>ajax(`/bar-center/notice/${noticeId}`,{},'DELETE')

/*发布公告*/
export const reqNoticePut=(noticeId)=>ajax(`/bar-center/notice/${noticeId}`,{},'PUT')

/*吧内公告查询*/
export const reqGetNotice=(noticeId,noticeTitle,noticeContent,noticeState,noticeType,page,pageSize)=>ajax(`/bar-center/notices`,{noticeId,noticeTitle,noticeContent,noticeState,noticeType,page,pageSize},'GET')
