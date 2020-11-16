import React, { useState, useRef, useEffect, } from 'react';


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



const RSP = () => {
    const [ result, setResult ] = useState('');
    const [ score, setScore ] = useState(0);
    const [ imgCoord, setImgCoord ] = useState(rspCoords.바위);     // 상수로 빼줌
    const interval = useState();
    const timeout = useRef();

    useEffect(() => {   // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
        interval.current = setInterval(changeHand, 50);
        return () => {  // componentWillUnmount 역할
            clearInterval(interval.current);
        }
    }, [imgCoord,]);     // []배열이 class의 클로저문제 해결과 같은 역할 - useEffect를 실행하고 싶은 state 넣기
    // [] 안에 state가 바뀔때마다 useEffect가 계속 실행됨. []에 아무것도 넣지않으면 뭐가 바뀌어도 한번만 실행 함.
    // state별로 다른 이펙트를 내고 싶으면 useEffect 를 여러번 써서 사용!

    const changeHand = () => {
        if(imgCoord === rspCoords.가위){
            setImgCoord(rspCoords.바위);
        }else if(imgCoord === rspCoords.바위){
            setImgCoord(rspCoords.보);
        }else{
            setImgCoord(rspCoords.가위);
        }
    }

    const onClickBtn = (choose) => () => {        // () =>  추가
        clearInterval(interval.current);
        clearTimeout(timeout.current);
        const myScore = scores[choose];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        const rspBtn = document.querySelector('.rspButton');
        rspBtn.classList.remove('onShow');
        if(diff === 0){
            setResult('비겼읍니다.')
        }else if ([-1, 2].includes(diff)){
            setResult('Victory!');
            setScore((preScore) => prevState.score + 1);
        }else{
            setResult('lose');
            setScore((prevScore) => {return prevScore.score - 1});
        }
        timeout.current = setTimeout(() => {
            interval.current = setInterval(changeHand, 50);
            rspBtn.classList.add('onShow');
        }, 1000)        
    }

    return(
        <>
            <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
            <div className="rspButton onShow">
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
                {/* onClick에 () => 을 빼면 에러남. 함수자리서 그렇다고함. () => 제거하는 경우에는 해당 함수 => 다음에 () => 를 추가해준다. */}
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
}

export default RSP;