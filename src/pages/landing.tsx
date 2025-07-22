import {
  BookOpenCheck,
  ChevronRight,
  Clock,
  GraduationCap,
  Settings,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

import heroImage from "@/assets/hero-image.jpg";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store";

const LandingPage = () => {
  const { isAuthenticated, userType } = useAuthStore();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-accent" />
            <span className="text-lg md:text-xl font-bold text-foreground">
              OUI Assistant
            </span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/chat">
                  <Button variant="ghost" size="sm" className="text-sm">
                    Chat
                  </Button>
                </Link>
                {userType === "admin" && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="text-sm">
                      <Settings className="h-4 w-4 mr-1" />
                      Admin
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-accent">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                AI-Powered School Information Assistant
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-foreground">
                Your OUI
                <span className="text-accent block">Info Companion</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Get instant answers about school policies, procedures,
                facilities, and services. OUI Assistant AI is designed
                specifically for Oduduwa University Ipetumodu students to help
                you navigate university life with ease.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Start Chatting Now
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-accent rounded-2xl md:rounded-3xl opacity-20 blur-2xl md:blur-3xl"></div>
              <img
                src={heroImage}
                alt="Students getting school information assistance"
                className="relative rounded-2xl md:rounded-3xl shadow-large w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Everything About OUI at Your Fingertips
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant information about university policies, facilities,
              services, and procedures at Oduduwa University Ipetumodu.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-0 shadow-medium hover:shadow-large transition-shadow">
              <CardContent className="p-6 md:p-8 text-center space-y-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto">
                  <BookOpenCheck className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground">
                  University Policies
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Get quick answers about admission requirements, academic
                  policies, student conduct guidelines, and university
                  regulations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-medium hover:shadow-large transition-shadow">
              <CardContent className="p-6 md:p-8 text-center space-y-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto">
                  <Target className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground">
                  Facilities & Services
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Learn about library services, hostel information, medical
                  facilities, sports centers, and other campus amenities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-medium hover:shadow-large transition-shadow md:col-span-2 lg:col-span-1">
              <CardContent className="p-6 md:p-8 text-center space-y-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground">
                  24/7 Information Access
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Get answers about registration processes, fee payments,
                  academic calendar, and administrative procedures anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Ready to Navigate OUI with Confidence?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Join your fellow OUI students who are already using InfoMate AI to
              get quick answers about university information and services.
            </p>
            <Link to="/login">
              <Button size="lg" className="group">
                Get Started for Free
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-accent" />
              <span className="text-sm md:text-base font-semibold text-foreground">
                OUI Assistant
              </span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground text-center md:text-right">
              © 2025 OUI Assistant AI. Your guide to OUI information and
              services.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
