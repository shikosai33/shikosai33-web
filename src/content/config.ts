import { defineCollection, reference, z } from 'astro:content';

export const BUILDINGS = [
  '1号館',
  '2号館',
  '3号館',
  '4号館',
  '5号館',
  '6号館',
  '7号館',
  '8号館',
  '9号館',
  '10号館',
  '図書館棟',
  '第一体育館',
  '第二体育館',
  '茨友館',
  '武道場',
  'グラウンド',
] as const satisfies string[];

const locations = defineCollection({
  type: 'data',
  schema: z
    .object({
      'building-name': z.enum(BUILDINGS).describe('建物名'),
      floor: z.number().int().positive().optional().describe('階数'),
      'room-name': z.string().optional().describe('部屋の名前'),
    })
    .describe('構内の場所'),
});

const circles = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z
      .object({
        image: image().describe('サークルカットの画像 1:1'),
        name: z.string().describe('名前'),
        'organizer-name': z.string().describe('開催する団体の名前 (例) 2年2組, 5年情報系'),
        category: z.enum(['技術系', '文化系', '飲食系']).describe('サークルの区分'), // サークルの区分。技術系、文化系、食品系
        location: reference('locations').describe('配置場所'),
        urls: z.array(z.string().url()).optional().describe('X, Instagramなどの外部リンク'),
        summary: z.string().describe('サークルの説明の要約文'),
      })
      .describe('サークル'),
});

const events = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z
      .object({
        image: image().describe('イベントの画像 1:1'),
        name: z.string().describe('イベント名'),
        'organizer-name': z.string().optional().describe('開催する団体の名前'),
        'starts-at': z.coerce.date().describe('開始時刻'),
        'ends-at': z.coerce.date().describe('終了時刻'),
        location: reference('locations').describe('公演場所'),
        urls: z.array(z.string().url()).optional().describe('X, Instagramなどの外部リンク'),
        youtube: z.string().url().optional().describe('YouTubeの動画もしくはライブ配信のURL'),
        summary: z.string().describe('イベントの説明の要約文'),
      })
      .describe('イベント (音楽、ダンスなど)'),
});

export const collections = { locations, circles, events };
