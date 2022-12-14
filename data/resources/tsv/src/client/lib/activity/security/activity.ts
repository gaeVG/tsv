import { UserActivityType } from '../../../../core/declares/activity';
import { Activity } from '..';

class Security extends Activity {
  constructor(activity: UserActivityType) {
    if (activity.job !== 'security') {
      return;
    }

    super({
      for: activity.for,
      job: 'security',
      role: activity.role,
    });
  }

  init() {
    console.log('security init');
  }
}

export { Security };
