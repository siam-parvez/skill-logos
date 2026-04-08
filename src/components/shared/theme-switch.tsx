'use client';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <Tooltip>
      <TooltipTrigger onClick={() => setTheme(isDark ? 'light' : 'dark')} asChild>
        <Button
          type="button"
          variant={'ghost'}
          size={'icon'}
          className="text-foreground hover:text-primary transition-all duration-300"
        >
          {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Switch to {isDark ? 'light' : 'dark'} mode</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeSwitch;
