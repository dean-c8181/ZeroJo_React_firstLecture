import React, { Component, } from 'react';

/* 
    # class의 lifecycle :
        // constructor -> render -> ref -> componentDidMount ===== (First render)
        // -> (props, state변경시) -> shouldComponentUpdate(true) ->  render -> componentDidUpdate ===== (reRender)
        // 부모가 나를 없앴을 때 -> componentWillUnount -> 소멸
*/

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
}

const scores = {
    가위: 1,
    바위: 0,
    보: -1
}

const computerChoice = (imgCoord) =>{
    return Object.entries(rspCoords).find(function(v){
        return v[1] === imgCoord;
    })[0];
}

/*
    Object는 객체형 자료 구조에 아래와 같은 메소드를 이용할 수 있게 한다. 
    Object.key(obj) : 키가 담긴 배열반환 // Object.key(rspCoords) = ['바위', '가위', '보']
    Object.value(obj) : 값이 담긴 배열 반환 // Object.value(rspCoords) = ['0', '-142px', '-284px']
    Object.entries(obj) : [key, value] 쌍이 담긴 배열 반환 // Object.entries(rspCoords)  = [ ['바위', '0'], ['가위', '142px'], ['보', '284px'] ] --- 객체를 배열로 변환시키고 배열에 담아 리턴.

    따라서 위의 코드는
    [ ['바위', '0'], ['가위', '142px'], ['보', '284px'] ].find(function(v){
        return v[1] === imgCoord; 가 된다.
    })

    find는 array(배열)의 메소드로 find(function(item, index, array) {}) 처럼 쓰이며 요소 전체를 대상 함수가 순차적으로 호출한다. 함수가 참을 반환하면 탐색은 중단되고 해당 요소가 반환된다. 
    따라서 위의 코드에서는
    find가 각각의 배열을 순차적으로 탐색하여 각 배열의 1번째 값이 imgCoord(컴퓨터의 현재 이미지 좌표 === 바위,가위,보의 여부)와 일치하여 true가 될 때까지 작동한다. 
    함수가 imgCoord와 일치하는 배열을 찾은 경우 그 배열을 리턴한다.
    ex) 컴퓨터의 현재 상태가 가위라면 첫배열(주먹)을 검사하고 false반환 > 다음배열(가위)를 검사하고 -142px이 같음을 확인 후 ['가위', '-142px'] 배열만을 반환한다.
    그리고 거기서 [0]째의 배열값을 가지고 오게되어 최종 return값은 '가위' 가 된다.
*/



class RSP extends Component{
    state = {
        result: '',
        score: 0,
        imgCoord: rspCoords.바위,
    }

    interval;
    timeout;
    
    componentDidMount() {       // 첫 랜더링이 성공적으로 실행 된 후 CDM이 실행되고 리랜더링이 될때는 실행 되지 않음. -- 비동기 요청을 많이 한다 await async
        this.interval =  setInterval(this.changeHand, 50)
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {      // 리랜더링직전에 실행
        return true;
    }

    componentDidUpdate(prevProps, prevState) {      // 리렌더링 후에 실행
        
    }

    componentWillUnmount() {        // 컴포넌트가 제거되기 직전 실행.(부모cmp가 나(자식)cmp를 제거할때)
        clearInterval(this.interval);
    }


    changeHand = () => {
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
    }

    onClickBtn = (choose) => () => {        // () =>  추가
        clearInterval(this.interval);
        clearTimeout(this.timeout);
        const { imgCoord } = this.state;        
        const myScore = scores[choose];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        const rspBtn = document.querySelector('.rspButton');
        rspBtn.classList.remove('onShow');
        if(diff === 0){
            this.setState({
                result: '비겼습니다.',
            })
        }else if ([-1, 2].includes(diff)){
            this.setState((prevState) => {
                return{
                    result: '승리!',
                    score: prevState.score + 1,
                };                
            });
        }else{
            this.setState((prevState) => {
                return{
                    result: '패배!',
                    score: prevState.score - 1,
                };                
            });
        }
        this.timeout = setTimeout(() => {
            this.interval = setInterval(this.changeHand, 50);
            rspBtn.classList.add('onShow');
        }, 1000)        
    }

    render(){
        const { result, score, imgCoord } = this.state;
        return(
            <>
                <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
                <div className="rspButton onShow">
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                    {/* onClick에 () => 을 빼면 에러남. 함수자리서 그렇다고함. () => 제거하는 경우에는 해당 함수 => 다음에 () => 를 추가해준다. ///  this.onClickBtn('가위')는 결과물이라고함 */}
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;