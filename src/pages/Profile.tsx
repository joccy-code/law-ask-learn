import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, MessageSquare, ThumbsUp, Award, Calendar, MapPin, School } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@lawschool.edu",
    bio: "3rd year law student specializing in constitutional law and civil rights. Passionate about legal research and helping fellow students understand complex legal concepts.",
    school: "Harvard Law School",
    year: "3L",
    location: "Cambridge, MA",
    joinDate: "September 2023"
  });

  const stats = {
    questionsAsked: 24,
    answersGiven: 87,
    upvotes: 342,
    reputation: 1250
  };

  const recentQuestions = [
    {
      id: 1,
      title: "What are the key differences between strict scrutiny and intermediate scrutiny?",
      topic: "Constitutional Law",
      upvotes: 15,
      answers: 8,
      date: "2 days ago"
    },
    {
      id: 2,
      title: "How does the Commerce Clause affect state regulations?",
      topic: "Constitutional Law",
      upvotes: 23,
      answers: 12,
      date: "1 week ago"
    },
    {
      id: 3,
      title: "Can someone explain the concept of proximate cause in tort law?",
      topic: "Tort Law",
      upvotes: 31,
      answers: 15,
      date: "2 weeks ago"
    }
  ];

  const recentAnswers = [
    {
      id: 1,
      question: "What is the difference between murder and manslaughter?",
      preview: "The key distinction lies in the mental state (mens rea) of the defendant. Murder requires malice aforethought...",
      upvotes: 28,
      date: "1 day ago",
      topic: "Criminal Law"
    },
    {
      id: 2,
      question: "How does the Fourth Amendment apply to digital searches?",
      preview: "The Supreme Court has evolved its interpretation of the Fourth Amendment to address modern technology...",
      upvotes: 45,
      date: "3 days ago",
      topic: "Constitutional Law"
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg" alt={profile.name} />
                <AvatarFallback className="text-2xl">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">{profile.name}</h1>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <School className="w-4 h-4" />
                        <span>{profile.school} - {profile.year}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {profile.joinDate}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant={isEditing ? "default" : "outline"} 
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>
                
                {isEditing ? (
                  <Textarea 
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="min-h-[100px]"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">{stats.questionsAsked}</div>
              <div className="text-sm text-muted-foreground">Questions Asked</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold text-foreground">{stats.answersGiven}</div>
              <div className="text-sm text-muted-foreground">Answers Given</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <ThumbsUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-foreground">{stats.upvotes}</div>
              <div className="text-sm text-muted-foreground">Total Upvotes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold text-foreground">{stats.reputation}</div>
              <div className="text-sm text-muted-foreground">Reputation</div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Content Tabs */}
        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="questions">My Questions</TabsTrigger>
            <TabsTrigger value="answers">My Answers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Questions</CardTitle>
                <CardDescription>Questions you've asked recently</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentQuestions.map((question) => (
                  <div key={question.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="font-medium text-foreground hover:text-primary">
                        <Link to={`/question/${question.id}`}>{question.title}</Link>
                      </h3>
                      <span className="text-sm text-muted-foreground">{question.date}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="secondary">{question.topic}</Badge>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {question.upvotes}
                      </span>
                      <span>{question.answers} answers</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="answers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Answers</CardTitle>
                <CardDescription>Your recent contributions to the community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAnswers.map((answer) => (
                  <div key={answer.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="font-medium text-foreground hover:text-primary">
                        <Link to={`/question/${answer.id}`}>{answer.question}</Link>
                      </h3>
                      <span className="text-sm text-muted-foreground">{answer.date}</span>
                    </div>
                    <p className="text-muted-foreground mb-2">{answer.preview}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="secondary">{answer.topic}</Badge>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {answer.upvotes}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school">Law School</Label>
                    <Input 
                      id="school" 
                      value={profile.school}
                      onChange={(e) => setProfile({...profile, school: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input 
                      id="year" 
                      value={profile.year}
                      onChange={(e) => setProfile({...profile, year: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                    />
                  </div>
                </div>
                <Button className="mt-4">Update Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;