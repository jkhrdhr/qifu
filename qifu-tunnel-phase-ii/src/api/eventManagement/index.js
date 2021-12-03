import request from '@/utils/request'

// 查询列表
export function getData(obj) {
    return request({
        url: '/center/event',
        method: 'get',
        params: obj
    })
}
// 查询列表
export function getDetail(obj) {
    return request({
        url: '/center/eventdetail',
        method: 'get',
        params: obj
    })
}
// 更新事件状态
export function updateStatus(obj) {
    return request({
        url: '/center/updatestatus',
        method: 'post',
        data: obj
    })
}
// rtsp
export function refreshCamInfoByEventId(params) {
    return request({
        url: 'center/refreshCamInfoByEventId',
        method: 'get',
        params: params
    })
}
// rtsp
export function getCamInfo(params) {
    return request({
        url: 'center/getCamInfo',
        method: 'get',
        params: params
    })
}
