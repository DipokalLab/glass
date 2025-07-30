import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/features/navbar";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1  pt-15">
        <section className="w-full h-full flex items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Explore 3D Typo Effects
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Quickly bring all 3D typography effects to life on the web.
                  Every effect is ready for you. Experience it now on the web.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" asChild>
                  <Link to="/list">Get Started</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    window.open("https://github.com/DipokalLab/glass")
                  }
                >
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
