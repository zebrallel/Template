import React from 'react';
import ReactDOM from 'react-dom';

import '@/styles/index.less'

export default function bootstrap(Component: typeof React.Component) {
  ReactDOM.render(<Component />, document.getElementById('root'));
}
