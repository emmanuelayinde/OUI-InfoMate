import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  MessageSquare, 
  BookOpenCheck, 
  Users, 
  GraduationCap, 
  ChevronRight,
  Sparkles,
  Clock,
  Target
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-foreground">StudyMate AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="accent">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Academic Assistant
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground">
                Your Final Year
                <span className="text-accent block">Study Companion</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                Get instant help with research, assignments, and thesis work. 
                StudyMate AI understands your academic challenges and provides 
                personalized guidance to help you succeed.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button variant="hero" size="lg" className="group">
                    Start Learning Now
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-accent rounded-3xl opacity-20 blur-3xl"></div>
              <img 
                src={heroImage} 
                alt="Students collaborating with AI assistance" 
                className="relative rounded-3xl shadow-large w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Designed for Final Year Students
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to excel in your final year, from research to thesis defense.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-medium hover:shadow-large transition-shadow">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto">
                  <BookOpenCheck className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Research Assistance</h3>
                <p className="text-muted-foreground">
                  Get help finding relevant sources, understanding complex topics, 
                  and structuring your research methodology.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-medium hover:shadow-large transition-shadow">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Thesis Support</h3>
                <p className="text-muted-foreground">
                  From proposal to defense, get guidance on structuring, 
                  writing, and refining your thesis work.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-medium hover:shadow-large transition-shadow">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">24/7 Availability</h3>
                <p className="text-muted-foreground">
                  Study on your schedule. Get instant responses to your 
                  questions anytime, day or night.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Ready to Ace Your Final Year?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of students who are already using StudyMate AI 
              to achieve their academic goals.
            </p>
            <Link to="/signup">
              <Button variant="hero" size="lg" className="group">
                Get Started for Free
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-accent" />
              <span className="font-semibold text-foreground">StudyMate AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 StudyMate AI. Empowering students to succeed.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;