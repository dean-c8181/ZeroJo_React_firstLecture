import React, { Component, } from 'react';

/* 
    # class의 lifecycle :
        // constructor -> render -> ref -> componentDidMount ===== (First render)
        // -> (props, state변경시) -> shouldComponentUpdate(true) ->  render -> componentDidUpdate ===== (reRender)
        // 부모가 나를 없앴을 때 -> componentWillUnount -> 소멸
*/


class RSP extends Component{
    state = {
        result: '',
        score: 0,
        imgCoord: 0,
    }
    
    componentDidMount() {       // 첫 랜더링이 성공적으로 실행 된 후 CDM이 실행되고 리랜더링이 될때는 실행 되지 않음.
        
    }
    
    shouldComponentUpdate(nextProps, nextState, nextContext) {      // 리랜더링직전에 실행
        
    }

    componentDidUpdate(prevProps, prevState) {      // 리렌더링 후에 실행
        return true;
    }

    componentWillUnmount() {        // 컴포넌트가 제거되기 직전 실행.(부모cmp가 나(자식)cmp를 제거할때)
        
    }

    render(){
        const { result, score, imgCoord } = this.state;
        return(
            <>
                <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
                <div>
                    <button id="rock" className="btn" onClick={() => onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={() => onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={() => onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;