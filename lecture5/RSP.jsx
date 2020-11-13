import React, { Component, } from 'react';

/* 
    # class의 lifecycle :
        // constructor -> render -> ref -> componentDidMount ===== (First render)
        // -> (props, state변경시) -> shouldComponentUpdate(true) ->  render -> componentDidUpdate ===== (reRender)
        // 부모가 나를 없앴을 때 -> componentWillUnount -> 소멸
*/

const rspCoords = {
    가위: '0',
    바위: '-142px',
    보: '-284px'
}

const scrores = {
    가위: 1,
    바위: 0,
    보: -1
}


class RSP extends Component{
    state = {
        result: '',
        score: 0,
        imgCoord: '0',
    }

    interval;
    
    componentDidMount() {       // 첫 랜더링이 성공적으로 실행 된 후 CDM이 실행되고 리랜더링이 될때는 실행 되지 않음. -- 비동기 요청을 많이 한다 await async
        this.interval =  setInterval(() => {
            const { imgCoord } = this.state;    // 이거 밖에다 두면 작동안함 > 비동기, closure -- 바깥에서 선언하면 imgCoord값이 초기값으로 고장됨(한번만 불러오니까)
            //console.log(imgCoord);
            if(imgCoord === rspCoords.가위){
                this.setState({
                    imgCoord : rspCoords.바위,
                });
            }else if(imgCoord === rspCoords.바위){
                this.setState({
                    imgCoord : rspCoords.보,
                });
            }else{
                this.setState({
                    imgCoord : rspCoords.가위,
                });
            }
        }, 1000)
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {      // 리랜더링직전에 실행
        return true;
    }

    componentDidUpdate(prevProps, prevState) {      // 리렌더링 후에 실행
        
    }

    componentWillUnmount() {        // 컴포넌트가 제거되기 직전 실행.(부모cmp가 나(자식)cmp를 제거할때)
        
    }

    onClickBtn = (choose) => {
        alert(choose);
    }

    render(){
        const { result, score, imgCoord } = this.state;
        return(
            <>
                <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
                <div>
                    <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;