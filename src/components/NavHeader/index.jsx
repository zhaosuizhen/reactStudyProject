import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

import propTypes from 'prop-types'

class NavHeader extends Component {
    render() {
        return (
            <div>
                <NavBar
                    className="navBar"
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                    rightContent={[
                        // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        // <Icon key="1" type="ellipsis" />,
                    ]}
                >{this.props.title}</NavBar>
            </div>
        )
    }
}

NavHeader.propTypes = {
    title: propTypes.string
}
NavHeader.defaultProps = {
    title: '默认标题'
}

export default withRouter(NavHeader)
