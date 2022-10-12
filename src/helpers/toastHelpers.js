import { useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ReactComponent as ErrorIcon } from '~/assets/toast/error.svg';
import { ReactComponent as InformationalIcon } from '~/assets/toast/informational.svg';
import { ReactComponent as SuccessIcon } from '~/assets/toast/success.svg';
import { ReactComponent as WarningIcon } from '~/assets/toast/warning.svg';

/**
 * Confirm a task was completed as expected
 */
const ToastSuccess = ({
  show = false,
  heading = '',
  content = '',
  button1Content = '',
  handleClickButton1 = () => {},
  button2Content = '',
  handleClickButton2 = () => {},
  theme = 'light',
  onHide = () => {},
  isLoading = false,
  headingLoading = '',
  contentLoading = '',
  timeClose = 30000,
}) => {
  const notify = () => toast(
    <div>
      {heading && <h1>{heading}</h1>}
      {content && <p>{content}</p>}
      {(button1Content || button2Content) && (
      <div className="d-flex align-items-center" style={{ gap: '24px' }}>
        {button1Content && (
        <Button onClick={handleClickButton1}>{button1Content}</Button>
        )}
        {button2Content && (
        <Button onClick={handleClickButton2}>{button2Content}</Button>
        )}
      </div>
      )}
    </div>,
    {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: timeClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      icon: <SuccessIcon />,
      theme,
      toastId: 'notify-success',
      onClose: onHide,
    },
  );

  const notifyLoading = () => toast(
    <div>
      {headingLoading && <h1>{headingLoading}</h1>}
      {contentLoading && <p>{contentLoading}</p>}
    </div>,
    {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: timeClose,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: 0,
      icon: <Spinner animation="border" />,
      theme,
      toastId: 'notify-success-loading',
    },
  );

  useEffect(() => {
    if (show) {
      if (isLoading) {
        notifyLoading();
      } else {
        notify();
      }
    }
  }, [show, isLoading]);

  return (
    <>
      {show && !isLoading && <ToastContainer className="toast-success" />}
      {isLoading && (
        <ToastContainer className="toast-success toast-loading toast-loading-success" />
      )}
    </>
  );
};

/**
 * Inform users of an error or critical failure
 */
const ToastError = ({
  show = false,
  heading = '',
  content = '',
  button1Content = '',
  handleClickButton1 = () => {},
  button2Content = '',
  handleClickButton2 = () => {},
  theme = 'light',
  onHide = () => {},
  isLoading = false,
  headingLoading = '',
  contentLoading = '',
  timeClose = 30000,
}) => {
  const notify = () => toast(
    <div>
      {heading && <h1>{heading}</h1>}
      {content && <p>{content}</p>}
      {(button1Content || button2Content) && (
      <div className="d-flex align-items-center" style={{ gap: '24px' }}>
        {button1Content && (
        <Button onClick={handleClickButton1}>{button1Content}</Button>
        )}
        {button2Content && (
        <Button onClick={handleClickButton2}>{button2Content}</Button>
        )}
      </div>
      )}
    </div>,
    {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: timeClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      icon: <ErrorIcon />,
      theme,
      toastId: 'notify-error',
      onClose: onHide,
    },
  );

  const notifyLoading = () => toast(
    <div>
      {headingLoading && <h1>{headingLoading}</h1>}
      {contentLoading && <p>{contentLoading}</p>}
    </div>,
    {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: timeClose,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: 0,
      icon: <Spinner animation="border" />,
      theme,
      toastId: 'notify-error-loading',
    },
  );

  useEffect(() => {
    if (show) {
      if (isLoading) {
        notifyLoading();
      } else {
        notify();
      }
    }
  }, [show, isLoading]);

  return (
    <>
      {show && !isLoading && <ToastContainer className="toast-error" />}
      {isLoading && (
        <ToastContainer className="toast-error toast-loading toast-loading-error" />
      )}
    </>
  );
};

/**
 * Taking actions that are not desirable or might have unexpected results
 */
const ToastWarning = ({
  show = false,
  heading = '',
  content = '',
  button1Content = '',
  handleClickButton1 = () => {},
  button2Content = '',
  handleClickButton2 = () => {},
  theme = 'light',
  onHide = () => {},
  isLoading = false,
  headingLoading = '',
  contentLoading = '',
  timeClose = 30000,
}) => {
  const notify = () => toast(
    <div>
      {heading && <h1>{heading}</h1>}
      {content && <p>{content}</p>}
      {(button1Content || button2Content) && (
      <div className="d-flex align-items-center" style={{ gap: '24px' }}>
        {button1Content && (
        <Button onClick={handleClickButton1}>{button1Content}</Button>
        )}
        {button2Content && (
        <Button onClick={handleClickButton2}>{button2Content}</Button>
        )}
      </div>
      )}
    </div>,
    {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: timeClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      icon: <WarningIcon />,
      theme,
      toastId: 'notify-warning',
      onClose: onHide,
    },
  );

  const notifyLoading = () => toast(
    <div>
      {headingLoading && <h1>{headingLoading}</h1>}
      {contentLoading && <p>{contentLoading}</p>}
    </div>,
    {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: timeClose,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: 0,
      icon: <Spinner animation="border" />,
      theme,
      toastId: 'notify-warning-loading',
    },
  );

  useEffect(() => {
    if (show) {
      if (isLoading) {
        notifyLoading();
      } else {
        notify();
      }
    }
  }, [show, isLoading]);

  return (
    <>
      {show && !isLoading && <ToastContainer className="toast-warning" />}
      {isLoading && (
        <ToastContainer className="toast-warning toast-loading toast-loading-warning" />
      )}
    </>
  );
};

/**
 * Provide additional information to users
 */
const ToastInformational = ({
  show = false,
  heading = '',
  content = '',
  button1Content = '',
  handleClickButton1 = () => {},
  button2Content = '',
  handleClickButton2 = () => {},
  theme = 'light',
  onHide = () => {},
  isLoading = false,
  headingLoading = '',
  contentLoading = '',
  timeClose = 30000,
}) => {
  const notify = () => toast(
    <div>
      {heading && <h1>{heading}</h1>}
      {content && <p>{content}</p>}
      {(button1Content || button2Content) && (
      <div className="d-flex align-items-center" style={{ gap: '24px' }}>
        {button1Content && (
        <Button onClick={handleClickButton1}>{button1Content}</Button>
        )}
        {button2Content && (
        <Button onClick={handleClickButton2}>{button2Content}</Button>
        )}
      </div>
      )}
    </div>,
    {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: timeClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      icon: <InformationalIcon />,
      theme,
      toastId: 'notify-informational',
      onClose: onHide,
    },
  );

  const notifyLoading = () => toast(
    <div>
      {headingLoading && <h1>{headingLoading}</h1>}
      {contentLoading && <p>{contentLoading}</p>}
    </div>,
    {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: timeClose,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: 0,
      icon: <Spinner animation="border" />,
      theme,
      toastId: 'notify-informational-loading',
    },
  );

  useEffect(() => {
    if (show) {
      if (isLoading) {
        notifyLoading();
      } else {
        notify();
      }
    }
  }, [show, isLoading]);

  return (
    <>
      {show && !isLoading && <ToastContainer className="toast-informational" />}
      {isLoading && (
        <ToastContainer className="toast-informational toast-loading toast-loading-informational" />
      )}
    </>
  );
};

export {
  ToastSuccess, ToastError, ToastWarning, ToastInformational,
};
