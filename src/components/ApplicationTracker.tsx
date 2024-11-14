import { CheckCircle, Clock, XCircle } from "lucide-react";

interface Application {
  id: string;
  company: string;
  position: string;
  status: "applied" | "interviewing" | "rejected";
  date: string;
}

const applications: Application[] = [
  {
    id: "1",
    company: "Apple",
    position: "Senior Frontend Developer",
    status: "applied",
    date: "2024-02-20",
  },
  {
    id: "2",
    company: "Google",
    position: "UI/UX Designer",
    status: "interviewing",
    date: "2024-02-18",
  },
  {
    id: "3",
    company: "Meta",
    position: "Product Manager",
    status: "rejected",
    date: "2024-02-15",
  },
];

const getStatusIcon = (status: Application["status"]) => {
  switch (status) {
    case "applied":
      return <Clock className="w-5 h-5 text-warning" />;
    case "interviewing":
      return <CheckCircle className="w-5 h-5 text-success" />;
    case "rejected":
      return <XCircle className="w-5 h-5 text-destructive" />;
  }
};

export const ApplicationTracker = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Application Tracker</h2>
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="glass-card rounded-xl p-4 flex items-center justify-between hover-scale"
          >
            <div className="flex items-center gap-4">
              {getStatusIcon(app.status)}
              <div>
                <h3 className="font-medium">{app.position}</h3>
                <p className="text-sm text-gray-600">{app.company}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">{app.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};