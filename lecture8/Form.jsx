import React, { useCallback, useState, useContext, memo } from 'react';
// useContext 로 데이터를 가져온다.
import { TableContext, START_GAME } from './MineSearch';

const Form = memo(() => {
    const [row, setRow] = useState(10);
    const [cell, setCell] = useState(10);
    const [mine, setMine] = useState(20);
    const { dispatch } = useContext(TableContext);     // context 불러오기

    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);

    }, []);

    const onChangeCell = useCallback((e) => {
        setCell(e.target.value);
    }, []);

    const onChangeMine = useCallback((e) => {
        setMine(e.target.value);
    }, []);

    const onClickBtn = useCallback(() => {      // conText API 적용
        dispatch({type: START_GAME, row, cell, mine });
    }, [row, cell, mine]);

    return (
        <>
            <div>
                <input type="number" placeholder={`세로`} value={row} onChange={onChangeRow} />
                <input type="number" placeholder={`가로`} value={cell} onChange={onChangeCell} />
                <input type="number" placeholder={`지뢰`} value={mine} onChange={onChangeMine} />
                <button onClick={onClickBtn}>시작</button>
            </div>
        </>
    );
})

export default Form;