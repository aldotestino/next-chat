import React from 'react';

function ChatPage({ params }: { params: { type: string, id: number } }) {
  return (
    <div>{params.type} - {params.id}</div>
  );
}

export default ChatPage;