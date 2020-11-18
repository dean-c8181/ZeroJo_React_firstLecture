import React, { useCallback } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './Tictactoe';

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
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
}

export default Td;