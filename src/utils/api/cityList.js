import request from '../request'

//获取城市列表数据
export const getCityList = (params) => {
    return request({
        method: 'GET',
        url: '/area/city',
        params
    })
}

//获取热门城市列表数据
export const getHotCityList = () => {
    return request({
        method: 'GET',
        url: '/area/hot'
    })
}

//根据城市名称查询该城市信息
export const getCityInfo = (params) => {
    return request({
        method: 'GET',
        url: '/area/info',
        params
    })
}

//查询房源数据
export const getHouseInfo = (params) => {
    return request({
        method: 'GET',
        url: '/area/map',
        params
    })
}