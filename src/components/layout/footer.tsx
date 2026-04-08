import SectionContainer from './section-container';
import Link from 'next/link';

const Footer = () => {
  return (
    <SectionContainer
      as="footer"
      className="text-muted-foreground border-t md:py-6"
      innerClassName="text-center text-xs"
    >
      <span>Made with ❤️ by </span>
      <Link
        href={'https://x.com/TheOne_Siam'}
        target="_blank"
        className="hover:text-primary font-medium underline transition-colors duration-300"
      >
        Siam Parvez
      </Link>
    </SectionContainer>
  );
};

export default Footer;
