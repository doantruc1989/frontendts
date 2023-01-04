import { useContext } from 'react';
import NotificationContext from '../../other/NotificationContext'

function SuccessNotification() {
    const { notificationHandler } = useContext(NotificationContext);

    function handler() {
        notificationHandler({ type: 'success', message: 'Add Product successfully' });
    }
    return (
        <>
            <h2>SuccessNotification</h2>
            <button className='btn' onClick={handler}>
                Add Product successfully
            </button>
        </>
    );
}

export default SuccessNotification;
