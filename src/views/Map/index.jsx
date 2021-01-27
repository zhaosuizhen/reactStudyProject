import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader'
import { Modal, Button } from 'antd-mobile'
import { getMyCity } from '../../utils/getMyCity'
import { getHouseInfo, getHouseList } from '../../utils/api/map'
import './index.scss'

let BMapGL = window.BMapGL

export default class Map extends Component {

    map = null

    state = {
        myCity: {},
        houseInfo: [],
        dialog: false,
        houseList: []
    }

    //获取当前城市
    getMyCity = async () => {
        let res = await getMyCity()
        this.setState({
            myCity: res
        })
    }

    //创建地图
    newMap = () => {
        console.log(this.map)
        this.map = new BMapGL.Map("container")

        //创建地址解析器实例
        var myGeo = new BMapGL.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(this.state.myCity.label, (point) => {
            if(point){
                console.log(point)
                this.map.centerAndZoom(point, 11);
                // map.addOverlay(new BMapGL.Marker(point, {title: '北京市海淀区上地10街'}))
            }else{
                alert('您选择的地址没有解析到结果！');
            }
        }, this.state.myCity.label)

        // 添加控件
        this.addControl()
        
        // 添加覆盖物
        this.state.houseInfo.forEach(item => {
            this.addLabel( item, 'radius' )
        })

        
    }

    // 添加控件
    addControl = () => {
        this.map.addControl(new BMapGL.ZoomControl())    // 添加缩放控件
        this.map.addControl(new BMapGL.ScaleControl())     // 添加比例尺控件
    }
    
    // 添加覆盖物
    addLabel = ( item, type ) => {
        console.log(type)
        var opts = {
            position: new BMapGL.Point(item.coord.longitude, item.coord.latitude), // 指定文本标注所在的地理位置
            offset: new BMapGL.Size(-25, -25) // 设置文本偏移量
        };
        // 创建文本标注对象
        var label = new BMapGL.Label(
            `<div class="${ type == 'radius' ? 'label_radius' : 'label_rectangle'}">
                <p>${item.label}</p>
                <p>${item.count}套</p>
            </div>`,
            opts);
        // 添加点击事件
        label.addEventListener('click', async () => {
            //放大地图层级
            let mapZoom = this.map.getZoom()
            if( mapZoom == 11 ){
                this.map.centerAndZoom({lng: item.coord.longitude, lat: item.coord.latitude}, 13)

                //清楚当前覆盖物
                setTimeout(() => {
                    this.map.clearOverlays()
                }, 0);

                // 获取城市房源列表
                await this.getHouseInfo(item.value)

                // 添加新覆盖物
                this.state.houseInfo.forEach(item => {
                    this.addLabel( item, 'radius' )
                })
            }else if( mapZoom == 13 ){
                this.map.centerAndZoom({lng: item.coord.longitude, lat: item.coord.latitude}, 15)

                //清楚当前覆盖物
                setTimeout(() => {
                    this.map.clearOverlays()
                }, 0);

                // 获取城市房源列表
                await this.getHouseInfo(item.value)

                // 添加新覆盖物
                this.state.houseInfo.forEach(item => {
                    this.addLabel( item, 'rectangle' )
                })
            }else if(mapZoom == 15){
                this.map.panTo( {lng: item.coord.longitude, lat: item.coord.latitude} )
                this.getHouseList({
                    cityId: item.value
                })
                this.setState({
                    dialog: true,
                  });
            }
            
        })
        // 自定义文本标注样式
        label.setStyle({
            // color: 'blue',
            // borderRadius: '5px',
            // borderColor: '#ccc',
            // padding: '10px',
            // fontSize: '16px',
            // height: '30px',
            // lineHeight: '30px',
            border: '0',
            fontFamily: '微软雅黑'
        });
        this.map.addOverlay(label);
    }

    // 获取城市房源列表
    getHouseInfo = async (id) => {
        let res = await getHouseInfo({id})
        this.setState({
            houseInfo: res.data.body
        })
    }

    // 获取房屋列表
    getHouseList = async (params) => {
        let res = await getHouseList(params)
        this.setState({
            houseList: res.data.body.list
        })
    }

    //渲染房屋列表
    renderHouseList = () => {
        // setTimeout(() => {
        //     console.log(this.state.houseList)
        // }, 10);
        return this.state.houseList.map((item, index) => {
            return (
                <div className="houseList" key={index}>
                    <img src={`https://api-haoke-web.itheima.net${item.houseImg}`} alt=""/>
                    <div className="content">
                        <p className="title">{item.title}</p>
                        <p className="info">{item.desc}</p>
                        <p className="label">
                            {item.tags.map((val, key) => {
                                return (
                                    <span key={key}>
                                        {val}
                                    </span>
                                )
                            })}
                        </p>
                        <p className="price"><span className="priceNum">{item.price}</span>元/月</p>
                    </div>
                </div>
            )
        })
    }

    async componentDidMount() {
        // 获取当前城市
        await this.getMyCity()
        // 获取城市房源列表
        await this.getHouseInfo(this.state.myCity.value)
        // 创建地图
        await this.newMap()
    }
        
    render() {
        return (
            <div className="map">
                <NavHeader title="地图找房"/>
                <div id="container"></div>
                
                <Modal
                    popup
                    visible={this.state.dialog}
                    onClose={() => {
                        this.setState({
                            dialog: false,
                        })
                    }}
                    animationType="slide-up"
                    afterClose={() => { console.log('关闭回调') }}
                    >
                    <div className="dialog">
                        <div className="dialogTitle">
                            <span>房屋列表</span>
                            <span>更多房源</span>
                        </div>
                        {this.renderHouseList()}
                    </div>
                </Modal>
            </div>
        )
    }
}
