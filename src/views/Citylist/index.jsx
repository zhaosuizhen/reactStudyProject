import React, { Component } from 'react'
import { NavBar, Icon, Toast } from 'antd-mobile'
import {List, Grid, AutoSizer} from 'react-virtualized'
import './index.scss'

import { getCityList, getHotCityList, getHouseInfo } from '../../utils/api/cityList'
import { getMyCity } from '../../utils/getMyCity'

import NavHeader from '../../components/NavHeader'

export default class Citylist extends Component {
    state = {
        activeIndex: 0,
        cityObj:{},
        cityLetter:[],
        myCity: '',
        myCityCode: 'AREA|88cff55c-aaa4-e2e0',
        list: [
            '111111111111111111111111111111111111',
            '222222222222222222222222222222222222',
            '333333333333333333333333333333333333',
            '444444444444444444444444444444444444',
            '555555555555555555555555555555555555',
            '666666666666666666666666666666666666',
            '777777777777777777777777777777777777',
            '888888888888888888888888888888888888',
            '999999999999999999999999999999999999',
            '000000000000000000000000000000000000',
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            'cccccccccccccccccccccccccccccccccccc',
            'dddddddddddddddddddddddddddddddddddd',
            'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            'ffffffffffffffffffffffffffffffffffff',
            'gggggggggggggggggggggggggggggggggggg',
            '111111111111111111111111111111111111',
            '222222222222222222222222222222222222',
            '333333333333333333333333333333333333',
            '444444444444444444444444444444444444',
            '555555555555555555555555555555555555',
            '666666666666666666666666666666666666',
            '777777777777777777777777777777777777',
            '888888888888888888888888888888888888',
            '999999999999999999999999999999999999',
            '000000000000000000000000000000000000',
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            'cccccccccccccccccccccccccccccccccccc',
            'dddddddddddddddddddddddddddddddddddd',
            'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            'ffffffffffffffffffffffffffffffffffff',
            'gggggggggggggggggggggggggggggggggggg',
            '111111111111111111111111111111111111',
            '222222222222222222222222222222222222',
            '333333333333333333333333333333333333',
            '444444444444444444444444444444444444',
            '555555555555555555555555555555555555',
            '666666666666666666666666666666666666',
            '777777777777777777777777777777777777',
            '888888888888888888888888888888888888',
            '999999999999999999999999999999999999',
            '000000000000000000000000000000000000',
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            'cccccccccccccccccccccccccccccccccccc',
            'dddddddddddddddddddddddddddddddddddd',
            'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            'ffffffffffffffffffffffffffffffffffff',
            'gggggggggggggggggggggggggggggggggggg',
          ]
    }

    listRef = React.createRef()

    //列表
    rowRenderer = ({
      key, // 唯一标识
      index, // 索引
      isScrolling, // 是否处于滚动状态
      isVisible, // 是否被显示
      style, // Style object to be applied to row (to position it)
    }) => {
      return (
        <div key={key} style={style}>
          {this.changeCityName(index)}
          {this.state.cityObj[this.state.cityLetter[index]].map((val, key) => {
                return (
                    <div className="cityName" key={key} onClick={async () => {
                        let res = await getHouseInfo({id: val.value})
                        if(res.data.body.length){
                            sessionStorage.setItem('myCity', JSON.stringify({label: val.label, value: val.value}))
                            this.props.history.push('/home')
                        }else{
                            Toast.info('无房源数据', 2)
                        }
                    }}>
                        {val.label}
                    </div>
                )
          })}
        </div>
      );
    }

    //修改热门城市、当前城市显示
    changeCityName  = (index) => {
            if( this.state.cityLetter[index] == '#'){
                return ( <div className="title">当前城市</div> )
            }else if( this.state.cityLetter[index] == 'hot' ){
                return ( <div className="title">热门城市</div> )
            }else{
                return ( <div className="title">{this.state.cityLetter[index].toUpperCase()}</div> )
            }
            
    }

    // //网格
    // cellRenderer = ({columnIndex, key, rowIndex, style}) => {
    //     return (
    //       <div key={key} style={style}>
    //         {this.state.list[rowIndex][columnIndex]}
    //       </div>
    //     );
    //   }


    //获取城市列表
    getCityList = async (level) => {
        let res = await getCityList({level})
        let cityObj = {}
        let cityLetter = []
        res.data.body.forEach((item, index) => {
            if(cityObj[item.short.substr(0,1)]){
                cityObj[item.short.substr(0,1)].push(item)
            }else{
                cityObj[item.short.substr(0,1)] = [item]
            }
        })
        cityLetter = Object.keys(cityObj).sort()
        this.setState({
            cityObj,
            cityLetter
        })
    }

    //获取热门城市列表
    getHotCityList = async () => {
        let res = await getHotCityList()
        let cityObj = this.state.cityObj
        cityObj.hot = res.data.body
        let cityLetter = this.state.cityLetter
        cityLetter.unshift('hot')
        this.setState({
            cityObj,
            cityLetter
        })
    }

    //获取当前城市
    getMyCity = async () => {
        let res = await getMyCity()
        let cityObj = this.state.cityObj
        let cityLetter = this.state.cityLetter
        cityObj['#'] = [res]
        cityLetter.unshift('#')
        this.setState({
            cityObj,
            cityLetter
        })
    }

    //渲染右侧字母列表
    renderRightList = () => {
        return this.state.cityLetter.map((item, index) => {
            let text = item == 'hot' ? '热' : item.toUpperCase()
            return (
                <li key={index}>
                    <span 
                    onClick={() => {
                        this.setState(
                            {activeIndex: index},
                            () => {
                                this.listRef.current.scrollToRow(this.state.activeIndex)
                            }
                        )
                    }}
                    className={this.state.activeIndex == index ? "active" : ''}>
                        {text}
                    </span>
                </li>
            )
        })
    }

    async componentDidMount() {
        await this.getCityList(1)
        await this.getHotCityList()
        await this.getMyCity()
        console.log(this.state.cityLetter)
        console.log(this.state.cityObj)
    }
    
    render() {
        return (
            <div className="cityList">
                <NavHeader title="选择城市" />
                {/* 左侧城市列表 */}
                <AutoSizer>
                    {({height, width}) => (
                        <List
                            width={width}
                            height={height}
                            rowCount={this.state.cityLetter.length}
                            rowHeight={(index) => {
                                return this.state.cityObj[this.state.cityLetter[index.index]].length * 50 + 36
                            }}
                            onRowsRendered={({startIndex}) => {
                                if(this.state.activeIndex !== startIndex){
                                    this.setState({
                                        activeIndex: startIndex
                                    })
                                }
                            }}
                            rowRenderer={this.rowRenderer}
                            ref={this.listRef}
                            scrollToAlignment='start'
                        />
                    )}
                </AutoSizer>
                {/* 右侧字母列表 */}
                <ul className="rightList">
                    {this.renderRightList()}
                </ul>
                {/* 网格 */}
                {/* <Grid
                    cellRenderer={this.cellRenderer}
                    columnCount={this.state.list[0].length}
                    columnWidth={100}
                    height={300}
                    rowCount={this.state.list.length}
                    rowHeight={30}
                    width={300}
                /> */}
            </div>
        )
    }
}
