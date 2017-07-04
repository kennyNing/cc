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

//require submodule
import Page from '../../components/page';
import ChatHistoryItem from '../../components/chatHistoryItem'

import "./index.scss";

class ChatHistory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page id='chat-history'>
                <div className="chat-history-list">
                    <ChatHistoryItem />
                    <ChatHistoryItem />
                    <ChatHistoryItem />
                    <ChatHistoryItem />
                    <ChatHistoryItem />
                    <ChatHistoryItem />
                    <ChatHistoryItem />
                    <ChatHistoryItem />
                    <ChatHistoryItem />
                    <ChatHistoryItem />
                    <ChatHistoryItem />
                    <ChatHistoryItem />
                </div>
            </Page>
        );
    }
    /**
     * 获取标题内容
     */
    getTitle() {
        var title = '守望先锋';
        return title;
    }
    /**
     * 组件渲染完成调用
     */
    componentDidMount() {
        //动态设置页面标题
        var title = this.getTitle();
        Base.setTitle(title);
        // this.getInitData();
        // if (!this.props.isFetching) {
        //     AppModal.hide();
        // }
    }
    /**
     * 属性改变的时候触发
     * @param {object} nextProps props
     */
    componentWillReceiveProps(nextProps) {
        if (!nextProps.isFetching) {
            AppModal.hide();
        }
    }

    /**
     * 组件渲染完成调用
     */
    componentWillUnmount() {
    }

}


let mapStateToProps = state => {
    return ({
        isFetching: state.homeData.isFetching
    });
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);
