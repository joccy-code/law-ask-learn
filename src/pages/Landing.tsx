import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageSquare, Users, Trophy, BookOpen, ArrowRight, Star, Quote } from "lucide-react";
import heroImage from "@/assets/hero-legal.jpg";

const Landing = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Ask & Answer",
      description: "Post legal questions and get expert answers from fellow students and mentors."
    },
    {
      icon: Users,
      title: "Expert Community", 
      description: "Connect with law students, professors, and legal professionals worldwide."
    },
    {
      icon: Trophy,
      title: "Build Reputation",
      description: "Earn recognition through helpful answers and quality contributions."
    },
    {
      icon: BookOpen,
      title: "Legal Topics",
      description: "Explore specialized areas from contract law to criminal justice."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "3L Student, Harvard Law",
      content: "LawQA helped me understand complex constitutional law concepts through peer discussions. The community is incredibly supportive!",
      rating: 5
    },
    {
      name: "Marcus Johnson", 
      role: "2L Student, Stanford Law",
      content: "I've gotten better answers here than in some of my study groups. The quality of responses is consistently high.",
      rating: 5
    },
    {
      name: "Professor Williams",
      role: "Constitutional Law Professor",
      content: "I recommend LawQA to all my students. It's a fantastic platform for collaborative learning and knowledge sharing.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Students" },
    { number: "25K+", label: "Questions Answered" },
    { number: "500+", label: "Legal Topics" },
    { number: "95%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Legal Platform Hero" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 hero-gradient opacity-95"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Ask. Learn. Argue.
              <br />
              <span className="accent-gradient bg-clip-text text-transparent">The Law Starts Here.</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto animate-slide-up">
              Join the premier Q&A platform for law students. Get answers to complex legal questions, 
              share your knowledge, and connect with future legal minds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/signup">
                <Button variant="accent" size="xl" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="xl" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Explore Questions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose LawQA?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed specifically for the legal community with features that matter to law students and professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="question-card hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Students Say</h2>
            <p className="text-lg text-muted-foreground">
              Hear from law students who've found success with LawQA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="question-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join the Community?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Start asking questions, sharing knowledge, and building your legal network today.
          </p>
          <Link to="/signup">
            <Button variant="accent" size="xl">
              Sign Up Now - It's Free! <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;