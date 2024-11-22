import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as CryptoJS from 'crypto-js';
import { HospitalRecommendation } from "@/App";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const md5Encrypt = (input: string) => {
  return CryptoJS.MD5(input).toString();
}

export const transformToHospitalRecommendation = (data: {
  "Address": string;
  "Contact": string;
  "Department": string;
  "Distance (km)": number;
  "Hospital Name": string;
}): HospitalRecommendation => {
  return {
    hospitalName: data["Hospital Name"],
    address: data["Address"],
    distance: data["Distance (km)"],
    contact: data["Contact"],
    department: data["Department"]
  };
}