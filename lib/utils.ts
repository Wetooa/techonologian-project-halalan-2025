import { FormData, FormDataGroupKeys, SENATOR_LIST } from "@/utils/utils";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupBySenator(data: FormData[]) {
  const map = new Map();
  SENATOR_LIST.forEach((senator) => map.set(senator, 0));

  data.forEach((row) => {
    row.selection.forEach((senator: string) => {
      map.set(senator, (map.get(senator) || 0) + 1);
    });
  });

  const result = Array.from(map.entries());
  return result;
}

export function groupByField(data: FormData[], field: FormDataGroupKeys) {
  const map = new Map();
  data.forEach((row) => {
    map.set(row[field], (map.get(row[field]) || 0) + 1);
  });
  const result = Array.from(map.entries());
  return result;
}
