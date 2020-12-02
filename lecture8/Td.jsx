import React, { useCallback, useContext, memo, useMemo } from 'react';
import {CODE, OPEN_CELL, TableContext, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, CLICKED_MINE } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
                return{
                    background: '#444',
                    color: '#F00'
                }
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
                return{
                    background: 'white',
                }
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
                return{
                    background:'yellow',
                }
        case CODE.FLAG:
        case CODE.FLAG_MINE:
                return{
                    background:'GREEN',
                }
        default:
            return{
                background: 'white',
            }
    }
};

const getTdText = (code) => {
    //console.log('getTdText');        해당 td만 리랜더링됨

    switch(code){
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return '';
        case CODE.CLICKED_MINE:
            return '💥';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '🚩';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '❓';
        default:
            return code || '';
    }
};

const Td = memo(({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if (halted) {       // 게임이 멈췄을때 클릭 이벤트 안일어남.
            return;
        }
        switch(tableData[rowIndex][cellIndex]){
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return;
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE:
                dispatch({ type: CLICKED_MINE, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }        
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        if (halted) {
            return;
        }
        switch(tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);
    
    // console.log('rd rendered'); td 하나를 클릭해도 모든 td가 리랜더링됨 > useMemo 사용하여 캐싱하기
    // conText API를 쓰면 td라는 함수는 매번 실행된다 but retrun은 필요한 만큼만 실행된다(cuz useMemo)
    // conText API 모두 리랜더링 시킴.(??)

    return useMemo(() => (
         <td
            style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}    // 마우스 오른쪽 클릭
         >{getTdText(tableData[rowIndex][cellIndex])}</td>
    ), [tableData[rowIndex][cellIndex]]);
})

// useMemo 대신 컴포넌트를 분리시키는 방법도 있음

//     return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex] />;
// })

// const RealTd = memo(({ onClickTd, onRightClickTd, data}) =>{
//     console.log('real td rendered');
//     return(
//         <td
//             style={getTdStyle(data)}
//             onClick={onClickTd}
//             onContextMenu={onRightClickTd}
//         >{getTdText(data)}    
//         </td>
//     )
// })

 
export default Td;