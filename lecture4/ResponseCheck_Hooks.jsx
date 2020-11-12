import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
    const [ state, setState ] = useState('waiting');
    const [ message, setMessage ] = useState('클릭해서 시작하세요!!.');
    const [ result, setResult ] = useState([]);
    // state는 바뀌면 return 부분이 항상 랜더링됨. 아래 ref는 해당사항없음.
    // Ref는 DOM을 직접 선택할때, 그리고 Hooks에서는 this속성을 표현할때 사용.
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();
    // 값이 바뀌긴 하지만 랜더링 시키고 싶지 않는 값들은 ref에 넣어 사용하기도함.


    const onClickScreen = () => {
        const randomTimer = Math.floor(Math.random()  * 1000) + Math.floor(Math.random() * 4000)    // ~5초 랜덤

        if(state === 'waiting'){
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.')

            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금클릭!');
                startTime.current = new Date();     // 초록색이 된 순간부터 반응속도 체크 new Date(), Date.now() 둘다 실행될때의 시간을 기록하지만 성능은 Date.now() 더 빠르다.
            }, parseInt(randomTimer));
            //console.log(parseInt(randomTimer));
        }else if(state === 'ready'){        // 성급하게 클릭
            clearTimeout(timeout.current);     // 셋타임 아웃 초기화 시키기 - clearTimeout 은 내장함수.
            setState('waiting');
            setMessage('너무 성급하시군요. 초록색이 된 후에 클릭하세요.')
        }else if(state ==='now'){       // 반응속도 체크
            endTime.current = Date.now();
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((preResult) => [...preResult, endTime.current - startTime.current])
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return(
            result.length === 0 ? null : 
            <>
                <div>평균시간 {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>초기화</button>
                {result.map((rst, i) => <div key={i + 'chasi'}>{`${i+1}차시 : ${rst}ms`}</div>)}
            </>
        )
    };
    
    // return안에서 if, for문을 쓰고 싶으면 즉시실행 함수안에 넣어서 써야함. (굳이 그럴필요가 없어서 다 함수로 빼서 사용.)
    /*  ex.
    {(() => {
        if(true){
            return '트루히요'
        }else{
            return '포스'
        }

        const array = [];
        for(let i = 0; i < tries.length; i++){
            array.push(<Try key={`${index + 1}차 시도`} tryInfo={y} i={index}/>);
        }
        retrun array;

        {tries.map((y, index) => {
            return(
                <Try key={`${index + 1}차 시도`} tryInfo={y} i={index}/>
            );
        })}
    })()}
    
    */
    return(
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
            {/* 함수로뺌 */}
            {renderAverage()}
        </>
    );


}

export default ResponseCheck;