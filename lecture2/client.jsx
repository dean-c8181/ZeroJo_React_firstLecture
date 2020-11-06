import React from 'react';
import { render } from 'react-dom';

// js로 만들어도 상관없지만 JSX를 사용하려면 JSX파일로 만드는게 좋다.

import WordRelay from './WordRelay.jsx';

render(<WordRelay />, document.querySelector('#root'));