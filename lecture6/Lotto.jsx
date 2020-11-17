import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import Ball from './Ball';
// Hooks는 선언되는 위치가 매우 중요하다. 조건문 절대금지, 최상위에 위치, useState 사용금지. - 반복문은 가능하지만 추천되진 않는다.

// useMemo 는 함수의 결괏값을 기억한다.    
// useCallback 은 함수 자체를 기억한다.
// useCallback 은 FC가 다시 실행될때 UCB의 함수는 매번 다시 만들지 않는다.
// useCallback 안에서 state를 쓸 경우 새로운 값으로 바뀌지 않을 수 있다. 주의! 
// 따라서 inputs에 state를 넣어 주어서 해당 state변경시 함수가 다시 호출 되게 해야한다.
// 둘다 inputs[] 가 바뀔때까지 기억한다!

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

// 함수컴포넌트 전체가 재실행됨. getWinNumbers가 공이 뽑힐때마다 실행됨 따라서 winNumber를 캐싱(기억)을 시킨다 (useMemo) 사용

const Lotto = () => {
    const [ winBalls, setWinBalls ] = useState([]);
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    // useMemo는 useEffect와 비슷하게 inputs([])에 조건을 넣고 해당인자가 변화하면 해당 함수를 호출시킨다.
    // 함수 실행값 저장
    const [ winNumbers, setWinNumber ] = useState(lottoNumbers);    
    const [ bonus, setBonus ] = useState(null);
    const [ redo, setRedo ] = useState(false);
    const timeouts = useRef([]);

    // useMemo : 복잡한 함수 결괏값을 기억
    // useRef : 일반 값을 기억

    // useEffect를 CDU에서만 작동하게 하는방법(CDM 때는 작동안함) - 패턴임
    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current){
            mounted.current = true;     // didMount 영역 아무것도 실행안함.
        }else{
            // ajax
        }

    }, [바뀌는값]);     // componentDidUpdate O , componentDidMount X


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
    // inputs가 바뀔대 실행된다.!

    const onClickRedo = useCallback(() => {     // useCallback은 자식 props로 함수를 넘겨줄때는 항상 사용해야한다! - 계속 새로운 props를 제공하는 것으로 인식.
        console.log('onCllickRedo');
        console.log(winNumbers);    // 새로운 값으로 없뎃이 안됨.
        setWinNumber(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];      //currunet를 직접 바꾼거라 바꾼거임.
        // CDM의 코드들을 복붙해서 가져와도 되지만 CDU에 실행하게 함.
    }, [winNumbers]); // inputs에 넣어줘야 업데이트됨.(inputs가 바뀌면 업뎃)

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
