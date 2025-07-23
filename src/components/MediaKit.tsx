import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
      url: "/screenshots/DeepSeeScreenshot28 copy.png",
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
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Game Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/80 backdrop-blur-sm border-border shadow-soft">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">About Deep See</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Embark on an extraordinary underwater VR adventure that takes you to the deepest, most mysterious parts of our oceans. Using cutting-edge virtual reality technology, explore sunken civilizations, encounter magnificent sea creatures, and uncover secrets that have been hidden beneath the waves for millennia.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform:</span>
                    <span className="text-foreground">VR (Oculus, Steam VR)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Genre:</span>
                    <span className="text-foreground">Adventure, Exploration</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Release Date:</span>
                    <span className="text-foreground">Q2 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Developer:</span>
                    <span className="text-foreground">Indieverse Studio</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border shadow-soft">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">Key Features</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Immersive VR underwater exploration with realistic physics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Discover ancient civilizations and lost artifacts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Encounter diverse marine life in their natural habitat</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Multiple submarine vessels with unique capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Dynamic weather and ocean current systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Story-driven narrative with multiple endings</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16 px-6 bg-gradient-depth">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Videos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="group overflow-hidden cursor-pointer bg-card/80 backdrop-blur-sm border-border shadow-soft hover:shadow-glow transition-all duration-300">
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Screenshots</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {screenshots.map((screenshot, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="group overflow-hidden cursor-pointer bg-card/80 backdrop-blur-sm border-border shadow-soft hover:shadow-glow transition-all duration-300">
                    <div className="aspect-w-16 aspect-h-9">
                      <img 
                        src={screenshot.url} 
                        alt={screenshot.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full bg-card border-border p-0">
                  <img 
                    src={screenshot.url} 
                    alt={screenshot.title}
                    className="w-full h-auto rounded-lg"
                  />
                </DialogContent>
              </Dialog>
            ))}
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