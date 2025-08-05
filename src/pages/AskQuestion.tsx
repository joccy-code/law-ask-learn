import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { ArrowLeft, Plus, Eye, Send, Tag, HelpCircle } from "lucide-react";

const AskQuestion = () => {
  const popularTags = [
    "Contract Law", "Criminal Law", "Constitutional Law", "Tort Law", 
    "Evidence", "Civil Procedure", "Property Law", "Corporate Law"
  ];

  const tips = [
    "Be specific and clear in your question title",
    "Provide relevant context and background information", 
    "Use appropriate tags to categorize your question",
    "Include any relevant case law or statutes if applicable",
    "Check if your question has been asked before"
  ];

  return (
    <div className="min-h-screen bg-secondary/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <span>/</span>
            <span>Ask Question</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="question-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                    Ask a Legal Question
                  </CardTitle>
                  <CardDescription>
                    Get help from fellow law students and legal experts in the community
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <form className="space-y-6">
                    {/* Question Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Question Title *</Label>
                      <Input 
                        id="title"
                        placeholder="What is your legal question? Be specific and concise."
                        className="text-base"
                      />
                      <p className="text-xs text-muted-foreground">
                        Write a clear, specific title that summarizes your question in one sentence.
                      </p>
                    </div>

                    {/* Question Body */}
                    <div className="space-y-2">
                      <Label htmlFor="content">Question Details *</Label>
                      <Textarea 
                        id="content"
                        placeholder="Provide detailed context, background information, and any relevant facts. Include specific laws, cases, or scenarios if applicable."
                        className="min-h-[200px] text-base"
                      />
                      <p className="text-xs text-muted-foreground">
                        Include all relevant details, context, and any research you've already done.
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags *</Label>
                      <div className="space-y-3">
                        <Input 
                          id="tags"
                          placeholder="Add tags to categorize your question (e.g., contract-law, criminal-procedure)"
                        />
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">Popular tags:</p>
                          <div className="flex flex-wrap gap-2">
                            {popularTags.map((tag, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                              >
                                <Tag className="mr-1 h-3 w-3" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4 pt-4">
                      <Button type="submit" size="lg" className="flex-1 sm:flex-none">
                        <Send className="mr-2 h-4 w-4" />
                        Post Question
                      </Button>
                      <Button variant="outline" size="lg">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Link to="/dashboard">
                        <Button variant="ghost" size="lg">
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tips Card */}
              <Card className="question-card">
                <CardHeader>
                  <CardTitle className="text-lg">How to Ask a Great Question</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Guidelines Card */}
              <Card className="question-card">
                <CardHeader>
                  <CardTitle className="text-lg">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-primary">Be respectful:</strong> Maintain a professional tone and respect different viewpoints.
                  </p>
                  <p>
                    <strong className="text-primary">Stay on topic:</strong> Keep discussions focused on legal matters and education.
                  </p>
                  <p>
                    <strong className="text-primary">No legal advice:</strong> Share knowledge but avoid giving personal legal advice.
                  </p>
                  <p>
                    <strong className="text-primary">Cite sources:</strong> Reference cases, statutes, or legal authorities when applicable.
                  </p>
                </CardContent>
              </Card>

              {/* Related Questions */}
              <Card className="question-card">
                <CardHeader>
                  <CardTitle className="text-lg">Related Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>• What makes a contract legally binding?</p>
                    <p>• Elements of negligence in tort law</p>
                    <p>• Fourth Amendment search requirements</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Search Similar Questions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;