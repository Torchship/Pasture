import React from 'react';
import { Header } from '../elements/Header';
import Button from '../elements/Button';
import { Container } from '../elements/Container';

const AreasPanel: React.FC = () => {
  const areas = ['Workers Quarter', 'Commercial Quarter', 'TEST Quarter', 'The Black Cat'];

  return (
    <>
      <Header title="AREAS" />
      <Container showBorder={false}>
        {areas.map(area => (
          <Button key={area} label={area}/>
        ))}
      </Container>
    </>
  );
};

export default AreasPanel;