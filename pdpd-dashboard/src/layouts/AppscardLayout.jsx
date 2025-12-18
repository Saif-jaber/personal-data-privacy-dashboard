import { useState } from "react";
import AppsCard from "../components/AppsCard.jsx";

const initialApps = [  //place holder for now
  {
    id: 1,
    name: "Jira",
    description: "View the latest updates from Jira in pages and databases",
    icon: "https://tse2.mm.bing.net/th/id/OIP.lZsUSK8u7CUuom-RUT_saAHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    enabled: true,
  },
  {
    id: 2,
    name: "Slack",
    description: "See Slack messages directly for easy sharing and collaboration",
    icon: "https://tse1.mm.bing.net/th/id/OIP.OWFtuTyymkRoz2CyOr0MlQHaHb?cb=ucfimg2&ucfimg=1&w=1583&h=1588&rs=1&pid=ImgDetMain&o=7&rm=3",
    enabled: true,
  },
  {
    id: 3,
    name: "GitHub",
    description: "View the latest updates from GitHub in pages and databases",
    icon: "data:image/webp;base64,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",
    enabled: false,
  },
  {
    id: 4,
    name: "Asana",
    description: "Connect Asana tasks to see the latest updates across teams",
    icon: "https://lh3.googleusercontent.com/ABdQEpMgXlsAZRKs8UFrB1AQ70dqBUKnx8e7eEGmMuNkHk16VL9bdp9g3YLztIjuRvKHtlBO74H2jVjTB62rH4U=s128-rj-sc0x00ffffff",
    enabled: true,
  },
];

const AppscardLayout = () => {
  const [apps, setApps] = useState(initialApps);

  const toggleApp = (id) => {
    setApps((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, enabled: !app.enabled } : app
      )
    );
  };

  return (
    <div className="apps-grid">
      {apps.map((app) => (
        <AppsCard
          key={app.id}
          icon={app.icon}
          name={app.name}
          description={app.description}
          enabled={app.enabled}
          onToggle={() => toggleApp(app.id)}
        />
      ))}
    </div>
  );
};

export default AppscardLayout;
