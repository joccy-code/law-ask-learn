import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import { ArrowUp, MessageSquare, User, Clock, Filter, TrendingUp, BookOpen, Users } from "lucide-react";

const Dashboard = () => {
  const questions = [
    {
      id: 1,
      title: "What constitutes a valid contract under common law?",
      content: "I'm studying contract law and need clarification on the essential elements that make a contract legally binding...",
      author: "Sarah M.",
      authorRole: "2L Student",
      tags: ["Contract Law", "Common Law", "Legal Elements"],
      upvotes: 24,
      answers: 8,
      timeAgo: "2 hours ago",
      isAnswered: true
    },
    {
      id: 2,
      title: "Miranda Rights application in juvenile cases",
      content: "How do Miranda Rights apply differently when dealing with juvenile suspects? Are there special considerations?",
      author: "Michael R.",
      authorRole: "3L Student", 
      tags: ["Criminal Law", "Miranda Rights", "Juvenile Law"],
      upvotes: 18,
      answers: 5,
      timeAgo: "4 hours ago",
      isAnswered: true
    },
    {
      id: 3,
      title: "Difference between tort and criminal liability",
      content: "Can someone explain the key differences between civil tort liability and criminal liability for the same act?",
      author: "Emma L.",
      authorRole: "1L Student",
      tags: ["Tort Law", "Criminal Law", "Liability"],
      upvotes: 12,
      answers: 3,
      timeAgo: "6 hours ago",
      isAnswered: false
    }
  ];

  const trendingTopics = [
    { name: "Constitutional Law", questions: 145, growth: "+12%" },
    { name: "Contract Law", questions: 128, growth: "+8%" },
    { name: "Criminal Procedure", questions: 89, growth: "+15%" },
    { name: "Tort Law", questions: 76, growth: "+5%" },
    { name: "Evidence Law", questions: 64, growth: "+20%" }
  ];

  return (
    <div className="min-h-screen bg-secondary/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Section */}
            <Card className="question-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">Welcome back, Sarah!</h1>
                    <p className="text-muted-foreground">Ready to dive into today's legal discussions?</p>
                  </div>
                  <Link to="/ask">
                    <Button variant="hero" size="lg">
                      Ask Question
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Tabs defaultValue="recent" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>

              <TabsContent value="recent" className="space-y-4">
                {questions.map((question) => (
                  <Card key={question.id} className="question-card">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Voting */}
                        <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                          <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-medium text-primary">{question.upvotes}</span>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <MessageSquare className="h-3 w-3" />
                            <span>{question.answers}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <Link to={`/question/${question.id}`} className="group">
                              <h3 className="text-lg font-semibold text-primary group-hover:text-primary-hover transition-colors">
                                {question.title}
                              </h3>
                            </Link>
                            {question.isAnswered && (
                              <Badge variant="outline" className="bg-success-light text-success border-success/20">
                                Answered
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {question.content}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {question.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{question.author}</span>
                                <span className="legal-badge">{question.authorRole}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{question.timeAgo}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="trending">
                <Card className="question-card">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Trending Questions</h3>
                    <p className="text-muted-foreground">Questions with the most engagement in the last 24 hours.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="unanswered">
                <Card className="question-card">
                  <CardContent className="p-6 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Unanswered Questions</h3>
                    <p className="text-muted-foreground">Help your fellow students by answering these questions.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="following">
                <Card className="question-card">
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Following Feed</h3>
                    <p className="text-muted-foreground">Questions from topics and users you follow.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card className="question-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-accent" />
                  Trending Topics
                </CardTitle>
                <CardDescription>Hot legal topics this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div>
                      <div className="font-medium text-sm">{topic.name}</div>
                      <div className="text-xs text-muted-foreground">{topic.questions} questions</div>
                    </div>
                    <Badge variant="outline" className="text-xs text-success">
                      {topic.growth}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="question-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/ask" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Ask Question
                  </Button>
                </Link>
                <Link to="/topics" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse Topics
                  </Button>
                </Link>
                <Link to="/profile" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;