import { useState } from "react";
import { Button, IconButton } from "sze-ui";

export default function Pelda() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="space-y-6">
      {/* Message List Demo */}
      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            label="Info Hozzáadása"
            severity="secondary"
            onClick={() => {
              setMessages([
                ...messages,
                { severity: 'info', title: 'Info', text: 'Ez egy információs üzenet.' }
              ]);
            }}
          />
          <Button
            label="Success Hozzáadása"
            severity="success"
            onClick={() => {
              setMessages([
                ...messages,
                { severity: 'success', title: 'Siker', text: 'A műveletet sikeresen végrehajtva.' }
              ]);
            }}
          />
          <Button
            label="Error Hozzáadása"
            severity="danger"
            onClick={() => {
              setMessages([
                ...messages,
                { severity: 'error', title: 'Hiba', text: 'Valami hiba történt!' }
              ]);
            }}
          />
          <Button
            label="Összes Törlése"
            outlined
            onClick={() => setMessages([])}
          />
        </div>

        {/* Messages Container */}
        {messages.length > 0 && (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            {messages.map((msg, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className={`flex-1 p-3 rounded-lg border-l-4 ${
                    msg.severity === 'info'
                      ? 'bg-blue-50 border-blue-500 text-blue-800'
                      : msg.severity === 'success'
                      ? 'bg-green-50 border-green-500 text-green-800'
                      : 'bg-red-50 border-red-500 text-red-800'
                  }`}
                >
                  {msg.title && (
                    <p className="font-semibold mb-1">{msg.title}</p>
                  )}
                  <p className="text-sm">{msg.text}</p>
                </div>
                <IconButton
                  icon="pi pi-times"
                  text
                  size="small"
                  className="shrink-0"
                  onClick={() => {
                    const newMessages = messages.filter((_, i) => i !== index);
                    setMessages(newMessages);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
