import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Briefcase, 
  Calendar, 
  GraduationCap, 
  MapPin, 
  Clock, 
  Building, 
  ExternalLink,
  Star,
  Users,
  DollarSign
} from "lucide-react";

const Recommendations = () => {
  const jobOpportunities = [
    {
      id: 1,
      title: "Junior Legal Associate",
      company: "Baker & McKenzie",
      location: "New York, NY",
      type: "Full-time",
      salary: "$75,000 - $95,000",
      posted: "2 days ago",
      description: "Seeking a motivated junior associate to join our corporate law team.",
      requirements: ["JD degree", "0-2 years experience", "Strong research skills"],
      tags: ["Corporate Law", "Entry Level"]
    },
    {
      id: 2,
      title: "Legal Intern",
      company: "Davis Polk & Wardwell",
      location: "San Francisco, CA",
      type: "Internship",
      salary: "$3,000/month",
      posted: "1 week ago",
      description: "Summer internship program for law students interested in securities law.",
      requirements: ["2L or 3L student", "Top 20% of class", "Securities law interest"],
      tags: ["Securities Law", "Internship", "Summer Program"]
    },
    {
      id: 3,
      title: "Paralegal Position",
      company: "Latham & Watkins",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$55,000 - $70,000",
      posted: "3 days ago",
      description: "Join our litigation team as a paralegal supporting complex commercial cases.",
      requirements: ["Bachelor's degree", "Paralegal certificate", "Litigation experience"],
      tags: ["Litigation", "Paralegal"]
    }
  ];

  const events = [
    {
      id: 1,
      title: "Constitutional Law Symposium",
      organizer: "American Bar Association",
      date: "March 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Chicago, IL",
      type: "Conference",
      description: "Annual symposium featuring leading constitutional law scholars and practitioners.",
      fee: "Free for students",
      cle: "7 CLE Credits",
      attendees: 250
    },
    {
      id: 2,
      title: "Corporate Law Career Fair",
      organizer: "National Law Student Association",
      date: "March 22, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Virtual Event",
      type: "Career Fair",
      description: "Connect with top law firms and corporate legal departments.",
      fee: "Free",
      cle: "N/A",
      attendees: 500
    },
    {
      id: 3,
      title: "Technology and Privacy Law Workshop",
      organizer: "Tech Law Institute",
      date: "April 5, 2024",
      time: "2:00 PM - 6:00 PM",
      location: "Boston, MA",
      type: "Workshop",
      description: "Hands-on workshop covering emerging issues in technology and privacy law.",
      fee: "$50 for students",
      cle: "4 CLE Credits",
      attendees: 100
    }
  ];

  const internships = [
    {
      id: 1,
      title: "Supreme Court Clerkship Program",
      organization: "U.S. Supreme Court",
      duration: "1 Year",
      location: "Washington, D.C.",
      application_deadline: "January 31, 2024",
      description: "Prestigious clerkship opportunity with Supreme Court Justices.",
      requirements: ["Top 5% of class", "Law Review", "Strong writing samples"],
      benefits: ["$70,000 stipend", "Unparalleled experience", "Career advancement"],
      tags: ["Clerkship", "Supreme Court", "Prestigious"]
    },
    {
      id: 2,
      title: "DOJ Legal Internship",
      organization: "Department of Justice",
      duration: "Summer (10 weeks)",
      location: "Multiple locations",
      application_deadline: "February 15, 2024",
      description: "Work alongside federal prosecutors on significant cases.",
      requirements: ["2L student", "Criminal law coursework", "Security clearance eligible"],
      benefits: ["$4,000/month", "Government experience", "Networking"],
      tags: ["Government", "Criminal Law", "Federal"]
    },
    {
      id: 3,
      title: "Public Interest Fellowship",
      organization: "ACLU",
      duration: "6 months",
      location: "Various offices",
      application_deadline: "March 1, 2024",
      description: "Support civil liberties litigation and advocacy efforts.",
      requirements: ["Commitment to civil rights", "Research skills", "Passion for justice"],
      benefits: ["$35,000 stipend", "Public interest experience", "Social impact"],
      tags: ["Public Interest", "Civil Rights", "Advocacy"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Career Recommendations
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover opportunities tailored for law students and legal professionals
            </p>
          </div>

          <Tabs defaultValue="jobs" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Job Opportunities
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Events & Conferences
              </TabsTrigger>
              <TabsTrigger value="internships" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Internships
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobOpportunities.map((job) => (
                  <Card key={job.id} className="question-card hover:shadow-accent">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {job.company}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </div>
                      </div>
                      <p className="text-sm">{job.description}</p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Requirements:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="h-1 w-1 rounded-full bg-accent" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {job.posted}
                        </span>
                        <Button size="sm" className="gap-2">
                          Apply <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {events.map((event) => (
                  <Card key={event.id} className="question-card hover:shadow-accent">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {event.organizer}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-accent" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-accent" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-accent" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>
                      <p className="text-sm">{event.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-success">
                            {event.fee}
                          </p>
                          {event.cle !== "N/A" && (
                            <p className="text-xs text-muted-foreground">
                              {event.cle}
                            </p>
                          )}
                        </div>
                        <Button size="sm" className="gap-2">
                          Register <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="internships" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {internships.map((internship) => (
                  <Card key={internship.id} className="question-card hover:shadow-accent">
                    <CardHeader>
                      <CardTitle className="text-lg">{internship.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {internship.organization}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>{internship.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-accent" />
                          <span>{internship.location}</span>
                        </div>
                      </div>
                      <div className="bg-accent-light p-3 rounded-lg">
                        <p className="text-sm font-medium text-accent-foreground">
                          Application Deadline: {internship.application_deadline}
                        </p>
                      </div>
                      <p className="text-sm">{internship.description}</p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Requirements:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {internship.requirements.map((req, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="h-1 w-1 rounded-full bg-accent" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Benefits:</p>
                        <ul className="text-sm text-success space-y-1">
                          {internship.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Star className="h-3 w-3 fill-current" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {internship.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full gap-2">
                        Apply Now <ExternalLink className="h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Recommendations;