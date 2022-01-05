import '@vkontakte/vkui/dist/vkui.css';

import ReactDOM from 'react-dom';

import { App } from './App';
import { init } from './route';

import {
  init as initRouter,
  start as startRouter
} from '@mntm/native-router';

initRouter(init);
startRouter();

ReactDOM.render(<App />, document.getElementById('root'));
