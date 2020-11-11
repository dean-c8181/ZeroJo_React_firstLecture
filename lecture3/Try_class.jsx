import React, { PureComponent } from 'react';       // 기존 li가 렌더링 되지 않음

class Try extends PureComponent{
    constructor(props){     // props를 state로 바꿔줄 때 constructor을 사용하면 다른동작을 추가 해 줄 수 있다.
        super(props);  
        // 다른동작을 할 수 있다.
        const filtered = this.props.filter(() => {
            //다른동작
        });
        this.state = {
            result: filtered,
        }
    }
    
    // props를 바꾸고 싶다면 FC와 같이 state로 바꿔서 변경한다.
    state= {
        result: this.props.tryInfo.result,
    }

    onClick = () => {
        this.setState({
            result: this.props.tryInfo.result + '바뀌이이엄'
        })
    }

    render() {
        const { tryInfo } = this.props;
        return(
            <>
                <li>
                    <div>{tryInfo.try}</div>
                    <div onClick={this.onClick}>{this.state.result}</div>
                </li>
            </>
        )
    }
}

export default Try;