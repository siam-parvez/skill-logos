'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import { Check, Copy, Search, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Theme = 'dark' | 'light';
type SnippetType = 'markdown' | 'linked' | 'html';

const INITIAL_VISIBLE = 120;
const VISIBLE_STEP = 90;
const MAX_SELECTION = 60;
const PREVIEW_SLOT_SIZE = 48;

interface IconCreatorProps {
  iconNames: string[];
  iconSources: Record<string, { dark: string; light: string }>;
}

export default function IconCreator({ iconNames, iconSources }: IconCreatorProps) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [theme, setTheme] = useState<Theme>('dark');
  const [perLine, setPerLine] = useState(8);
  const [visible, setVisible] = useState(INITIAL_VISIBLE);
  const [copied, setCopied] = useState<SnippetType | null>(null);
  const origin = useSyncExternalStore(
    () => () => {},
    () => window.location.origin,
    () => '',
  );

  const sortedNames = useMemo(() => [...iconNames].sort(), [iconNames]);

  const filteredNames = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return sortedNames;
    return sortedNames.filter((name) => name.includes(normalized));
  }, [search, sortedNames]);

  const visibleIcons = useMemo(() => filteredNames.slice(0, visible), [filteredNames, visible]);
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const selectedIcons =
    selected.length > 0 ? selected : filteredNames.slice(0, Math.min(10, perLine * 2));
  const previewSlots = useMemo(() => {
    const slotCount = Math.max(perLine * 2, selected.length);
    return Array.from({ length: slotCount }, (_, index) => selected[index] ?? null);
  }, [perLine, selected]);

  const iconParam = encodeURIComponent(selectedIcons.join(','));
  const previewPath = `/icons?i=${iconParam}&theme=${theme}&perline=${perLine}`;
  const fullPreviewUrl = `${origin}${previewPath}`;

  const markdownSnippet = `![Skill Logos](${fullPreviewUrl})`;
  const linkedSnippet = `[![Skill Logos](${fullPreviewUrl})](${origin || 'https://your-site.com'})`;
  const htmlSnippet = `<img src="${fullPreviewUrl}" alt="Skill Logos" />`;

  const getIconSource = (name: string) => iconSources[name]?.[theme] ?? null;

  function toggleIcon(name: string) {
    setSelected((prev) => {
      if (prev.includes(name)) return prev.filter((item) => item !== name);
      if (prev.length >= MAX_SELECTION) return prev;
      return [...prev, name];
    });
  }

  async function copySnippet(type: SnippetType) {
    const text =
      type === 'markdown' ? markdownSnippet : type === 'linked' ? linkedSnippet : htmlSnippet;

    await navigator.clipboard.writeText(text);
    setCopied(type);
    window.setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="grid min-w-0 gap-4 md:gap-6 lg:grid-cols-[1.22fr_0.78fr]">
      <section className="bg-card border-border min-w-0 rounded-2xl border p-4 shadow-sm md:p-6">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
              Visual Logo Creator
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Select icons, tune layout, and export your final embed code.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelected([])}
            disabled={selected.length === 0}
            className="w-full md:w-auto"
          >
            <RotateCcw className="size-4" />
            Clear Selection
          </Button>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_auto]">
          <label className="bg-background border-border focus-within:ring-ring/30 flex items-center gap-2 rounded-xl border px-3 py-2.5 focus-within:ring-2">
            <Search className="text-muted-foreground size-4" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisible(INITIAL_VISIBLE);
              }}
              placeholder="Search icons (react, nextjs, docker...)"
              className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
            />
          </label>

          <div className="bg-background border-border grid w-full grid-cols-2 rounded-xl border p-1 md:w-44">
            {(['dark', 'light'] as const).map((item) => (
              <Button
                key={item}
                type="button"
                variant={theme === item ? 'default' : 'ghost'}
                onClick={() => setTheme(item)}
                className="px-3 py-1.5 text-xs font-medium uppercase"
              >
                {item}
              </Button>
            ))}
          </div>

          <label className="bg-background border-border flex items-center gap-2 rounded-xl border px-3 py-2 md:w-56">
            <span className="text-muted-foreground text-xs font-medium text-nowrap uppercase">
              Per line
            </span>
            <input
              type="range"
              min={4}
              max={15}
              value={perLine}
              onChange={(e) => setPerLine(Number(e.target.value))}
              className="accent-primary h-2 w-full"
            />
            <span className="font-semibold tabular-nums">{perLine}</span>
          </label>
        </div>

        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-muted-foreground">
            Showing {Math.min(visibleIcons.length, filteredNames.length)} of {filteredNames.length}
          </span>
          <span className="text-primary font-semibold">{selected.length} selected</span>
        </div>

        <div className="grid max-h-128 grid-cols-2 gap-2 overflow-auto pr-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {visibleIcons.map((name) => {
            const isSelected = selectedSet.has(name);
            return (
              <button
                key={name}
                type="button"
                onClick={() => toggleIcon(name)}
                className={cn(
                  'bg-background border-border hover:border-ring relative flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border p-2 transition-colors',
                  isSelected && 'border-foreground bg-muted/70',
                )}
                title={name}
              >
                {isSelected ? (
                  <span className="bg-foreground text-background absolute top-1 right-1 rounded-full p-1">
                    <Check className="size-3" />
                  </span>
                ) : null}
                <Image
                  src={
                    getIconSource(name) ??
                    `/icons?i=${encodeURIComponent(name)}&theme=${theme}&perline=1`
                  }
                  alt={name}
                  loading="lazy"
                  width={36}
                  height={36}
                  unoptimized
                  className="size-8"
                />
                <span className="text-foreground line-clamp-1 max-w-full text-center text-xs font-medium">
                  {name}
                </span>
              </button>
            );
          })}
        </div>

        {visible < filteredNames.length ? (
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm" onClick={() => setVisible((v) => v + VISIBLE_STEP)}>
              Load more icons
            </Button>
          </div>
        ) : null}
      </section>

      <aside className="bg-card border-border min-w-0 rounded-2xl border p-4 shadow-sm md:p-6 lg:sticky lg:top-20 lg:self-start">
        <div className="mb-5">
          <h3 className="text-foreground text-base font-semibold md:text-lg">Live Preview</h3>
          <div className="bg-background border-border mt-3 overflow-x-auto rounded-xl border p-3">
            <div
              className="mx-auto grid gap-2"
              style={{ gridTemplateColumns: `repeat(${perLine}, ${PREVIEW_SLOT_SIZE}px)` }}
            >
              {previewSlots.map((iconName, index) => {
                if (iconName) {
                  return (
                    <div
                      key={`${iconName}-${index}`}
                      className="border-border bg-muted/20 h-12 w-12 overflow-hidden rounded-xl border"
                    >
                      <Image
                        src={
                          getIconSource(iconName) ??
                          `/icons?i=${encodeURIComponent(iconName)}&theme=${theme}&perline=1`
                        }
                        alt={iconName}
                        width={48}
                        height={48}
                        loading="eager"
                        unoptimized
                        className="block h-full w-full"
                      />
                    </div>
                  );
                }

                return (
                  <div
                    key={`placeholder-${index}`}
                    className="border-border bg-muted/20 h-12 w-12 rounded-xl border border-dashed"
                    aria-hidden="true"
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-border border-t pt-5">
          <h3 className="text-foreground mb-3 text-base font-semibold md:text-lg">
            Copy Embed Code
          </h3>
          <CodeRow
            label="Markdown"
            code={markdownSnippet}
            copied={copied === 'markdown'}
            onCopy={() => copySnippet('markdown')}
          />
          <CodeRow
            label="HTML"
            code={htmlSnippet}
            copied={copied === 'html'}
            onCopy={() => copySnippet('html')}
          />
        </div>
      </aside>
    </div>
  );
}

function CodeRow({
  label,
  code,
  copied,
  onCopy,
}: {
  label: string;
  code: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="mb-3 min-w-0 last:mb-0">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          {label}
        </p>
        <Button variant="ghost" size="sm" onClick={onCopy}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre className="bg-background border-border max-w-full rounded-xl border p-3 text-xs leading-relaxed wrap-break-word whitespace-pre-wrap">
        <code className="block">{code}</code>
      </pre>
    </div>
  );
}
