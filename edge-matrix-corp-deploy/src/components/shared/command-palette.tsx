'use client';

import { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { Search, Mail, Building, X, BookOpen, Layers } from 'lucide-react';
import { SERVICES } from '@/constants/services';
import { NAVIGATION_ITEMS } from '@/constants/navigation';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-em-bg/80 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Palette Container */}
      <div 
        className="relative w-full max-w-2xl px-4"
        role="dialog"
        aria-modal="true"
        aria-label="Global search and navigation commands"
      >
        <div className="overflow-hidden rounded-xl border border-em-border bg-em-surface/90 shadow-2xl backdrop-blur-xl ring-1 ring-em-border">
          <Command 
            className="flex w-full flex-col bg-transparent"
            label="Global Command Menu"
          >
            <div className="flex items-center border-b border-em-border px-4">
              <Search className="mr-3 h-5 w-5 text-em-text-muted shrink-0" />
              <Command.Input 
                autoFocus
                placeholder="Type a command or search..." 
                className="flex h-14 w-full bg-transparent text-sm text-em-text placeholder:text-em-text-muted focus:outline-none"
                role="combobox"
                aria-autocomplete="list"
                aria-controls="command-results-list"
                aria-expanded={open}
              />
              <button 
                onClick={() => setOpen(false)}
                className="p-1 rounded-md hover:bg-em-surface-light transition-colors"
                aria-label="Close command palette"
              >
                <X className="h-4 w-4 text-em-text-muted" />
              </button>
            </div>

            <Command.List 
              id="command-results-list"
              role="listbox"
              aria-label="Command search results"
              className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-em-primary/20"
            >
              <Command.Empty className="py-6 text-center text-sm text-em-text-muted">
                No results found.
              </Command.Empty>

              <Command.Group heading={<span className="text-xs font-medium text-em-text-muted px-2 py-1.5 flex">Primary Navigation</span>}>
                {NAVIGATION_ITEMS.map((item) => (
                  <Command.Item
                    key={item.href}
                    onSelect={() => runCommand(() => router.push(item.href))}
                    className="flex cursor-pointer select-none items-center rounded-lg px-2 py-3 text-sm text-em-text-secondary aria-selected:bg-em-primary/10 aria-selected:text-em-text transition-colors"
                  >
                    <Building className="mr-3 h-4 w-4 text-em-primary" />
                    {item.label}
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading={<span className="text-xs font-medium text-em-text-muted px-2 py-3 flex">Enterprise Services</span>}>
                {SERVICES.map((service) => (
                  <Command.Item
                    key={service.id}
                    onSelect={() => runCommand(() => router.push(`/services/${service.id}`))}
                    className="flex cursor-pointer select-none items-center rounded-lg px-2 py-3 text-sm text-em-text-secondary aria-selected:bg-em-primary/10 aria-selected:text-em-text transition-colors"
                  >
                    <Layers className="mr-3 h-4 w-4 text-em-accent" />
                    {service.title}
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading={<span className="text-xs font-medium text-em-text-muted px-2 py-3 flex">Actions</span>}>
                <Command.Item
                  onSelect={() => runCommand(() => router.push('/contact'))}
                  className="flex cursor-pointer select-none items-center rounded-lg px-2 py-3 text-sm text-em-text-secondary aria-selected:bg-em-primary/20 aria-selected:text-em-text transition-colors"
                >
                  <Mail className="mr-3 h-4 w-4 text-em-primary" />
                  Request Executive Briefing
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push('/trainings'))}
                  className="flex cursor-pointer select-none items-center rounded-lg px-2 py-3 text-sm text-em-text-secondary aria-selected:bg-em-primary/20 aria-selected:text-em-text transition-colors"
                >
                  <BookOpen className="mr-3 h-4 w-4 text-em-accent" />
                  View Certification Programs
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </div>
      </div>
    </div>
  );
}
