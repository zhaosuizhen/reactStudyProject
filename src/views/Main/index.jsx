import React, { Component } from 'react'
import { Carousel, Flex, Grid, SearchBar } from 'antd-mobile'

import { getSwiper, getGroups, getNews } from '../../utils/api/home'
import { getMyCity } from '../../utils/getMyCity'
import imgUrl from '../../utils/imgUrl'

import './index.scss'

import { navList } from './util.js'
export default class Main extends Component {
    state = {
        myCity: '',
        myCityCode: '',
        swiperData: [],
        groupData: [],
        newsData:[],
        imgHeight: 176,
        swiperAutoplay: false
    }


    //渲染轮播图模块
    renderSwipper = () => {
        return this.state.swiperData.map(item => (
                        
            <img
                key={item.id}
                src={`${imgUrl}${item.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                }}
            />
        ))
    }
    //渲染nav导航模块
    renderNav = () => {
        return navList.map((item, index) => {
            return (
                <Flex.Item className="navItem" key={index} onClick={() => {
                    this.props.history.push(item.path)
                }}>
                    <img src={item.img} alt=""/>
                    <p>{item.title}</p>
                </Flex.Item>
            )
        })
    }
    //渲染租房小组模块
    renderGroup = () => {
        return (
            <div>
                <div className="groupTitle">
                    <h3>租房小组</h3>
                    <span>更多</span>
                </div>
                <Grid data={this.state.groupData}
                activeStyle={true} 
                columnNum={2} 
                square={false}
                hasLine={false}
                renderItem={(item) => {
                    return (
                        <div className="groupItem" onClick={() => {}}>
                            <div className="text">
                                <h4>{item. title}</h4>
                                <p>{item. desc}</p>
                            </div>
                            <img src={`${imgUrl}${item.imgSrc}`} alt=""/>
                        </div>
                    )
                }}/>
            </div>
        )
    }
    //渲染最新资讯模块
    renderNews = () => {
        return (
            <div>
                {this.state.newsData.map((item, index) => {
                    return (
                        <div key={index} className="newsItem">
                            <img src={`${imgUrl}${item.imgSrc}`} alt=""/>
                            <div className="text">
                                <h3>{item.title}</h3>
                                <div>
                                    <span>{item.from}</span>
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    
    /*************************************************************/

    //获取轮播图图片
    getSwiperList = async () => {
        let res = await getSwiper()
        this.setState({
            swiperData: res.data.body
        },() => {
             this.setState({
                swiperAutoplay: true
             })
        })
    }

    //获取租房小组列表数据
    getGroupsList = async (area) => {
        let res = await getGroups({area})
        this.setState({
            groupData: res.data.body
        })
    }

    //获取资讯数据
    getNewsList = async (area) => {
        let res = await getNews({area})
        this.setState({
            newsData: res.data.body
        })
    }

    //获取当前城市
    getMyCity = async () => {
        let res = await getMyCity()
        console.log(res)
        this.setState({
            myCity: res.label,
            myCityCode: res.value
        })
    }

    /*************************************************************/
    
    async componentDidMount(){
        console.log(123)
        //获取当前城市
        await this.getMyCity()
        //获取轮播图图片
        await this.getSwiperList()
        //获取租房小组列表数据
        await this.getGroupsList(this.state.myCityCode)
        //获取资讯数据
        await this.getNewsList(this.state.myCityCode)
    }

    render() {
        return (
            <div>
                {/* 搜索模块 */}
                <div className="titleBox">
                    <div className="searchBox">
                        <div className="text" onClick={() => {
                            this.props.history.push('/cityList')
                        }}>
                            <p>{this.state.myCity}<i className="iconfont icon-arrow-down-filling"></i></p>
                        </div>
                        <div className="input">
                            <SearchBar placeholder="请输入地址"/>
                        </div>
                    </div>
                    <div className="mapImg">
                        <i className="iconfont icon-map" onClick={() => {
                            this.props.history.push('/map')
                        }}></i>
                    </div>
                </div>
                {/* 轮播图模块 */}
                <Carousel
                    autoplay={this.state.swiperAutoplay}
                    infinite={true}
                    >
                    {this.renderSwipper()}
                </Carousel>
                {/* 导航模块 */}
                <Flex className="navBox">
                    {this.renderNav()}
                </Flex>
                {/* 租房小组 */}
                <div className="group">
                    {this.renderGroup()}
                </div>
                {/* 最新资讯 */}
                <div className="news">
                    <h3 className="newsTitle">最新资讯</h3>
                    {this.renderNews()}
                </div>
            </div>
        )
    }
}
