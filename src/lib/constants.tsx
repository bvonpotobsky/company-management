import {Building, Group, LayoutDashboard, Paperclip, PersonStanding} from "lucide-react";

export type Route = (typeof ROUTES)[number];

export const ROUTES = [
  {href: "/admin/dashboard", label: "Overview", icon: <LayoutDashboard />},
  {href: "/admin/dashboard/invoices", label: "Invoices", icon: <Paperclip />},
  {href: "/admin/dashboard/projects", label: "Projects", icon: <Building />},
  {href: "/admin/dashboard/employees", label: "Employees", icon: <Group />},
  {href: "/admin/dashboard/clients", label: "Clients", icon: <PersonStanding />},
];
