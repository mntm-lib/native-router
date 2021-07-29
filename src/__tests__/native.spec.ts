import { clearHistory } from './utils/dom.js';

import { weakUniqueId } from '@mntm/shared';

import * as native from '../native.js';

export default describe('native', () => {
  beforeEach(clearHistory);

  it('replaceNative', async () => {
    const id = weakUniqueId();

    native.replaceNative({ id });

    expect(window.history.length).toBe(1);
    expect(window.history.state).toMatchObject({ id });
  });

  it('pushNative', async () => {
    const id = weakUniqueId();

    native.pushNative({ id });

    expect(window.history.length).toBe(2);
    expect(window.history.state).toMatchObject({ id });
  });

  it('popNative', async () => {
    const from = weakUniqueId();
    const to = weakUniqueId();

    native.replaceNative({ id: from });
    native.pushNative({ id: to });

    native.popNative();

    expect(window.history.length).toBe(2); // forward history
    expect(window.history.state).toMatchObject({ id: from });
  });

  it('moveByNative', async () => {
    const from = weakUniqueId();
    const to = weakUniqueId();

    native.replaceNative({ id: from });
    native.pushNative({ id: to });

    native.moveByNative(-1);

    expect(window.history.length).toBe(2); // forward history
    expect(window.history.state).toMatchObject({ id: from });

    native.moveByNative(1);

    expect(window.history.length).toBe(2);
    expect(window.history.state).toMatchObject({ id: to });
  });
});
