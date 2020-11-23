import React, { useCallback, useContext } from 'react';
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

const Td = ({ rowIndex, cellIndex }) => {
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

    return (
         <td
            style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}    // 마우스 오른쪽 클릭
         >{getTdText(tableData[rowIndex][cellIndex])}</td>
    );
}
 
export default Td;