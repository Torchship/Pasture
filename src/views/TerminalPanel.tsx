import React, { useEffect } from 'react';
import { Header } from '../elements/Header';
import { Container } from '../elements/Container';
import Terminal, { ColorMode, TerminalOutput } from '../elements/Terminal';
import { useSocket } from '../SocketContext';

export interface Props {
  messages?: string[];
  setMessages?: React.Dispatch<React.SetStateAction<string[]>>;
}

const TerminalPanel: React.FC<Props> = ({messages, setMessages}) => {
  const socket = useSocket();

  useEffect(() => {
    socket.on('raw', (msg: string) => {
      if (!setMessages || !messages)
        return;
      setMessages([...messages, msg]);
    });

    socket.on('echo', (msg: string) => {
      if (!setMessages || !messages)
        return;
      setMessages([...messages, msg]);
    });
  }, [socket, setMessages, messages]);

  return (
    <>
      <Header title="terminal" />
      <Container showBorder={false} className="noDrag">
        <Terminal 
          colorMode={ ColorMode.Dark }  
          onInput={ terminalInput => console.log(`New terminal input received: '${ terminalInput }'`) }
          height='100%'>
            {
              messages?.map(message => <TerminalOutput>{message}</TerminalOutput>)
            }
        </Terminal>
      </Container>
    </>
  );
};

export default TerminalPanel;