import React from 'react';
import { Header } from '../elements/Header';
import Button from '../elements/Button';
import { Container } from '../elements/Container';
import TabContainer from '../elements/TabContainer';
import Tab from '../elements/Tab';

const AreasPanel: React.FC = () => {
  const areas = ['Workers Quarter', 'Commercial Quarter', 'TEST Quarter', 'The Black Cat'];

  return (
    <>
      <TabContainer>
        <Tab label="Areas">
          {areas.map(area => (
            <Button key={area} label={area}/>
          ))}
        </Tab>
        <Tab label="Zones">
        </Tab>
      </TabContainer>
    </>
  );
};

export default AreasPanel;