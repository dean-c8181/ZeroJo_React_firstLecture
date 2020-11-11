import React from 'react';
import { render } from 'react-dom';

// js로 만들어도 상관없지만 JSX를 사용하려면 JSX파일로 만드는게 좋다.

import NumberBaseball from './NumberBaseball.jsx';
//import NumberBaseball from './RenderTest.jsx';
//import NumberBaseball from './RenderTest2.jsx';

render(<NumberBaseball />, document.querySelector('#root'));