import React from 'react';
import { BrowserRouter, HashRouter, Link, Route } from 'react-router-dom';
// BrowserRouter : 새로고침하면 안뜬다(써버에서 따로 처리를 해야 한다. 검색엔진에 걸리게 하는것도 처리 필요함) - 서버쪽 세팅이 더 필요함 / 실무에적합
// HashRouter : 검색엔진에 잡히지 않는다 / 새로고침가능(프론트에서 작동) // 관리자 페이지에 적합 -- 서버가 모르기 때문에 잘 안쓰임
// import NumberBaseball from '../lecture3/NumberBaseball_class';
// import RSP from '../lecture4/ResponseCheck';
// import Lotto from '../lecture6/Lotto_class';
// 동적라우트 매칭으로 GameMatcher에서 분기처리
import GameMatcher from './GameMatcher';

const Games = () => {


    return(
        <BrowserRouter>
            <div>
                {/* 바뀌지 않는영역 - 레이아웃 */}
                {/* query string  키=값&키=값  주소에 데이터를 전달하는 가장 쉬운방법 > 서버도 인식함 */}
                <Link to="/game/number-baseball?query=10&key=value&hi=bye">숫자야구</Link>
                <Link to="/game/rock-scissors-paper">가위바위보</Link>
                <Link to="/game/lotto-generator">로또추첨</Link>
                <Link to="/game/index">동적라우트매칭</Link>
            </div>
            <div>
                {/* 라우트영역  - 바뀌는 영역*/}
                {/* <Route path="/number-baseball" component={NumberBaseball}></Route>
                <Route path="/rock-scissors-paper" component={RSP}></Route>
                <Route path="/lotto-generator" component={Lotto}></Route> */}
                {/* 동적라우트매칭 */}
                <Route path="/game/:name" component={GameMatcher}></Route>
            </div>
        </BrowserRouter>
    );
}

// route가 너무 많이 늘어나면 관리가 힘들기 때문에 동적라우트매칭(DynamicRouteMatching)을 사용한다.
// 동적 라우트 매칭에서 조건에 따른 화면을 보여주면됨.

export default Games;