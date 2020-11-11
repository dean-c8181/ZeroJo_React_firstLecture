import React, { PureComponent } from 'react';       // 기존 li가 렌더링 되지 않음

class Try extends PureComponent{

    render() {
        const { tryInfo } = this.props;
        return(
            <>
                <li>
                    <div>{tryInfo.try}</div>
                    <div>{tryInfo.result}</div>
                </li>
            </>
        )
    }
}

export default Try;