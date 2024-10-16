import { describe, expect, it } from 'bun:test';
import { getLocationLocale } from './getLocationLocale';

describe('getLocationLocale', () => {
  it('建物名、階数、部屋名が指定された場所を処理できる', () => {
    const result = getLocationLocale({
      'building-name': '1号館',
      floor: 2,
      'room-name': '第一物理実験室',
    });
    expect(result).toBe('1号館 2階 第一物理実験室');
  });

  it('建物名、部屋名が指定された場所を処理できる', () => {
    const result = getLocationLocale({
      'building-name': '第一体育館',
      floor: undefined,
      'room-name': '屋内ステージ',
    });
    expect(result).toBe('第一体育館 屋内ステージ');
  });

  it('建物名のみの場所を処理できる', () => {
    const result = getLocationLocale({
      'building-name': 'グラウンド',
      floor: undefined,
      'room-name': undefined,
    });
    expect(result).toBe('グラウンド');
  });
});
