import React from 'react';
import { RADIUS, DURATION } from '../../theme/tokens';

const Message = ({
  severity = 'info',
  text = '',
  title = '',
  icon = null,
  closable = true,
  onClose = null,
  radius,
  className = '',
  style = {},
}) => {
  const radiusCls = RADIUS[radius] ?? RADIUS.lg;
  const [visible, setVisible] = React.useState(true);

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!visible) return null;

  const severityStyles = {
    info: {
      icon: 'pi pi-info-circle',
      bg: 'bg-blue-50',
      border: 'border-l-4 border-blue-500',
      text: 'text-blue-800',
    },
    success: {
      icon: 'pi pi-check-circle',
      bg: 'bg-green-50',
      border: 'border-l-4 border-green-500',
      text: 'text-green-800',
    },
    warning: {
      icon: 'pi pi-exclamation-triangle',
      bg: 'bg-yellow-50',
      border: 'border-l-4 border-yellow-500',
      text: 'text-yellow-800',
    },
    error: {
      icon: 'pi pi-times-circle',
      bg: 'bg-red-50',
      border: 'border-l-4 border-red-500',
      text: 'text-red-800',
    },
  };

  const styles = severityStyles[severity] || severityStyles.info;

  return (
    <div
      className={`flex items-start gap-3 p-4 ${radiusCls} ${styles.bg} ${styles.border} ${className}`}
      style={style}
    >
      {/* Icon */}
      <div className="flex-shrink-0 pt-0.5">
        <i className={`${icon || styles.icon} ${styles.text} text-lg`} />
      </div>

      {/* Content */}
      <div className="flex-1">
        {title && (
          <h4 className={`font-semibold ${styles.text} mb-1`}>
            {title}
          </h4>
        )}
        {text && (
          <p className={`text-sm ${styles.text}`}>
            {text}
          </p>
        )}
      </div>

      {/* Close Button */}
      {closable && (
        <button
          onClick={handleClose}
          className={`flex-shrink-0 ${styles.text} hover:opacity-70 transition-opacity ${DURATION.normal} p-1`}
          aria-label="Close message"
        >
          <i className="pi pi-times text-lg" />
        </button>
      )}
    </div>
  );
};

export default Message;
