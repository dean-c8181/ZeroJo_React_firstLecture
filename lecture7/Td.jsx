import React, { useCallback, useEffect, useRef, memo } from 'react';
import { CLICK_CELL } from './Tictactoe';
// reRendering 확인하는방법 : useEffect, useRef 사용하기

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {      // memo 사용하여 최적화 진행. -- 주로 반복문을 메모 해주면 효과 직빵!
    // memo로도 안되면 해당 컴포넌트를 useMemo( ,[])로 감싸주어서 해당 컴포넌트를 통째로 기억하게 하는 방법이 있다.\

    ///// 최적화 확인
    const ref = useRef([]);     // 초기값 설정 - 처음랜더될때는 ref값은 그냥 []

    useEffect(() => {       // 바뀌는 props 알아보기!
        console.log(cellData);
        // console.log(ref);
        // console.log(ref.current);
        // console.log(ref.current[3]);        
        console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3],)
        // false가 되는게 바뀌는 props
        ref.current = [rowIndex, cellIndex, dispatch, cellData]; /// ref에 담아서 콘솔에서 확인 ///  이전 값 업데이트   // 여기서 최초의 prop값들을 업데이트해주고 다시 랜더링 될때 여기 전까지는 ref.current의 값이 이전 랜더링의 값들을 가지게된다. 여기서 업데이트됨.
        // console.log('-----------------------------')
        // console.log(ref.current[3] + ' : ' + cellData);
    }, [rowIndex, cellIndex, dispatch, cellData]);
    ///// 최적화 확인 ///


    const onClickTd = useCallback(() => {
        //console.log(rowIndex, cellIndex)
        if(cellData){
           return;      // 기존에 data 존재하면 그대로 종료
        }
        dispatch({ type:CLICK_CELL, row: rowIndex, cell: cellIndex });
        // dispatch는 비동기, Redux는 동기처리
        // 비동기에서 처리할때는 useEffect를 사용한다
        //dispatch({ type:CHANGE_TURN }); -- 처리 순서 때문에 Tictactoe.jsx로 옮김.
    }, [cellData])

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
})

export default Td;