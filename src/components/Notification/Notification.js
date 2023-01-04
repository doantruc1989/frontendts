import { useContext } from 'react';
import NotificationContext from '../../other/NotificationContext';
import './notification.css'

function Notification() {
  const { showNotification, type, message } = useContext(NotificationContext);
  return (
    <>
      {showNotification && (
        <div className='notification'>
          {type === 'success' && <p className='successful'>{message}</p>}
          {type === 'error' && <p className='error__noti'>{message}</p>}
          {type === 'warning' && <p className='warning__noti'>{message}</p>}
        </div>
      )}
    </>
  );
}

export default Notification;
