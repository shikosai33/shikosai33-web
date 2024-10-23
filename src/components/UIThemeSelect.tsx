'use client';

import * as Select from '@radix-ui/react-select';
import { Loader, Moon, Sun } from 'lucide-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage, useMediaQuery } from 'usehooks-ts';

const UPDATE_THEME_EVENT_NAME = 'shikosai33:updateTheme' as const;
const LOCAL_STORAGE_THEME_KEY = 'shikosai33:theme' as const;

const THEMES = ['default', 'light', 'dark'] as const;
type Theme = (typeof THEMES)[number];

export type UIThemeSelectProps = Omit<
  ComponentPropsWithoutRef<typeof Select.Root>,
  'value' | 'onValueChange' | 'defaultValue'
> & {
  className?: string;
};

export const UIThemeSelect = ({ children, className, ...props }: UIThemeSelectProps): ReactNode => {
  const [isMounted, setIsMounted] = useState(false);
  const isSystemDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useLocalStorage<Theme>(LOCAL_STORAGE_THEME_KEY, 'default');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onValueChangeHandler = useCallback(
    (value: Theme) => {
      setTheme(value);
      document.dispatchEvent(new CustomEvent(UPDATE_THEME_EVENT_NAME));
    },
    [setTheme],
  );

  return (
    <Select.Root value={theme} onValueChange={onValueChangeHandler} defaultValue={'default' satisfies Theme} {...props}>
      <Select.Trigger
        aria-label='色テーマを選ぶ'
        className={`flex items-center justify-center p-2 transition-colors aspect-square shrink rounded-xl text-mauve-3 bg-mauve-12 border-t shadow-xl shadow-mauve-a-3 border-mauve-11 hover:text-mauve-12 hover:bg-mauve-3 active:bg-mauve-4 ${className}`}
      >
        <Select.Value>{isMounted ? undefined : <Loader className='animate-spin' />}</Select.Value>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position='popper'
          side='bottom'
          sideOffset={4}
          className='relative flex z-50 flex-col p-2 overflow-hidden border shadow-lg rounded-2xl bg-mauve-1 border-mauve-6 shadow-mauve-a-3 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
        >
          <Select.Item
            value='default'
            className='flex items-center justify-start gap-2 p-2 transition-colors rounded-lg select-none font-Dela text-mauve-11 hover:text-mauve-12 hover:bg-mauve-3 active:bg-mauve-4'
          >
            <Select.ItemText>{isSystemDarkMode ? <Moon /> : <Sun />}</Select.ItemText>
            <span className='flex flex-col'>
              <span className='text-xs'>おすすめ</span>システム設定
            </span>
          </Select.Item>
          <Select.Item
            value='light'
            className='flex items-center justify-start gap-2 p-2 transition-colors rounded-lg select-none font-Dela text-mauve-11 hover:text-mauve-12 hover:bg-mauve-3 active:bg-mauve-4'
          >
            <Select.ItemText>
              <Sun />
            </Select.ItemText>
            ライトモード
          </Select.Item>
          <Select.Item
            value='dark'
            className='flex items-center justify-start gap-2 p-2 transition-colors rounded-lg select-none font-Dela text-mauve-11 hover:text-mauve-12 hover:bg-mauve-3 active:bg-mauve-4'
          >
            <Select.ItemText>
              <Moon />
            </Select.ItemText>
            ダークモード
          </Select.Item>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
