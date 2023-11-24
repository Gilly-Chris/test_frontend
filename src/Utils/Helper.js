import { EventEmitter } from './Events';
import { NotificationManager } from 'react-notifications';

const showToast = (type, time, message, title = '') => {
  switch (type) {
    case 'success':
      NotificationManager.success(message, title, time);
      break;
    case 'warning':
      NotificationManager.warning(message, title, time);
      break;
    case 'error':
      NotificationManager.error(message, title, time);
      break;
    default: break;
  }
}

const showSpinner = () => {
  EventEmitter.dispatch('isLoading', true);
}

const hideSpinner = () => {
  EventEmitter.dispatch('isLoading', false);
}

export {
  showToast,
  showSpinner,
  hideSpinner
};

const Helper = {
  showToast,
  showSpinner,
  hideSpinner
}

export default Helper;