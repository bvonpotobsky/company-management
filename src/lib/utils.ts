import {Item} from "@prisma/client";
import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    {value: 1, symbol: ""},
    {value: 1e3, symbol: "K"},
    {value: 1e6, symbol: "M"},
    {value: 1e9, symbol: "G"},
    {value: 1e12, symbol: "T"},
    {value: 1e15, symbol: "P"},
    {value: 1e18, symbol: "E"},
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol : "0";
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export const getNameInitials = (fullName: string) => {
  const names = fullName.split(" ");

  const initials = names.map((name) => name.charAt(0).toUpperCase()).join("");

  return initials;
};

export const getTotalInvoiceAmount = (items: Item[]): number => {
  return items.reduce((acc, item) => acc + item.price, 0);
};
