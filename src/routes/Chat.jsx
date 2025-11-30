import React, { useState } from 'react';

export default function Chat() {
  const [selectedContact, setSelectedContact] = useState(1);

  const contacts = [
    { id: 1, name: "Samantha William", message: "Hi, can you help me with...", time: "12:45 PM", unread: 2, avatar: "https://i.pravatar.cc/150?img=1", status: "online" },
    { id: 2, name: "Tony Soap", message: "Thanks for the class!", time: "11:20 AM", unread: 0, avatar: "https://i.pravatar.cc/150?img=2", status: "offline" },
    { id: 3, name: "Karen Hope", message: "See you tomorrow", time: "09:30 AM", unread: 0, avatar: "https://i.pravatar.cc/150?img=3", status: "online" },
    { id: 4, name: "Jordan Nico", message: "I have a question about...", time: "Yesterday", unread: 1, avatar: "https://i.pravatar.cc/150?img=4", status: "offline" },
  ];

  const messages = [
    { id: 1, sender: "other", text: "Hi, Mr. Khoi! Can you help me with the math homework?", time: "12:40 PM" },
    { id: 2, sender: "me", text: "Hello Samantha! Sure, which problem are you stuck on?", time: "12:42 PM" },
    { id: 3, sender: "other", text: "Problem number 5 on page 32.", time: "12:45 PM" },
  ];

  return (
    <div className="p-8 h-full flex flex-col gap-8 overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-dark">Chat</h2>
      </div>

      <div className="flex gap-6 h-full bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Contacts Sidebar */}
        <div className="w-80 border-r border-gray-100 flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <input type="text" placeholder="Search..." className="w-full bg-bg-gray rounded-full px-4 py-2 text-sm focus:outline-none" />
          </div>
          <div className="flex-1 overflow-y-auto">
            {contacts.map(contact => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact.id)}
                className={`p-4 flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedContact === contact.id ? 'bg-blue-50' : ''}`}
              >
                <div className="relative">
                  <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-text-dark text-sm truncate">{contact.name}</h4>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{contact.time}</span>
                  </div>
                  <p className={`text-xs truncate mt-1 ${contact.unread > 0 ? 'font-bold text-text-dark' : 'text-gray-500'}`}>
                    {contact.message}
                  </p>
                </div>
                {contact.unread > 0 && (
                  <div className="flex flex-col justify-center">
                    <span className="bg-secondary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {contact.unread}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={contacts.find(c => c.id === selectedContact)?.avatar} alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-bold text-text-dark">{contacts.find(c => c.id === selectedContact)?.name}</h3>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-primary text-xl">•••</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-2xl p-4 ${msg.sender === 'me' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-text-dark shadow-sm rounded-tl-none'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-2 text-right ${msg.sender === 'me' ? 'text-blue-200' : 'text-gray-400'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-gray-100">
            <div className="flex gap-4 items-center">
              <button className="text-gray-400 hover:text-primary text-xl">📎</button>
              <input
                type="text"
                placeholder="Type your message here..."
                className="flex-1 bg-bg-gray rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors">
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}