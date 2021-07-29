import { clearHistory } from './utils/dom.js';

import * as real from '../real.js';
import * as history from '../history.js';

export default describe('real | history', () => {
  beforeEach(clearHistory);

  it('setHistory', async () => {
    const one: any[] = [];
    const two: any[] = [];

    // prepare after
    const after = jest.fn();
    history.afterUpdateHistory(after);

    // prepare watcher
    const watcher = jest.fn();
    history.watchHistory(watcher);

    real.setHistory(one);
    expect(real.realHistory).toBe(one);
    expect(after).toBeCalledTimes(1);
    expect(watcher).toBeCalledTimes(1);

    real.setHistory(two);
    expect(real.realHistory).toBe(two);
    expect(after).toBeCalledTimes(1);
    expect(watcher).toBeCalledTimes(2);

    // prepare new after
    history.afterUpdateHistory(after);

    real.setHistory(one);
    expect(real.realHistory).toBe(one);
    expect(after).toBeCalledTimes(2);
    expect(watcher).toBeCalledTimes(3);

    // clear
    history.unwatchHistory(watcher);

    real.setHistory(two);
    expect(real.realHistory).toBe(two);
    expect(after).toBeCalledTimes(2);
    expect(watcher).toBeCalledTimes(3);
  });
});
