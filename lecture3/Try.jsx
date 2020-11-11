// Hooks로 변환

import React, { memo } from 'react';         // memo(memoization?) : PureComponent과 비슷한 기능을 해줌.

const Try = memo(({ tryInfo }) => {     // 컴포넌트를 memo()로 감싸주기
    return(
        <>
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        </>
    );
});
// class Try extends Component{

//     render() {
//         return(
//             <>
//                 <li>
//                     <div>{this.props.tryInfo.try}</div>
//                     <div>{this.props.tryInfo.result}</div>
//                 </li>
//             </>
//         )
//     }
// }

export default Try;