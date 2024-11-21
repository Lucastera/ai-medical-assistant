import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as CryptoJS from 'crypto-js';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const md5Encrypt = (input: string) => {
  return CryptoJS.MD5(input).toString();
}