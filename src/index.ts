import './styles/style.scss';

import Game from './models/Game';
import { WIDTH_GAME, HEIGHT_GAME } from './constant';

window.addEventListener('load', () => {
    const game = new Game({
        width: WIDTH_GAME,
        height: HEIGHT_GAME,
    });
    game.start();
});
