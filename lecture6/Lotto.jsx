import React, { useState, useRef, useEffect, } from 'react';
import Ball from './Ball';

function getWinNumbers (){      // 반복 실행 되면 안됨. -- state 안쓰는 함수는 꼭 분리하기
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];

    while (candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    // 모든 요소는 문자열로 변환된 이후 재 정렬된다. 따라서 sort를 오름차순으로 사용할때는 위와 같이 안에 함수를 넣어줘야 한다. (음수면 선, 양수면 뒤)

    return [... winNumbers, bonusNumber];
}

const Lotto = () => {
    const [ winNumbers, setWinNumber ] = useState(getWinNumbers());
    const [ winBalls, setWinBalls ] = useState([]);
    const [ bonus, setBonus ] = useState(null);
    const [ redo, setRedo ] = useState(false);
    const timeouts = useRef([]);

    useEffect(() => {
        console.log('runTimeOut');
        for(let i = 0; i < winNumbers.length - 1; i++){
            timeouts.current[i] = setTimeout(() => {    // current 배열에 요소로 넣어준거라 바뀐게 아니라고함.
                setWinBalls((prevWinball) => [...prevWinball, winNumbers[i]]);
            }, (i + 1) * 1000);
        }

        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);

        return () => {       // return은 componentWillUnmount의 역활
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            })
        };
    }, [timeouts.current])      
    // [](inputs)이 비어있으면 componentDidMount와 같은 역활을 한다.
    // [](inputs)에 state가 있으면 componentDidMount와 componentDidUpdate의 역활을 둘다 수행

    const onClickRedo = () => {
        console.log('onCllickRedo');
        setWinNumber(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];      //currunet를 직접 바꾼거라 바꾼거임.
        // CDM의 코드들을 복붙해서 가져와도 되지만 CDU에 실행하게 함.
    };

    return(
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
            
        </>
    );
}

export default Lotto;
