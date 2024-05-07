import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { User } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserHandle(user: User) {
  return user.username || `${user.firstName} ${user.lastName}` || user.email.split('@')[0];
}