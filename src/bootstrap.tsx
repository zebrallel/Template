import React from 'react';
import ReactDOM from 'react-dom';

export default function bootstrap(Component) {
  ReactDOM.render(<Component />, document.getElementById('root'));
}
