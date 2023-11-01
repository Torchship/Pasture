import React, {useState} from 'react';
import { Header } from '../elements/Header';
import { Container } from '../elements/Container';
import Terminal, { ColorMode, TerminalOutput } from '../elements/Terminal';

const TerminalPanel: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput>Welcome to Pastures!</TerminalOutput>
  ]);

  return (
    <>
      <Header title="terminal" />
      <Container showBorder={false} className="noDrag">
        <Terminal 
          colorMode={ ColorMode.Dark }  
          onInput={ terminalInput => console.log(`New terminal input received: '${ terminalInput }'`) }
          height='100%'>
          { terminalLineData }
        </Terminal>
      </Container>
    </>
  );
};

export default TerminalPanel;