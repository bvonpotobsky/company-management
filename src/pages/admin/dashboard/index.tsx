import type {Metadata} from "next";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";

import AdminLayout from "~/components/layout.admin";

import {Overview} from "~/components/overview-graph";
import RecentLogs from "~/components/recent-logs";
import AnalyticsCards from "~/components/ui/analytics-cards";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

export default function DashboardPage() {
  return (
    <>
      <AdminLayout>
        <section className="flex-col space-y-4 md:flex">
          <AnalyticsCards />
          <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 md:col-span-3">
              <CardHeader>
                <CardTitle>Recent Logs</CardTitle>
                <CardDescription>
                  Updated <span className="font-semibold">3 minutes</span> ago
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentLogs />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
          </div>
        </section>
      </AdminLayout>
    </>
  );
}
