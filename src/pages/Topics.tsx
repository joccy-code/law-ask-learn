import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { Search, Users, MessageSquare, TrendingUp, BookOpen, Plus, Gavel, Shield, Building, FileText, Scale, User } from "lucide-react";

const Topics = () => {
  const topicCategories = [
    {
      name: "Core Legal Areas",
      topics: [
        { name: "Constitutional Law", icon: Scale, followers: 1200, questions: 340, description: "Constitutional principles, rights, and government powers", color: "text-blue-600" },
        { name: "Contract Law", icon: FileText, followers: 980, questions: 280, description: "Agreements, obligations, and contractual relationships", color: "text-green-600" },
        { name: "Criminal Law", icon: Shield, followers: 850, questions: 220, description: "Criminal offenses, defenses, and criminal procedure", color: "text-red-600" },
        { name: "Tort Law", icon: Gavel, followers: 720, questions: 190, description: "Civil wrongs, negligence, and personal injury", color: "text-purple-600" }
      ]
    },
    {
      name: "Procedure & Practice",
      topics: [
        { name: "Civil Procedure", icon: Building, followers: 650, questions: 160, description: "Court procedures, litigation, and civil practice", color: "text-indigo-600" },
        { name: "Evidence Law", icon: Search, followers: 540, questions: 140, description: "Rules of evidence, admissibility, and proof", color: "text-orange-600" },
        { name: "Criminal Procedure", icon: Shield, followers: 480, questions: 120, description: "Criminal justice process and defendant rights", color: "text-pink-600" },
        { name: "Legal Ethics", icon: User, followers: 420, questions: 95, description: "Professional responsibility and legal ethics", color: "text-teal-600" }
      ]
    },
    {
      name: "Specialized Areas", 
      topics: [
        { name: "Corporate Law", icon: Building, followers: 380, questions: 85, description: "Business entities, corporate governance, and transactions", color: "text-cyan-600" },
        { name: "Property Law", icon: BookOpen, followers: 340, questions: 78, description: "Real property, ownership rights, and transfers", color: "text-emerald-600" },
        { name: "Family Law", icon: Users, followers: 290, questions: 65, description: "Marriage, divorce, custody, and domestic relations", color: "text-rose-600" },
        { name: "Tax Law", icon: FileText, followers: 250, questions: 52, description: "Taxation, tax planning, and tax compliance", color: "text-amber-600" }
      ]
    }
  ];

  const trendingTopics = [
    { name: "AI and Legal Ethics", growth: "+45%" },
    { name: "Cannabis Law", growth: "+32%" },
    { name: "Cryptocurrency Regulation", growth: "+28%" },
    { name: "Data Privacy Law", growth: "+25%" }
  ];

  return (
    <div className="min-h-screen bg-secondary/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Legal Topics</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore legal topics, follow areas of interest, and join discussions with fellow law students.
            </p>
          </div>

          {/* Search and Actions */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="Search topics..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Suggest Topic
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Topics */}
            <div className="lg:col-span-3 space-y-8">
              {topicCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-xl font-semibold mb-4 text-primary">{category.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.topics.map((topic, index) => (
                      <Card key={index} className="question-card hover:scale-105 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-lg bg-background flex items-center justify-center ${topic.color}`}>
                                <topic.icon className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-primary hover:text-primary-hover transition-colors">
                                  {topic.name}
                                </h3>
                                <p className="text-xs text-muted-foreground">{topic.description}</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Follow
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Users className="h-3 w-3" />
                                <span>{topic.followers.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageSquare className="h-3 w-3" />
                                <span>{topic.questions}</span>
                              </div>
                            </div>
                            <Link to={`/topics/${topic.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary hover:underline">
                              View Questions →
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <Card className="question-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-accent" />
                    Trending Now
                  </CardTitle>
                  <CardDescription>Hot topics this week</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="text-sm font-medium">{topic.name}</div>
                      <Badge variant="outline" className="text-xs text-success">
                        {topic.growth}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* My Topics */}
              <Card className="question-card">
                <CardHeader>
                  <CardTitle>My Followed Topics</CardTitle>
                  <CardDescription>Topics you're following</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                    <span className="text-sm font-medium">Constitutional Law</span>
                    <Badge variant="secondary" className="text-xs">12 new</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                    <span className="text-sm font-medium">Contract Law</span>
                    <Badge variant="secondary" className="text-xs">8 new</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                    <span className="text-sm font-medium">Criminal Law</span>
                    <Badge variant="secondary" className="text-xs">5 new</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Manage Topics
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="question-card">
                <CardHeader>
                  <CardTitle>Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Topics:</span>
                    <span className="font-medium">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active This Week:</span>
                    <span className="font-medium">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">New Questions:</span>
                    <span className="font-medium">245</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expert Contributors:</span>
                    <span className="font-medium">156</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topics;