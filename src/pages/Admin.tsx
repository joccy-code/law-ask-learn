import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  MessageSquare, 
  MessageCircle, 
  Flag, 
  Settings, 
  Activity,
  Search,
  Eye,
  Ban,
  Trash2,
  Edit,
  UserCheck,
  AlertTriangle,
  BarChart3,
  Plus,
  Bell
} from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [warningDialogOpen, setWarningDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [warningForm, setWarningForm] = useState({
    type: "",
    severity: "medium",
    title: "",
    description: ""
  });
  const { toast } = useToast();

  // Mock data
  const dashboardStats = {
    totalUsers: 1247,
    totalQuestions: 892,
    totalAnswers: 2341,
    pendingReports: 12
  };

  const mockUsers = [
    { id: 1, username: "john_law", email: "john@example.com", role: "Student", status: "Active", joinedDate: "2024-01-15" },
    { id: 2, username: "sarah_mentor", email: "sarah@example.com", role: "Mentor", status: "Active", joinedDate: "2024-01-10" },
    { id: 3, username: "mike_student", email: "mike@example.com", role: "Student", status: "Banned", joinedDate: "2024-01-20" },
  ];

  const mockQuestions = [
    { id: 1, title: "Contract Law Question about Consideration", author: "john_law", date: "2024-01-25", topic: "Contract Law", upvotes: 15, reports: 0 },
    { id: 2, title: "Criminal Law - Elements of Murder", author: "sarah_mentor", date: "2024-01-24", topic: "Criminal Law", upvotes: 23, reports: 1 },
  ];

  const mockReports = [
    { id: 1, type: "Question", content: "Contract Law Question about...", reporter: "user123", reason: "Inappropriate content", date: "2024-01-25", reportedUser: "john_law" },
    { id: 2, type: "Answer", content: "The answer to this question...", reporter: "user456", reason: "Spam", date: "2024-01-24", reportedUser: "mike_student" },
  ];

  const handleBanUser = (user: any) => {
    setSelectedUser(user);
    setBanDialogOpen(true);
  };

  const confirmBanUser = () => {
    if (selectedUser) {
      toast({
        title: "User Banned",
        description: `${selectedUser.username} has been banned from the platform.`,
        variant: "destructive"
      });
      setBanDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleIssueWarning = (report: any) => {
    setSelectedReport(report);
    setWarningForm({
      type: "",
      severity: "medium",
      title: "",
      description: ""
    });
    setWarningDialogOpen(true);
  };

  const submitWarning = () => {
    if (selectedReport && warningForm.title && warningForm.description && warningForm.type) {
      toast({
        title: "Warning Issued",
        description: `Warning has been sent to ${selectedReport.reportedUser} for ${warningForm.type}.`,
        variant: "default"
      });
      setWarningDialogOpen(false);
      setSelectedReport(null);
      setWarningForm({
        type: "",
        severity: "medium",
        title: "",
        description: ""
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Law Q&A Admin Panel</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Badge variant="destructive">{dashboardStats.pendingReports}</Badge>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card">
          <nav className="space-y-2 p-4">
            <Button 
              variant={activeTab === "dashboard" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("dashboard")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button 
              variant={activeTab === "users" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-2 h-4 w-4" />
              User Management
            </Button>
            <Button 
              variant={activeTab === "questions" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("questions")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Questions
            </Button>
            <Button 
              variant={activeTab === "answers" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("answers")}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Answers
            </Button>
            <Button 
              variant={activeTab === "reports" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("reports")}
            >
              <Flag className="mr-2 h-4 w-4" />
              Reports
              {dashboardStats.pendingReports > 0 && (
                <Badge variant="destructive" className="ml-auto">
                  {dashboardStats.pendingReports}
                </Badge>
              )}
            </Button>
            <Button 
              variant={activeTab === "topics" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("topics")}
            >
              <Edit className="mr-2 h-4 w-4" />
              Topics
            </Button>
            <Button 
              variant={activeTab === "settings" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button 
              variant={activeTab === "logs" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("logs")}
            >
              <Activity className="mr-2 h-4 w-4" />
              Activity Logs
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.totalUsers}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.totalQuestions}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Answers</CardTitle>
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.totalAnswers}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                    <Flag className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-destructive">{dashboardStats.pendingReports}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">New report submitted for question #892</span>
                      <span className="text-xs text-muted-foreground ml-auto">2 min ago</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserCheck className="h-4 w-4 text-green-500" />
                      <span className="text-sm">New user registration: john_law</span>
                      <span className="text-xs text-muted-foreground ml-auto">5 min ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">User Management</h2>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Search users..." className="w-64" />
                  <Button variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "Mentor" ? "default" : "secondary"}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinedDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleBanUser(user)}
                              disabled={user.status === "Banned"}
                            >
                              <Ban className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === "questions" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Question Management</h2>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Search questions..." className="w-64" />
                  <Button variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Topic</TableHead>
                      <TableHead>Upvotes</TableHead>
                      <TableHead>Reports</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockQuestions.map((question) => (
                      <TableRow key={question.id}>
                        <TableCell className="font-medium max-w-xs truncate">
                          {question.title}
                        </TableCell>
                        <TableCell>{question.author}</TableCell>
                        <TableCell>{question.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{question.topic}</Badge>
                        </TableCell>
                        <TableCell>{question.upvotes}</TableCell>
                        <TableCell>
                          {question.reports > 0 ? (
                            <Badge variant="destructive">{question.reports}</Badge>
                          ) : (
                            <span className="text-muted-foreground">0</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Reported Content</h2>
              
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Reports</TabsTrigger>
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                  <TabsTrigger value="answers">Answers</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-6">
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Content Preview</TableHead>
                          <TableHead>Reporter</TableHead>
                          <TableHead>Reported User</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockReports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell>
                              <Badge variant={report.type === "Question" ? "default" : "secondary"}>
                                {report.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {report.content}
                            </TableCell>
                            <TableCell>{report.reporter}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{report.reportedUser}</Badge>
                            </TableCell>
                            <TableCell>{report.reason}</TableCell>
                            <TableCell>{report.date}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleIssueWarning(report)}
                                >
                                  Issue Warning
                                </Button>
                                <Button variant="outline" size="sm">
                                  Dismiss
                                </Button>
                                <Button variant="destructive" size="sm">
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeTab === "topics" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Topic Management</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Topic
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {["Contract Law", "Criminal Law", "Constitutional Law", "Tort Law", "Property Law", "Civil Procedure"].map((topic, index) => (
                  <Card key={topic}>
                    <CardHeader>
                      <CardTitle className="text-lg">{topic}</CardTitle>
                      <CardDescription>{Math.floor(Math.random() * 100) + 50} questions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">System Settings</h2>
              
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Configuration</CardTitle>
                    <CardDescription>Manage general platform settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Enable User Registrations</span>
                      <Button variant="outline">Toggle</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Auto-hide reported content (3+ reports)</span>
                      <Button variant="outline">Toggle</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Content Moderation</CardTitle>
                    <CardDescription>Set thresholds and rules for content moderation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Reports threshold for auto-hide</span>
                      <Input type="number" defaultValue="3" className="w-20" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Enable automatic spam detection</span>
                      <Button variant="outline">Toggle</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "logs" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Activity Logs</h2>
              
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>2024-01-25 14:30</TableCell>
                      <TableCell>admin_user</TableCell>
                      <TableCell>User Banned</TableCell>
                      <TableCell>mike_student</TableCell>
                      <TableCell>Violation of community guidelines</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2024-01-25 14:25</TableCell>
                      <TableCell>admin_user</TableCell>
                      <TableCell>Content Deleted</TableCell>
                      <TableCell>Question #892</TableCell>
                      <TableCell>Inappropriate content</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2024-01-25 14:20</TableCell>
                      <TableCell>moderator_1</TableCell>
                      <TableCell>Report Dismissed</TableCell>
                      <TableCell>Answer #1234</TableCell>
                      <TableCell>No violation found</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Ban User Warning Dialog */}
      <AlertDialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Ban User Warning
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                You are about to ban <strong>{selectedUser?.username}</strong> from the Law Q&A platform.
              </p>
              <p className="text-destructive font-medium">
                This action will:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Prevent the user from logging into their account</li>
                <li>Hide all their questions and answers from public view</li>
                <li>Remove their ability to participate in the community</li>
                <li>Require admin intervention to restore access</li>
              </ul>
              <p className="text-muted-foreground text-sm mt-4">
                Please ensure you have reviewed the user's activity and this action is justified according to platform guidelines.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmBanUser}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Confirm Ban
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Issue Warning Dialog */}
      <Dialog open={warningDialogOpen} onOpenChange={setWarningDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Issue Warning to {selectedReport?.reportedUser}
            </DialogTitle>
            <DialogDescription>
              Issue a formal warning to the user for violating platform guidelines.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="warning-type">Warning Type</Label>
              <Select value={warningForm.type} onValueChange={(value) => setWarningForm({...warningForm, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select warning type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spam">Spam</SelectItem>
                  <SelectItem value="inappropriate_content">Inappropriate Content</SelectItem>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="plagiarism">Plagiarism</SelectItem>
                  <SelectItem value="off_topic">Off Topic</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity">Severity</Label>
              <Select value={warningForm.severity} onValueChange={(value) => setWarningForm({...warningForm, severity: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="warning-title">Warning Title</Label>
              <Input
                id="warning-title"
                placeholder="Enter warning title"
                value={warningForm.title}
                onChange={(e) => setWarningForm({...warningForm, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="warning-description">Warning Description</Label>
              <Textarea
                id="warning-description"
                placeholder="Provide detailed explanation of the violation and expected behavior"
                value={warningForm.description}
                onChange={(e) => setWarningForm({...warningForm, description: e.target.value})}
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setWarningDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={submitWarning}
              disabled={!warningForm.title || !warningForm.description || !warningForm.type}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Issue Warning
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;