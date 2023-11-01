import React, {useState} from 'react';
import Tab, { TabProps } from './Tab';
import './TabContainer.css';

interface Props {
  children?: React.ReactElement<typeof Tab>[] | React.ReactElement<typeof Tab>;
}

const TabContainer: React.FC<Props> = ({children}) => {
  const [selectedTab, setSelectedTab] = useState<string | undefined>(Array.isArray(children) ? (children[1].props as TabProps).label : (children?.props as TabProps).label);

  const handleTabClick = (tab: string | undefined) => {
    setSelectedTab(tab);
  };

  return (
    <div className="tab-container">
      <div className="tab-labels noDrag">
      {
        Array.isArray(children) 
          ? children.map(c => {
              const label = (c.props as TabProps).label;
              return (
                <div className={`tab-label ${selectedTab === label ? 'selected' : ''}`} onClick={() => handleTabClick(label)}>{label}</div>
              );
            })
          : (
              <div className="tab-label selected">{(children?.props as TabProps).label}</div>
            )
      }
      </div>
      <div className="tab-content">
        {children}
      </div>
    </div>
  )
};

export default TabContainer;