import type { InferEntrySchema } from 'astro:content';

/**
 * 指定された建物名、階数、部屋名を元にロケーションの表示用テキストを取得します。
 *
 * @param {Object} params - ロケーション情報を含むオブジェクト。
 * @param {string} params.building-name - 建物名。
 * @param {number | undefined} params.floor - 階数。数値で指定されている場合のみ使用されます。
 * @param {string} params.room-name - 部屋名。
 * @returns {string} ロケーションのロケールを表す文字列。階数が指定されている場合は「建物名 階数階 部屋名」の形式、それ以外の場合は「建物名 部屋名」の形式で返されます。
 */
export const getLocationLocale = ({
  'building-name': buildingName,
  floor,
  'room-name': roomName,
}: InferEntrySchema<'locations'>) => {
  const locales = [buildingName, typeof floor === 'number' ? `${floor}階` : floor, roomName];
  return locales.filter(Boolean).join(' ');
};
