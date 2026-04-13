import Link from 'next/link';
import ThemeSwitch from '../shared/theme-switch';
import SectionContainer from './section-container';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
const Header = () => {
  return (
    <SectionContainer
      as="header"
      className="text-primary border-b py-3 md:py-3"
      innerClassName="flex items-center justify-between gap-2"
    >
      <div className="flex items-center gap-2 font-black">
        <svg
          width="94"
          height="45"
          viewBox="0 0 94 45"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-auto fill-current"
        >
          <path d="M44.1299 44.1299H0L11.0303 33.1797V33.0996L22.0596 22.1504V22.0605H44.1299V44.1299Z" />
          <path d="M71.79 0V22.1504L82.8301 33.0996L93.8604 22.0596V44.1299H49.7305V0H71.79Z" />
          <path d="M22.0596 22.0605L0 22.0596L11.0303 11.1201V11.0303L22.0596 0.0898438V0H44.1299L22.0596 22.0605Z" />
        </svg>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <Link
          href={'https://github.com/siam-parvez/skill-logos'}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-sm font-medium"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'ghost'} size={'icon'}>
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:text-primary text-foreground size-5 fill-current transition-colors duration-300"
                >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Star on GitHub</p>
            </TooltipContent>
          </Tooltip>
        </Link>
        <ThemeSwitch />
      </div>
    </SectionContainer>
  );
};

export default Header;
