import { useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Download, Play, Image, FileText, Mail, ExternalLink, Phone } from "lucide-react";
import { DiscordIcon } from "./ui/DiscordIcon";
import { XIcon } from "./ui/XIcon";
import { YouTubeIcon } from "./ui/YouTubeIcon";
import { InstagramIcon } from "./ui/InstagramIcon";
import { LinkedInIcon } from "./ui/LinkedInIcon";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const MediaKit = () => {
  const [isZipping, setIsZipping] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const handleTrailerClick = () => {
    document.getElementById("trailer")?.scrollIntoView({ behavior: "smooth" });
  };

  const screenshots = [
    {
      title: "DeepSee Screenshot",
      url: "/screenshots/DeepSeeScreenshot06.png",
      description: ""
    },
    {
      title: "DeepSee Screenshot",
      url: "/screenshots/DeepSeeScreenshot19.png",
      description: ""
    },
    {
      title: "DeepSee Screenshot",
      url: "/screenshots/DeepSeeScreenshot28.png",
      description: ""
    },
    {
      title: "DeepSee Screenshot",
      url: "/screenshots/DeepSeeScreenshot32.png",
      description: ""
    },
    {
      title: "DeepSee Screenshot",
      url: "/screenshots/DeepSeeScreenshot38.png",
      description: ""
    },
    {
      title: "DeepSee Screenshot",
      url: "/screenshots/DeepSeeScreenshot42.png",
      description: ""
    },
    {
      title: "DeepSee Screenshot",
      url: "/screenshots/DeepSeeScreenshot43.png",
      description: ""
    },
    {
      title: "DeepSee Screenshot",
      url: "/screenshots/DeepSeeScreenshot44.png",
      description: ""
    }
  ];

  const videos = [
    {
      title: "Hand-Movement Based Locomotion",
      thumbnail: "/locomotion_thumb.png",
      url: "/Hand-Movement Based Locomotion.mp4",
      duration: "0:09"
    },
    {
      title: "Survive the Abyss",
      thumbnail: "/abyss_thumb.png",
      url: "/Survive the Abyss.mp4",
      duration: "0:09"
    },
    {
      title: "World Exploration",
      thumbnail: "/world_thumb.png",
      url: "/World Exploration.mp4",
      duration: "0:06"
    },
    {
        title: "Puzzle Gameplay",
        thumbnail: "/puzzle_thumb.png",
        url: "/puzzle4.mp4",
        duration: "0:11"
    },
    {
      title: "Shark Attack Mechanic",
      thumbnail: "/shark_thumb.png",
      url: "/SharkThatEats.mp4",
      duration: "1:19"
    }
  ];

  const assets = [
    {
      name: "Press Kit (ZIP)",
      type: "zip",
      size: "166 MB",
      icon: FileText
    },
    {
      name: "Game Logo (PNG)",
      type: "png",
      size: "0.25 MB",
      icon: Image
    }
  ];

  const handleDownload = async (assetName: string) => {
    if (assetName === "Game Logo (PNG)") {
      saveAs("/logo.png", "DeepSee_Logo.png");
      return;
    }

    if (assetName === "Press Kit (ZIP)") {
      setIsZipping(true);
      try {
        const zip = new JSZip();

        const addFileToZip = async (path: string, folder: JSZip | null, customName?: string) => {
          try {
            const response = await fetch(path);
            if (!response.ok) {
              console.warn(`Failed to fetch ${path}: ${response.statusText}`);
              return;
            }
            const blob = await response.blob();
            const name = customName || path.split("/").pop() || "file";
            if (folder) {
              folder.file(name, blob);
            } else {
              zip.file(name, blob);
            }
          } catch (e) {
            console.warn(`Could not add ${path} to zip.`, e);
          }
        };

        const downloadPromises = [];

        downloadPromises.push(addFileToZip("/logo.png", null, "DeepSee_Logo.png"));
        downloadPromises.push(addFileToZip("/Indieverse_logo.png", null, "Indieverse_Studio_Logo.png"));

        const videosFolder = zip.folder("videos");
        videos.forEach(video => {
          downloadPromises.push(addFileToZip(video.url, videosFolder));
        });

        const screenshotsFolder = zip.folder("screenshots");
        screenshots.forEach(screenshot => {
          downloadPromises.push(addFileToZip(screenshot.url, screenshotsFolder));
        });

        await Promise.all(downloadPromises);

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "DeepSee_PressKit.zip");
      } catch (error) {
        console.error("Error creating press kit zip:", error);
      } finally {
        setIsZipping(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-ocean">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-gradient-glow opacity-20 animate-shimmer"></div>
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="animate-float">
            <img 
              src="/logo.png" 
              alt="Deep See Logo" 
              className="h-96 md:h-[32rem] lg:h-[40rem] mx-auto"
            />
            <div className="relative -mt-24 md:-mt-32">
              <p className="text-2xl md:text-3xl mb-2 text-foreground font-light">
                DIVE DEEP. UNCOVER THE TRUTH.
              </p>
              <div className="flex justify-center items-center gap-4 text-lg text-muted-foreground mb-8">
                <span>BY</span>
                <img src="/Indieverse_logo.png" alt="Indieverse Studio Logo" className="h-[4.5rem]"/>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow animate-glow-pulse"
              onClick={handleTrailerClick}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Trailer
            </Button>
            <a href="https://discord.gg/qYREPSA8hZ" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <DiscordIcon className="mr-2 h-5 w-5" />
                Join Discord
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Watch Trailer Section */}
      <section id="trailer" className="py-16 px-6 bg-gradient-depth">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Demo Trailer</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full rounded-lg shadow-glow"
              src="https://www.youtube.com/embed/Q0rFxjBg5po"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Game Information */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-10 animate-shimmer"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-white">
              Game Overview
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* About Section */}
            <div className="group">
              <Card className="h-full bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-md border-border/50 shadow-elegant hover:shadow-glow transition-all duration-500 group-hover:scale-[1.02] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-4 shadow-glow">
                      <span className="text-2xl">🌊</span>
                    </div>
                    <h3 className="text-3xl font-bold text-card-foreground">About DeepSee VR</h3>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                  Step into the fins of a marine biologist sent to investigate a strange anomaly on the ocean floor. As you descend deeper, you’ll uncover abandoned facilities, rogue machines, and a chilling secret buried in the abyss. Swim through hauntingly beautiful environments, solve puzzles, and dodge killer machines - all using just your hands.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background/30 rounded-lg p-4 backdrop-blur-sm border border-border/30">
                      <div className="text-sm text-muted-foreground mb-1">Platform</div>
                      <div className="font-semibold text-foreground">Meta Quest</div>
                    </div>
                    <div className="bg-background/30 rounded-lg p-4 backdrop-blur-sm border border-border/30">
                      <div className="text-sm text-muted-foreground mb-1">Genre</div>
                      <div className="font-semibold text-foreground">Mystery, Exploration</div>
                    </div>
                    <div className="bg-background/30 rounded-lg p-4 backdrop-blur-sm border border-border/30">
                      <div className="text-sm text-muted-foreground mb-1">Release Date</div>
                      <div className="font-semibold text-foreground">Q3 2025</div>
                    </div>
                    <div className="bg-background/30 rounded-lg p-4 backdrop-blur-sm border border-border/30">
                      <div className="text-sm text-muted-foreground mb-1">Developer</div>
                      <div className="font-semibold text-foreground">Indieverse Studio</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Features Section */}
            <div className="group">
              <Card className="h-full bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-md border-border/50 shadow-elegant hover:shadow-glow transition-all duration-500 group-hover:scale-[1.02] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-4 shadow-glow">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-3xl font-bold text-card-foreground">Key Features</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { icon: "🏊", text: "Hand-tracked swimming for intuitive, full-body underwater movement" },
                      { icon: "🧩", text: "Environmental puzzles that challenge logic and spatial skills" },
                      { icon: "🌍", text: "Diverse biomes including caves, ruins, and research labs" },
                      { icon: "🔎", text: "Narrative discovery through scanning, clues, and exploration" },
                      { icon: "⚠️", text: "Stealth survival against rogue machines and sea creatures" },
                      { icon: "🌊", text: "Immersive world with dynamic currents and ambient sea life" }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center group/item hover:transform hover:translate-x-2 transition-transform duration-300">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mr-4 shadow-glow flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                          <span className="text-lg">{feature.icon}</span>
                        </div>
                        <span className="text-muted-foreground leading-relaxed group-hover/item:text-foreground transition-colors duration-300">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* Videos Section */}
      <section className="py-16 px-6 bg-gradient-depth">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Gameplay Videos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card
                    className="group overflow-hidden cursor-pointer bg-card/80 backdrop-blur-sm border-border shadow-soft hover:shadow-glow transition-all duration-300"
                    onMouseEnter={() => videoRefs.current[index]?.play().catch(() => {})}
                    onMouseLeave={() => {
                      if (videoRefs.current[index]) {
                        videoRefs.current[index]!.pause();
                        videoRefs.current[index]!.currentTime = 0;
                        videoRefs.current[index]!.load();
                      }
                    }}
                  >
                    <div className="relative">
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={video.url}
                        poster={video.thumbnail}
                        muted
                        loop
                        playsInline
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                        <Button size="icon" className="bg-primary hover:bg-primary-glow shadow-glow">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-xs rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-card-foreground">{video.title}</h3>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full bg-card border-border p-0">
                  <video src={video.url} controls autoPlay className="w-full h-auto max-h-[90vh] rounded-lg" />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

