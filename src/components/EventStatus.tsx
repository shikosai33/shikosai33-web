import { AlarmClockCheck } from 'lucide-react';
import { type ComponentProps, type ReactNode, useEffect, useState } from 'react';

type Props = {
  /**
   * イベントが開始する日時。
   */
  startsAt: Date;

  /**
   * イベントが終了する日時。
   */
  endsAt: Date;
} & ComponentProps<'output'>;

type Status = 'before' | 'during' | 'after';

/**
 * イベント(バンドのライブなど)の開催状態を表示するコンポーネント。
 * 表示なし、開演中、終演の3つの状態のどれかを表示する。
 * @see https://www.notion.so/8345f5b29cea40aaa2cc9fd6ab79c6a6?pvs=4#9ae1134163bc41fca64fb5161acf4e19
 */
const EventStatus = ({ className, startsAt, endsAt, ...props }: Props): ReactNode => {
  const [status, setStatus] = useState<Status>('before');

  useEffect(() => {
    const statusWatcher = () => {
      const now = new Date();
      if (now < startsAt) {
        setStatus('before');
      } else if (now < endsAt) {
        setStatus('during');
      } else {
        setStatus('after');
      }
    };

    const interval = setInterval(statusWatcher, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startsAt, endsAt]);

  return status === 'before' ? null : (
    <output
      aria-live='polite'
      className={`flex px-2 py-0.5 gap-1 justify-center items-center bg-mauve-1 border-mauve-6 border rounded-md font-Dela text-sm ${className}`}
      {...props}
    >
      {status === 'during' && (
        <>
          <span className='relative flex h-2.5 w-2.5' aria-hidden>
            <span className='absolute inline-flex w-full h-full rounded-full animate-ping bg-violet-6' />
            <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-9' />
          </span>
          <span className='text-violet-11'>開演中</span>
        </>
      )}
      {status === 'after' && (
        <>
          <AlarmClockCheck className='inline w-4 h-4 stroke-[3px] text-mauve-11' />
          <span className='text-mauve-11'>終演</span>
        </>
      )}
    </output>
  );
};

export { EventStatus };
