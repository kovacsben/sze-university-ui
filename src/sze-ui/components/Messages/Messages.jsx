import React from 'react';
import { Messages as PrimeMessages } from 'primereact/messages';

const Messages = ({
  messages = [],
  onClear = null,
  className = '',
  position = 'top-center',
}) => {
  const messagesRef = React.useRef(null);
  const [messageList, setMessageList] = React.useState(messages);

  React.useEffect(() => {
    setMessageList(messages);
  }, [messages]);

  const handleClear = () => {
    setMessageList([]);
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className={`messages-wrapper ${className}`}>
      <PrimeMessages
        ref={messagesRef}
        value={messageList}
        onRemove={(index) => {
          const newMessages = messageList.filter((_, i) => i !== index);
          setMessageList(newMessages);
        }}
      />
      {messageList.length > 0 && (
        <button
          onClick={handleClear}
          className="mt-2 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
        >
          Összes Törlése
        </button>
      )}
    </div>
  );
};

export default Messages;
