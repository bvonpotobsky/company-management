import EmployeeLayout from "~/components/layout.employee";

import ProjectsContainer from "~/components/overview/projects-container";
import ShiftsContainer from "~/components/overview/shifts-container";
import LogsContainer from "~/components/overview/logs-container";

const DashboardPage = () => {
  return (
    <EmployeeLayout>
      <section className="mb-12 flex-col space-y-4 md:flex">
        <ProjectsContainer />
        <LogsContainer />
        <ShiftsContainer />
      </section>
    </EmployeeLayout>
  );
};

export default DashboardPage;
