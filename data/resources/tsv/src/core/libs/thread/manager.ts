import { EnumLogContainer, LogData } from '../../declares/log';
import { ThreadModule } from '../../declares/threads';
import { Log } from '../log';
import _t from '../../../config/i18n';

import { Thread } from './threads';

const log: LogData = {
  namespace: 'CoreThread',
  container: EnumLogContainer.Manager,
};

class ThreadManager {
  private manager: Array<Thread>;

  constructor() {
    log.location = 'constructor()';
    Log.safemode({
      ...log,
      message: _t('core.thread.manager.constructor.create'),
    });
    this.manager = [];
  }

  createThread(newThread: ThreadModule): Thread {
    log.location = 'createThread()';
    Log.debug({
      ...log,
      message: _t('core.thread.manager.createThread.creating', { threadName: newThread.name }),
    });
    const currentThread =
      this.manager.find((thread) => {
        let threadFound = false;
        if (!thread.isFull) {
          threadFound = thread.isDUIThread
            ? !!newThread.isDUIThread
            : (newThread.timer || 1) === thread.frequency;
        }
        return threadFound;
      }) || new Thread(newThread.timer, newThread.isDUIThread);

    if (currentThread === undefined) {
      this.manager.push(currentThread);
    }

    if (currentThread.isFull) {
      Log.debug({
        ...log,
        message: _t('core.thread.manager.createThread.isFull', newThread.name),
        isChild: true,
        isLast: true,
      });
    }
    const thread = currentThread.addOne(newThread);

    Log.confirm({
      ...log,
      message: _t('core.thread.manager.createThread.added', { threadName: newThread.name }),
      isChild: true,
      isLast: true,
    });

    return thread;
  }
}

export { ThreadManager };
