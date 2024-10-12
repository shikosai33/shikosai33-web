import { describe, expect, it } from 'bun:test';
import { formatDateTimeRange, formatShikosaiDate } from './formatDateTimeRange';

describe('formatShikosaiDate', () => {
  it('10月26日(土) (1日目) をフォーマットできる', () => {
    const date = new Date('2024-10-26T00:00:00+0900');
    const formatted = formatShikosaiDate(date);
    expect(formatted).toBe('1日目');
  });

  it('10月27日(日) (2日目) をフォーマットできる', () => {
    const date = new Date('2024-10-27T00:00:00+0900');
    const formatted = formatShikosaiDate(date);
    expect(formatted).toBe('2日目');
  });

  it('10月28日(月) をフォーマットできる', () => {
    const date = new Date('2024-10-28T00:00:00+0900');
    const formatted = formatShikosaiDate(date);
    expect(formatted).toBe('10月28日(月)');
  });
});

describe('formatDateTimeRange', () => {
  it('10月26日(土) (1日目) の範囲をフォーマットできる', () => {
    const startsAt = new Date('2024-10-26T13:40:00+0900');
    const endsAt = new Date('2024-10-26T14:05:00+0900');

    const { fullText, startsAtText, endsAtText, isSameDay } = formatDateTimeRange(startsAt, endsAt);

    expect(startsAtText).toBe('1日目 13:40');
    expect(endsAtText).toBe('14:05');
    expect(fullText).toBe('1日目 13:40 ~ 14:05');
    expect(isSameDay).toBe(true);
  });

  it('10月27日(日) (2日目) の範囲をフォーマットできる', () => {
    const startsAt = new Date('2024-10-27T09:00:00+0900');
    const endsAt = new Date('2024-10-27T10:00:00+0900');

    const { fullText, startsAtText, endsAtText, isSameDay } = formatDateTimeRange(startsAt, endsAt);

    expect(startsAtText).toBe('2日目 09:00');
    expect(endsAtText).toBe('10:00');
    expect(fullText).toBe('2日目 09:00 ~ 10:00');
    expect(isSameDay).toBe(true);
  });

  it('10月26日(土) (1日目) と 10月27日(日) (2日目) に跨る範囲をフォーマットできる', () => {
    const startsAt = new Date('2024-10-26T23:00:00+0900');
    const endsAt = new Date('2024-10-27T01:00:00+0900');

    const { fullText, startsAtText, endsAtText, isSameDay } = formatDateTimeRange(startsAt, endsAt);

    expect(startsAtText).toBe('1日目 23:00');
    expect(endsAtText).toBe('2日目 01:00');
    expect(fullText).toBe('1日目 23:00 ~ 2日目 01:00');
    expect(isSameDay).toBe(false);
  });

  it('茨香祭の開催日でない範囲をフォーマットできる', () => {
    const startsAt = new Date('2024-10-28T09:00:00+0900');
    const endsAt = new Date('2024-10-28T10:30:00+0900');

    const { fullText, startsAtText, endsAtText, isSameDay } = formatDateTimeRange(startsAt, endsAt);

    expect(startsAtText).toBe('10月28日(月) 09:00');
    expect(endsAtText).toBe('10:30');
    expect(fullText).toBe('10月28日(月) 09:00 ~ 10:30');
    expect(isSameDay).toBe(true);
  });
});
