import React, { Component } from 'react'
// import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Route } from 'react-router-dom';
import { TabBar } from 'antd-mobile'

import Main from '../Main'
import Findhouse from '../Findhouse'
import Mine from '../Mine'
import News from '../News'

import './home.css'

export default class Home extends Component {

    state = {
        tabBarList:[
            {
                title: '首页',
                path: '/home',
                icon: 'icon-home'
            },
            {
                title: '找房',
                path: '/home/findhouse',
                icon: 'icon-search'
            },
            {
                title: '资讯',
                path: '/home/news',
                icon: 'icon-image-text'
            },
            {
                title: '我的',
                path: '/home/mine',
                icon: 'icon-user'
            },
        ]
    }

    //遍历tabBar导航
    getTabBarList = () => {
        return (
            this.state.tabBarList.map((item, index) => {
                return (
                    <TabBar.Item
                        title={item.title}
                        key={index}
                        icon={
                            <i className={`iconfont ${item.icon}`}></i>
                        }
                        selectedIcon={
                            <i className={`iconfont ${item.icon}`}></i>
                        }
                        selected={this.props.history.location.pathname === item.path}
                        onPress={() => {
                            this.props.history.push(item.path)
                        }}
                    >
                    </TabBar.Item>
                )
            })
        )
    }

    render() {
        return (
            <div className="home">
                <Route exact path='/home' component={Main}/>
                <Route path='/home/findhouse' component={Findhouse}/>
                <Route path='/home/news' component={News}/>
                <Route path='/home/mine' component={Mine}/>

                <div className="tabBarBox">
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#25B409"
                        barTintColor="white"
                        noRenderContent={true}
                        tabBarPosition="bottom"
                        >
                        {this.getTabBarList()}
                    </TabBar>
                </div>
                
            </div>
        )
    }
}
