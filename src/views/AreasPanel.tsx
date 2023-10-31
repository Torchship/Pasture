import React from 'react';
import { Header } from '../components/Header';
import Button from '../components/Button';

const AreasPanel: React.FC = () => {
  const areas = ['Workers Quarter', 'Commercial Quarter', 'TEST Quarter', 'The Black Cat'];

  return (
    <>
      <Header title="AREAS" />
      <div style={{marginTop: '2em'}}></div>
      {areas.map(area => (
        <Button label={area}/>
      ))}
    </>
  );
};

export default AreasPanel;