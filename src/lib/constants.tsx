import {Building, LayoutDashboard, PersonStanding, Receipt, Users} from "lucide-react";

export type Route = (typeof ROUTES_ADMIN)[number];

export const ROUTES_ADMIN = [
  {href: "/admin/dashboard", label: "Overview", icon: <LayoutDashboard />},
  {href: "/admin/dashboard/invoices", label: "Invoices", icon: <Receipt />},
  {href: "/admin/dashboard/projects", label: "Projects", icon: <Building />},
  {href: "/admin/dashboard/employees", label: "Employees", icon: <Users />},
  {href: "/admin/dashboard/clients", label: "Clients", icon: <PersonStanding />},
];

export const ROUTES_EMPLOYEE = [
  {href: "/employee/dashboard", label: "Overview", icon: <LayoutDashboard />},
  {href: "/employee/dashboard/invoices", label: "Invoices", icon: <Receipt />},
  {href: "/employee/profile", label: "Employees", icon: <Users />},
];

export const COUNTRIES = [
  {id: "AU", name: "Australia"},
  {id: "NZ", name: "New Zealand"},
];
