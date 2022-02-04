import { toast } from 'react-toastify';

const ToastHandler = (value, style) => {
  if (typeof value === 'string') {
    toast(
      value,
      {
        type: toast.TYPE[style],
        position: toast.POSITION.TOP_RIGHT,
      },
    );
  } else {
    for (const item of value) {
      toast(
        item.message,
        {
          type: toast.TYPE[style],
          position: toast.POSITION.TOP_RIGHT,
        },
      );
    }
  }
};

export default ToastHandler;
