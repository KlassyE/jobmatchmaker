import { ResumeUpload } from "@/components/ResumeUpload";
import { JobCard } from "@/components/JobCard";
import { ApplicationTracker } from "@/components/ApplicationTracker";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { searchJobs, LinkedInJob } from "@/services/linkedin";

const Index = () => {
  const [hasResume, setHasResume] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [jobs, setJobs] = useState<LinkedInJob[]>([]);
  const { toast } = useToast();

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const fetchedJobs = await searchJobs("software engineer");
      setJobs(fetchedJobs);
      toast({
        title: "Jobs found!",
        description: `Found ${fetchedJobs.length} matching positions.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch jobs. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="w-full py-8 text-center">
        <h1 className="text-4xl font-bold mb-2 fade-in">Job Application Helper</h1>
        <p className="text-gray-600 fade-in">
          Upload your resume and let us help you find your dream job
        </p>
      </header>

      <main className="container mx-auto px-4">
        <section className="mb-12 fade-in">
          <ResumeUpload onUploadSuccess={() => setHasResume(true)} />
        </section>

        {hasResume && (
          <>
            <section className="mb-8 text-center">
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="gap-2"
              >
                <Search className="w-4 h-4" />
                {isSearching ? "Searching..." : "Search Jobs"}
              </Button>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 fade-in">
                Found Jobs
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {jobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <JobCard {...job} />
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12 fade-in">
              <ApplicationTracker />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;