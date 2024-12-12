const DAILY_CHAT_LIMIT = 20;
const STORAGE_KEY = 'healthchat_daily_messages';

interface DailyMessages {
  count: number;
  date: string;
}

export function getRemainingMessages(isPro: boolean, isDeluxe: boolean): number {
  if (isPro || isDeluxe) return Infinity;
  const daily = getDailyMessages();
  return Math.max(0, DAILY_CHAT_LIMIT - daily.count);
}

export function incrementMessageCount(isPro: boolean, isDeluxe: boolean): void {
  if (isPro || isDeluxe) return;
  const daily = getDailyMessages();
  daily.count += 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(daily));
}

export function hasReachedLimit(isPro: boolean, isDeluxe: boolean): boolean {
  if (isPro || isDeluxe) return false;
  const daily = getDailyMessages();
  return daily.count >= DAILY_CHAT_LIMIT;
}

function getDailyMessages(): DailyMessages {
  const today = new Date().toDateString();
  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (!stored) {
    return { count: 0, date: today };
  }

  const daily: DailyMessages = JSON.parse(stored);
  
  if (daily.date !== today) {
    return { count: 0, date: today };
  }

  return daily;
}
