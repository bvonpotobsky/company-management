import {Building, LayoutDashboard, PersonStanding, Receipt, Users} from "lucide-react";

export type Route = (typeof ROUTES)[number];

export const ROUTES = [
  {href: "/admin/dashboard", label: "Overview", icon: <LayoutDashboard />},
  {href: "/admin/dashboard/invoices", label: "Invoices", icon: <Receipt />},
  {href: "/admin/dashboard/projects", label: "Projects", icon: <Building />},
  {href: "/admin/dashboard/employees", label: "Employees", icon: <Users />},
  {href: "/admin/dashboard/clients", label: "Clients", icon: <PersonStanding />},
];

export const COUNTRIES = [
  {id: "AU", name: "Australia"},
  {id: "NZ", name: "New Zealand"},
];
