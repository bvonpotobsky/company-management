import {api} from "~/utils/api";

import RecentLogs from "~/components/recent-logs";

const LogsContainer: React.FC = () => {
  const {data: logs} = api.logs.getAllCurrentProfile.useQuery();

  return <>{logs && <RecentLogs logs={logs} />}</>;
};

export default LogsContainer;
