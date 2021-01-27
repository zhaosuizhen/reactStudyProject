import request from '../request'

//获取轮播图
export const getSwiper = () => {
    return request({
        method: 'GET',
        url: 'home/swiper'
    })
}

//获取租房小组列表
export const getGroups = (params) => {
    return request({
        method: 'GET',
        url: '/home/groups',
        params
    })
}

//获取资讯列表
export const getNews = (params) => {
    return request({
        method: 'GET',
        url: '/home/news',
        params
    })
}