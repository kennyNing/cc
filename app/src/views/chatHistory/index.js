/** 
 * @component index.js
 * @time CreateTime
 * @author zhao
 */

'use strict';

// require core module
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { hashHistory } from 'react-router'

//require submodule
import Page from '../../components/page';
import ChatHistoryItem from '../../components/chatHistoryItem'
import ScrollList from '../../components/scrollList'

import { getMyFriendList, getFriendTotal } from './reducer/action'

import "./index.scss";

class ChatHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            pageNumber: 10
        }
    }

    onLoadData(page) {
        let opt = {
            user_id: AV.User.current().id,
            pageSize: page,
            pageNumber: this.state.pageNumber,
        }
        this.props.getMyFriendList(opt).then(() => this.setState({ page }))
    }

    getComponent() {
        let { list } = this.props, component = ""
        if (list.length > 0) {
            component = list.map((obj, key) => <ChatHistoryItem key={key} data={obj} onClick={() => hashHistory.push(RoutPath.ROUTER_CHAT_VIEW + "/" + obj.get("friend").id)} />)
        } else {
            component = <div className="no-friends">暂时没有人私信你哦<br />快炫耀一下让朋友们都看到吧</div>
        }
        return component
    }

    render() {
        let { total } = this.props, pageTotal
        if (total > 0) {
            pageTotal = Math.ceil(total / this.state.pageNumber)
        } else {
            pageTotal = 1
        }
        return (
            <Page id='chat-history'>
                <ScrollList className="chat-history-list" currentPage={this.state.page} pageTotal={pageTotal} onScroll={page => this.onLoadData(page)}>
                    {this.getComponent()}
                </ScrollList>
            </Page>
        );
    }
    /**
     * 获取标题内容
     */
    getTitle() {
        var title = '英雄执照';
        return title;
    }
    /**
     * 组件渲染完成调用
     */
    componentDidMount() {
        //动态设置页面标题
        var title = this.getTitle();
        Base.setTitle(title);
        this.setState({
            page: 0,
        })
        this.onLoadData(0)
        this.props.getFriendTotal({ user_id: AV.User.current().id })
        //初始化分享
        if (Base.isWeiXinPlatform()) {
            let currentUser = Base.getLocalStorageObject('CURRENT_USER');  //获取当前用户
            lc_api.initWXShare(currentUser);
        }
    }
    /**
     * 属性改变的时候触发
     * @param {object} nextProps props
     */
    componentWillReceiveProps(nextProps) {
    }

    /**
     * 组件渲染完成调用
     */
    componentWillUnmount() {
    }

}


let mapStateToProps = state => {
    return ({
        list: state.chatHistoryData.friendList,
        total: state.chatHistoryData.total,
    });
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMyFriendList, getFriendTotal }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);
