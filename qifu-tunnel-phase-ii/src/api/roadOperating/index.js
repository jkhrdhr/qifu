import request from '@/utils/request'
// 今日拯救信息
export function getRescueInfos(params) {
    return request({
        url: '/center/getRescueInfos',
        method: 'get',
        params: params
    })
}
// 施工信息查询
export function getConstructInfos(params) {
    return request({
        url: '/center/getConstructInfos',
        method: 'get',
        params: params
    })
}
// 故障保修
// export function getEventTypeStatistics(params) {
//     return request({
//         url: '/center/getEventTypeStatistics',
//         method: 'get',
//         params: params
//     })
// }
// 当前危险车辆
export function getNowRiskVehicleList(params) {
    return request({
        url: '/center/getNowRiskVehicleList',
        method: 'get',
        params: params
    })
}
// 当前危险车辆图表
export function getNowRiskVehicleListChart(params) {
    return request({
        url: '/center/getNowRiskVehicleListChart',
        method: 'get',
        params: params
    })
}
// 页面中部隧道风险等级
export function getTunnelRisk(params) {
    return request({
        url: '/center/getTunnelRisk',
        method: 'get',
        params: params
    })
}
// 交通事件类型分析
export function getEventTypeStatistics(params) {
    return request({
        url: '/center/getEventTypeStatistics',
        method: 'get',
        params: params
    })
}
// 交通事件类型分析二级类型查询
export function getSublevelEventTypeStatistics(params) {
    return request({
        url: '/center/getSublevelEventTypeStatistics',
        method: 'get',
        params: params
    })
}
// 页面中部救援车辆信息
export function getRescueCarPosition(params) {
    return request({
        url: '/center/getRescueCarPosition',
        method: 'get',
        params: params
    })
}
// 页面中事故类型图标位置
export function homeEvent(params) {
    return request({
        url: '/center/homeEvent',
        method: 'get',
        params: params
    })
}