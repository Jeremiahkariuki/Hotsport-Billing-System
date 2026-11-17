import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "KSh") {
  return `${currency} ${amount.toFixed(2)}`;
}

export function formatBytes(bytes: bigint | number, decimals = 1) {
  const num = typeof bytes === "bigint" ? Number(bytes) : bytes;
  if (!+num) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(num) / Math.log(k));
  return `${parseFloat((num / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes}m`;
  if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    const rem = minutes % 60;
    return rem > 0 ? `${hours}h ${rem}m` : `${hours}h`;
  }
  const days = Math.floor(minutes / 1440);
  const remHours = Math.floor((minutes % 1440) / 60);
  return remHours > 0 ? `${days}d ${remHours}h` : `${days}d`;
}

export function formatDurationLabel(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  if (minutes === 60) return `1 hour`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)} hours`;
  if (minutes === 1440) return `24 hours (1 day)`;
  return `${Math.floor(minutes / 1440)} days`;
}
