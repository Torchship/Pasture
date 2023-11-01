import './Tab.css';

export interface TabProps {
  label?: string;
  children?: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ label, children }) => {
  return (
    <div className="tab">
      {children}
    </div>
  )
};

export default Tab;