{/* Screenshots Section */}
<section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-5 animate-shimmer"></div>
        <div className="container mx-auto max-w-full relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Screenshots
          </h2>
          
          <div className="relative px-16">
            <Carousel className="w-full" opts={{ align: "center", loop: true }} plugins={[autoplay.current]}>
              <CarouselContent className="-ml-2 md:-ml-4">
                {screenshots.map((screenshot, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-3/5">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="group relative overflow-hidden rounded-2xl cursor-pointer bg-card/80 backdrop-blur-sm border-border shadow-soft hover:shadow-glow transition-all duration-500 hover:scale-[1.02]">
                          <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10"></div>
                          <img 
                            src={screenshot.url} 
                            alt={screenshot.title}
                            className="w-full h-[60vh] object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl w-full bg-card border-border">
                        <img 
                          src={screenshot.url} 
                          alt={screenshot.title}
                          className="w-full h-auto rounded-lg"
                        />
                      </DialogContent>
                    </Dialog>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-card/80 border-border hover:bg-card text-card-foreground shadow-elegant" />
              <CarouselNext className="right-4 bg-card/80 border-border hover:bg-card text-card-foreground shadow-elegant" />
            </Carousel>
          </div>
        </div>
      </section>
      {/* Assets Download Section */}
      <section className="py-16 px-6 bg-gradient-depth">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Download Assets</h2>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 md:grid-cols-2">
            {assets.map((asset, index) => {
              const IconComponent = asset.icon;
              return (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border-border shadow-soft hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <IconComponent className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2 text-card-foreground">{asset.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{asset.size}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => handleDownload(asset.name)}
                      disabled={asset.name === "Press Kit (ZIP)" && isZipping}
                    >
                      {asset.name === "Press Kit (ZIP)" && isZipping ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Zipping...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Contact Us</h2>
          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-soft">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center md:justify-start">
                  <img src="/Indieverse_logo.png" alt="Indieverse Studio Logo" className="h-48" />
                </div>
                <div className="space-y-6">
                  <div className="space-y-3 text-left">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-primary mr-3" />
                      <span className="text-muted-foreground">prakhar@indieverse.studio</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-primary mr-3" />
                      <span className="text-muted-foreground">+91-7275178638</span>
                    </div>
                    <div className="flex items-center">
                      <ExternalLink className="h-5 w-5 text-primary mr-3" />
                      <a href="https://www.indieverse.studio" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        www.indieverse.studio
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-center md:justify-start">
                    <a href="https://x.com/IndieverseDev" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        <XIcon className="h-5 w-5" />
                      </Button>
                    </a>
                    <a href="https://www.youtube.com/@indieverseLabs" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        <YouTubeIcon className="h-5 w-5" />
                      </Button>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                          <InstagramIcon className="h-5 w-5" />
                        </Button>
                    </a>
                    <a href="https://discord.gg/qYREPSA8hZ" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        <DiscordIcon className="h-5 w-5" />
                      </Button>
                    </a>
                    <a href="https://www.linkedin.com/company/82595320" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                          <LinkedInIcon className="h-5 w-5" />
                        </Button>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default MediaKit;