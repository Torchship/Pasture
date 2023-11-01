import React from 'react';
import { Header } from '../elements/Header';
import { Container } from '../elements/Container';
import Terminal, { ColorMode, TerminalOutput } from '../elements/Terminal';

export interface Props {
  messages?: string[];
}

const TerminalPanel: React.FC<Props> = ({messages}) => {
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