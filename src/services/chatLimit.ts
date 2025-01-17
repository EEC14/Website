const MONTHLY_CHAT_LIMIT = 5; // Adjust the limit as needed
const STORAGE_KEY = 'healthchat_monthly_messages';

interface MonthlyMessages {
  count: number;
  month: string;
}

export function getRemainingMessages(isPro: boolean, isDeluxe: boolean): number {
  if (isPro || isDeluxe) return Infinity;
  const monthly = getMonthlyMessages();
  return Math.max(0, MONTHLY_CHAT_LIMIT - monthly.count);
}

export function incrementMessageCount(isPro: boolean, isDeluxe: boolean): void {
  if (isPro || isDeluxe) return;
  const monthly = getMonthlyMessages();
  monthly.count += 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(monthly));
}

export function hasReachedLimit(isPro: boolean, isDeluxe: boolean): boolean {
  if (isPro || isDeluxe) return false;
  const monthly = getMonthlyMessages();
  return monthly.count >= MONTHLY_CHAT_LIMIT;
}

function getMonthlyMessages(): MonthlyMessages {
  const currentMonth = new Date().toISOString().slice(0, 7); // Format: YYYY-MM
  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (!stored) {
    return { count: 0, month: currentMonth };
  }

  const monthly: MonthlyMessages = JSON.parse(stored);
  
  if (monthly.month !== currentMonth) {
    return { count: 0, month: currentMonth };
  }

  return monthly;
}