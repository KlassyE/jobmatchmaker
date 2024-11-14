import { ResumeUpload } from "@/components/ResumeUpload";
import { JobCard } from "@/components/JobCard";
import { ApplicationTracker } from "@/components/ApplicationTracker";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const mockJobs = [
  {
    title: "Senior Frontend Developer",
    company: "Apple",
    location: "Cupertino, CA",
    salary: "150k-200k",
    description:
      "We are looking for a Senior Frontend Developer to join our team and help build the next generation of web applications.",
    match: 95,
  },
  {
    title: "UI/UX Designer",
    company: "Google",
    location: "Mountain View, CA",
    salary: "130k-180k",
    description:
      "Join our design team to create beautiful and intuitive user interfaces for millions of users worldwide.",
    match: 88,
  },
];

const Index = () => {
  const [hasResume, setHasResume] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      // Here you would implement the actual job scraping logic
      toast({
        title: "Searching for jobs",
        description: "Scanning multiple job boards for relevant positions...",
      });
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
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
                Recommended Jobs
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {mockJobs.map((job, index) => (
                  <div
                    key={index}
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