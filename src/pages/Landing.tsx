
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GraduationCap, MessageCircle, Search, Users, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
              <span className="text-lg sm:text-xl font-bold text-foreground">OUI InfoMate</span>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              <Link to="/login">
                <Button variant="outline" size="sm" className="text-sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="text-sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-4 sm:mb-6">
              Your AI-Powered
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                School Information Assistant
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Get instant answers about OUI policies, procedures, academics, and campus life. 
              InfoMate is here to help you navigate your university experience with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base">
                  Start Chatting
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm sm:text-base">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              Everything You Need to Know About OUI
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Access comprehensive information about your university experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="border-0 shadow-soft">
              <CardHeader className="text-center pb-3 sm:pb-4">
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <MessageCircle className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Instant Answers</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-sm sm:text-base">
                  Get immediate responses to your questions about courses, policies, and campus resources
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardHeader className="text-center pb-3 sm:pb-4">
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Comprehensive Search</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-sm sm:text-base">
                  Search through academic programs, student services, and university procedures
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft md:col-span-2 lg:col-span-1">
              <CardHeader className="text-center pb-3 sm:pb-4">
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Student Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-sm sm:text-base">
                  Access guidance on admissions, financial aid, academic support, and campus life
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
              Join thousands of students who use InfoMate to navigate their university experience
            </p>
            <Link to="/signup">
              <Button size="lg" className="text-sm sm:text-base">
                Create Your Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              <span className="text-sm sm:text-base font-semibold text-foreground">OUI InfoMate</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-right">
              © 2024 OUI InfoMate. Your AI-powered university assistant.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
