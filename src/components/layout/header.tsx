import ThemeSwitch from '../shared/theme-switch';
import SectionContainer from './section-container';

const Header = () => {
  return (
    <SectionContainer as="header" className="border-b md:py-4">
      <ThemeSwitch />
    </SectionContainer>
  );
};

export default Header;
