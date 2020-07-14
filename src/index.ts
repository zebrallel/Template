import App from '@/App';
import bootstrap from '@/bootstrap';

bootstrap(App);

if (module.hot) {
  module.hot.accept('./App', () => bootstrap(App));
}