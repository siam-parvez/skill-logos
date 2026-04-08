'use client';

import { useMemo, useState } from 'react';
import { Check, Copy, Search, Sparkles, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Theme = 'dark' | 'light';
type SnippetType = 'markdown' | 'linked' | 'html';

const INITIAL_VISIBLE = 120;
const VISIBLE_STEP = 90;
const MAX_SELECTION = 60;

interface IconCreatorProps {
  iconNames: string[];
}

export default function IconCreator({ iconNames }: IconCreatorProps) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [theme, setTheme] = useState<Theme>('dark');
  const [perLine, setPerLine] = useState(8);
  const [visible, setVisible] = useState(INITIAL_VISIBLE);
  const [copied, setCopied] = useState<SnippetType | null>(null);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

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

  const iconParam = encodeURIComponent(selectedIcons.join(','));
  const previewPath = `/icons?i=${iconParam}&theme=${theme}&perline=${perLine}`;
  const fullPreviewUrl = `${origin}${previewPath}`;

  const markdownSnippet = `![Skill Logos](${fullPreviewUrl})`;
  const linkedSnippet = `[![Skill Logos](${fullPreviewUrl})](${origin || 'https://your-site.com'})`;
  const htmlSnippet = `<img src="${fullPreviewUrl}" alt="Skill Logos" />`;

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
    <div className="grid min-w-0 gap-4 md:gap-6 lg:grid-cols-[1.05fr_1fr]">
      <section className="bg-card/90 border-border min-w-0 rounded-3xl border p-4 shadow-sm md:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <h2 className="text-foreground text-xl font-black md:text-2xl">Visual Logo Creator</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Select up to {MAX_SELECTION} icons and generate your embed code.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelected([])}
            disabled={selected.length === 0}
            className="w-full sm:w-auto"
          >
            <Trash2 className="size-4" />
            Clear
          </Button>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <label className="bg-background border-border focus-within:ring-ring/40 col-span-2 flex items-center gap-2 rounded-xl border px-3 py-2 focus-within:ring-2">
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

          <div className="bg-background border-border grid w-full grid-cols-2 rounded-xl border p-1 sm:w-auto">
            {(['dark', 'light'] as const).map((item) => (
              <Button
                key={item}
                type="button"
                variant={theme === item ? 'default' : 'ghost'}
                onClick={() => setTheme(item)}
                className={cn(
                  'flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase transition-colors sm:flex-none',
                )}
              >
                {item}
              </Button>
            ))}
          </div>

          <label className="bg-background border-border flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm sm:justify-start">
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

        <div className="grid max-h-112 grid-cols-2 gap-2 overflow-auto pr-1 sm:max-h-128 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {visibleIcons.map((name) => {
            const isSelected = selectedSet.has(name);
            return (
              <button
                key={name}
                type="button"
                onClick={() => toggleIcon(name)}
                className={cn(
                  'bg-background border-border hover:border-primary/60 relative flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border p-2 transition-colors',
                  isSelected && 'border-primary bg-primary/5',
                )}
                title={name}
              >
                {isSelected ? (
                  <span className="bg-primary text-primary-foreground absolute top-1 right-1 rounded-full p-1">
                    <Check className="size-3" />
                  </span>
                ) : null}
                <Image
                  src={`/icons?i=${encodeURIComponent(name)}&theme=${theme}&perline=1`}
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

      <section className="min-w-0 space-y-4">
        <div className="bg-card/90 border-border rounded-3xl border p-4 shadow-sm md:p-6">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="text-primary size-4" />
            <h3 className="text-foreground text-lg font-black">Live Preview</h3>
          </div>

          <div className="bg-background border-border overflow-hidden rounded-2xl border p-3">
            <Image
              src={previewPath}
              alt="Generated skill logos"
              width={1200}
              height={260}
              unoptimized
              className="mx-auto h-auto w-full max-w-full"
              loading="eager"
            />
          </div>

          <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
            Tip: no icons selected means we preview a small auto-pick from your current search.
          </p>
        </div>

        <div className="bg-card/90 border-border rounded-3xl border p-4 shadow-sm md:p-6">
          <h3 className="text-foreground mb-3 text-lg font-black">Copy Embed Code</h3>
          <CodeRow
            label="Markdown"
            code={linkedSnippet}
            copied={copied === 'linked'}
            onCopy={() => copySnippet('linked')}
          />
          <CodeRow
            label="HTML"
            code={htmlSnippet}
            copied={copied === 'html'}
            onCopy={() => copySnippet('html')}
          />
        </div>
      </section>
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
      <pre className="bg-background border-border max-w-full overflow-x-auto rounded-xl border p-3 text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
