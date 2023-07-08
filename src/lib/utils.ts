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

export const formatAsPrice = (num: number) => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  });
};

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

// split/trim full name and return first and last name
export const splitFullName = (fullName: string) => {
  const nameParts = fullName.trim().split(" ");

  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return {
    firstName,
    lastName,
  };
};

export const getProfileAge = (dob: Date) => {
  const today = new Date();
  const birthDate = new Date(dob);

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export const formatTime = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0").toString().padStart(2, "0")}hs`;
};

export const calculateHoursWorked = (startTime: Date, endTime: Date) => {
  // Calculate the time difference in milliseconds
  const timeDiff = endTime.getTime() - startTime.getTime();

  // Convert milliseconds to hours, minutes, and seconds
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  // Format the result as "hh:mm:ss"
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return formattedTime;
};
