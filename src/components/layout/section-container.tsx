import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { createElement } from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerOwnProps<T extends ElementType> {
  children: ReactNode;
  as?: T;
  fullBleed?: boolean;
  innerClassName?: string;
}

type SectionContainerProps<T extends ElementType> =
  SectionContainerOwnProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof SectionContainerOwnProps<T>>;

export default function SectionContainer<T extends ElementType = 'section'>({
  children,
  className,
  innerClassName,
  as,
  fullBleed = false,
  ...rest
}: SectionContainerProps<T>) {
  const Component: ElementType = as ?? 'section';
  const content = fullBleed ? (
    children
  ) : (
    <div
      className={cn(
        'mx-auto w-full max-w-6xl 2xl:max-w-screen-2xl',
        innerClassName,
      )}
    >
      {children}
    </div>
  );

  return createElement(
    Component,
    {
      ...(rest as ComponentPropsWithoutRef<ElementType>),

      className: cn('relative w-full py-4 md:py-8 px-4', className),
    },
    content,
  );
}
