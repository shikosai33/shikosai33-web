const TIMEZONE = 'Asia/Tokyo' as const;

/**
 * HH:mm の形式で時刻をフォーマットする
 */
const timeFormatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: TIMEZONE,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

/**
 * MM月DD日 (曜日) の形式で日付をフォーマットする
 * @returns {string} フォーマットされた日付文字列 "MM月DD日 (曜日)"
 */
const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: TIMEZONE,
  month: 'long',
  day: 'numeric',
  weekday: 'short',
});

/**
 * MM/DD の形式で日付をフォーマットする
 * @returns {string} フォーマットされた日付文字列 "MM/DD"
 */
const simpleDateFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIMEZONE,
  month: '2-digit',
  day: '2-digit',
});

/**
 * 指定された日付を「1日目」または「2日目」の形式でフォーマットします。
 * それ以外の日付は標準の日付フォーマットを使用します。
 *
 * @param date - フォーマットする日付オブジェクト
 * @returns フォーマットされた日付文字列
 */
export const formatShikosaiDate = (date: Date): string => {
  switch (simpleDateFormatter.format(date)) {
    case '10/26':
      return '1日目';
    case '10/27':
      return '2日目';
    default:
      return dateFormatter.format(date);
  }
};

/**
 * イベントの日付に基づいて、開始時刻と終了時刻をフォーマットしてタプルで返します。
 * 10/26と10/27の日付に対しては、それぞれ「1日目」「2日目」を返します。
 * その他の日付に対しては「MM月DD日 (曜日)」の形式で日付を返します。
 * 時刻はすべて「HH:mm」の形式でフォーマットされます。
 *
 * @param {Date} startsAt - 開始日時を表す `Date` オブジェクト。
 * @param {Date} endsAt - 終了日時を表す `Date` オブジェクト。
 * @returns {[string, string]} フォーマットされた開始日時と終了日時の文字列を持つタプル。
 */
export const formatDateTimeRange = (
  startsAt: Date,
  endsAt: Date,
): {
  isSameDay: boolean;
  fullText: string;
  startsAtText: string;
  endsAtText: string;
} => {
  const startsAtDateText = formatShikosaiDate(startsAt);
  const endsAtDateText = formatShikosaiDate(endsAt);
  const startsAtTimeText = timeFormatter.format(startsAt);
  const endsAtTimeText = timeFormatter.format(endsAt);
  const isSameDay = startsAtDateText === endsAtDateText;
  const startsAtText = `${startsAtDateText} ${startsAtTimeText}`;
  const endsAtText = isSameDay ? endsAtTimeText : `${endsAtDateText} ${endsAtTimeText}`;
  const fullText = `${startsAtText} ~ ${endsAtText}`;
  return {
    isSameDay,
    fullText,
    startsAtText,
    endsAtText,
  };
};
