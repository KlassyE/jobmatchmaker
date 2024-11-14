import { Building2, MapPin, DollarSign } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary?: string; // Make salary optional
  description: string;
  match?: number;
}

export const JobCard = ({
  title,
  company,
  location,
  salary,
  description,
  match = 80,
}: JobCardProps) => {
  return (
    <div className="glass-card rounded-xl p-6 hover-scale">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              {company}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {location}
            </div>
            {salary && (
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {salary}
              </div>
            )}
          </div>
        </div>
        <div className="bg-success/10 px-3 py-1 rounded-full">
          <span className="text-success text-sm font-medium">{match}% Match</span>
        </div>
      </div>
      <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors duration-300">
          Quick Apply
        </button>
        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300">
          Save
        </button>
      </div>
    </div>
  );
};