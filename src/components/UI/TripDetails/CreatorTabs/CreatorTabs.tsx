import TTTabs from "@/components/Shared/TTTabs/TTTabs";
import type { TTrip } from "@/types";
import { Stack } from "@mui/material";
import { useState } from "react";
import TripDetailsInvitesTab from "../InvitesTab/InvitesTab";
import TripDetailsOverviewTab from "../OverviewTab/OverviewTab";
import TripDetailsRequestsTab from "../RequestsTab/RequestsTab";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MailIcon from "@mui/icons-material/Mail";

type TripDetailsCreatorTabsProps = {
  tripId: string;
  trip: TTrip;
};

const TripDetailsCreatorTabs = ({
  tripId,
  trip,
}: TripDetailsCreatorTabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <Stack>
      <TTTabs
        sx={{ mt: 5, mb: 4 }}
        value={activeTab}
        onChange={(v) => setActiveTab(v as number)}
        tabs={[
          { label: "Overview", icon: <DashboardIcon sx={{ fontSize: 18 }} /> },
          {
            label: "Request to join",
            icon: <PersonAddIcon sx={{ fontSize: 18 }} />,
          },
          { label: "Invite to join", icon: <MailIcon sx={{ fontSize: 18 }} /> },
        ]}
      />

      {activeTab === 0 && <TripDetailsOverviewTab trip={trip} />}
      {activeTab === 1 && <TripDetailsRequestsTab />}
      {activeTab === 2 && <TripDetailsInvitesTab />}
    </Stack>
  );
};

export default TripDetailsCreatorTabs;
