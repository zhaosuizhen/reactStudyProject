import request from '../request'

//查询房源数据
export const getHouseInfo = (params) => {
    return request({
        method: 'GET',
        url: '/area/map',
        params
    })
}

//根据条件查询房屋
export const getHouseList = (params) => {
    return request({
        method: 'GET',
        url: '/houses',
        params
    })
}