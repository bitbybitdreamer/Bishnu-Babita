import React, { useState, useEffect, useRef } from "react";
import { 
  Heart, 
  Sparkles, 
  Mail, 
  MailOpen, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Calendar, 
  Camera, 
  Video, 
  Film, 
  Flame, 
  Star, 
  User, 
  Lock, 
  CheckCircle, 
  Maximize2, 
  Compass, 
  Bookmark, 
  ArrowRight,
  HeartHandshake,
  RotateCcw,
  HelpCircle,
  Trophy,
  Gamepad2,
  Upload,
  Trash2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  SlidersHorizontal,
  Infinity,
  Sun,
  Moon,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { getAllMedia, saveMedia, deleteMedia, getMedia } from "./db";

// Continuous marquee nicknames
const bishnuNames = [
  "Baby", "Pasandida Aurat", "Baby Girl", "Princess November", "gudiya 🎀", "wifey", "mrs junior"
];

const babitaNames = [
  "pasandida mard", "baby", "hubby", "sweetheart", "mr Bishnu", "darling", "husband"
];

const loveMatrix = [
  { lang: "Hindi", text: "बबिता, मैं तुमसे प्यार करता हूँ", sub: "Main tumse pyar karta hoon" },
  { lang: "Odia", text: "ବବିତା, ମୁଁ ତୁମକୁ ଭଲପାଏ", sub: "Mui tumaku bhala pae" },
  { lang: "Spanish", text: "Te amo, Babita", sub: "Spanish / Elegant & Passionate" },
  { lang: "French", text: "Je t'aime, Babita", sub: "French / The Language of Love" },
  { lang: "Italian", text: "Ti amo, Babita", sub: "Italian / Warm & Musical" },
  { lang: "Japanese", text: "バビタ、愛してるよ", sub: "Babita, aishiteru yo" },
  { lang: "Korean", text: "바비타, 사랑해", sub: "Babita, saranghae" },
  { lang: "German", text: "Ich liebe dich, Babita", sub: "German / Strong & True" },
  { lang: "Arabic", text: "عزيزتي بابيتا، أنا أحبك", sub: "Arabic / Deeply Poetic" },
  { lang: "Russian", text: "Я люблю тебя, Бабита", sub: "Russian / Tender Devotion" }
];

// Beautiful real photography of Babita for her Dedicated Photo Grid
const masonryImages = [
  {
    url: "https://img.sanishtech.com/u/cbafec3b9ec2c5eda45038a5ea54e175.jpeg",
    caption: "Her eyes filled with elegant, soft elegance on our beautiful milestone.",
    aspect: "aspect-[3/4]"
  },
  {
    url: "https://img.sanishtech.com/u/cfe70bef568f9da98d89c86bbe23cf23.jpeg",
    caption: "A quiet, lovely sideways look that melts my heart instantly.",
    aspect: "aspect-square"
  },
  {
    url: "https://img.sanishtech.com/u/77a494187b389b9a7ccb1bb95c913a12.jpeg",
    caption: "The radiant warmth of her raw, heartfelt smile. Pure joy! ✨",
    aspect: "aspect-[3/4]"
  },
  {
    url: "https://img.sanishtech.com/u/63c57c7fcc15c4d483f65ea1455e7b09.jpeg",
    caption: "Grace personified in lovely crimson and dark traditional folds.",
    aspect: "aspect-square"
  },
  {
    url: "https://img.sanishtech.com/u/c1f0cc0674a45ed82c5e554d1146ece9.jpeg",
    caption: "Those sweet eyes holding a thousand unspoken, loving promises.",
    aspect: "aspect-[3/4]"
  },
  {
    url: "https://img.sanishtech.com/u/f066a156098251a8cbc8ce8c1309f5bd.jpeg",
    caption: "Basking in the golden evening light, absolute elegance.",
    aspect: "aspect-[4/5]"
  },
  {
    url: "https://img.sanishtech.com/u/da966539e87bcb87674a0e39b85ceb47.jpeg",
    caption: "Pristine poise in lovely soft lighting—a timeless masterpiece.",
    aspect: "aspect-[3/4]"
  },
  {
    url: "https://img.sanishtech.com/u/f43eba3618da462d933b447f87398539.jpeg",
    caption: "A magical traditional look showing her angelic elegance.",
    aspect: "aspect-square"
  },
  {
    url: "https://img.sanishtech.com/u/03e26f2055395d965f376b08e07c34d5.jpeg",
    caption: "Her deep, loving eyes sparkling with infinite pure devotion.",
    aspect: "aspect-[3/4]"
  },
  {
    url: "https://img.sanishtech.com/u/f27da6b00b245127b0c9b720dab9572e.jpeg",
    caption: "Every sweet curve of her smile holds my entire universe.",
    aspect: "aspect-square"
  },
  {
    url: "https://img.sanishtech.com/u/94634611bab4e0e7e967706731341448.jpeg",
    caption: "A beautiful candid moment captured in absolute blissful joy.",
    aspect: "aspect-[3/4]"
  },
  {
    url: "https://img.sanishtech.com/u/868915110dbe6f82e0d4c691f4132b9c.jpeg",
    caption: "Enchanting traditional vibe that is so mesmerizingly pure.",
    aspect: "aspect-square"
  },
  {
    url: "https://img.sanishtech.com/u/329105cb0e05b4f431d58385e3d71627.jpeg",
    caption: "Pure joy, endless laughter, and beautiful lifelong milestones.",
    aspect: "aspect-[4/5]"
  },
  {
    url: "https://img.sanishtech.com/u/293514ff5879544d4bee4844311f270f.jpeg",
    caption: "Dazzling beauty framed in absolute cultural elegance.",
    aspect: "aspect-square"
  }
];

const polaroidSnapshots = [
  {
    url: "https://img.sanishtech.com/u/c1d36d57c182f0ccc9f079a5585cb296.jpeg",
    caption: "Her Beautiful Gaze ✨",
    angle: "-rotate-2"
  },
  {
    url: "https://img.sanishtech.com/u/7806bd41b38f7dd66cab008098720c85.jpeg",
    caption: "Basking in Gold ☀️",
    angle: "rotate-3"
  },
  {
    url: "https://img.sanishtech.com/u/68e1be8ca2bb07c3e28341a464cc4cb2.jpeg",
    caption: "Pure Elegance 👑",
    angle: "-rotate-1"
  },
  {
    url: "https://img.sanishtech.com/u/51c6743a4980e4c6d557a25dcc9c673b.jpeg",
    caption: "Sweetest Charm 🎀",
    angle: "rotate-2"
  },
  {
    url: "https://img.sanishtech.com/u/834488daba4767f95d83ae85345e83c3.jpeg",
    caption: "Perfect Silhouette 🌸",
    angle: "-rotate-3"
  },
  {
    url: "https://img.sanishtech.com/u/b65e8318e02c6284d7a851006f8db12a.jpeg",
    caption: "Infinite Sparks ❤️",
    angle: "rotate-2"
  },
  {
    url: "https://img.sanishtech.com/u/329105cb0e05b4f431d58385e3d71627.jpeg",
    caption: "Endless Laughter 🧸",
    angle: "-rotate-2"
  },
  {
    url: "https://img.sanishtech.com/u/cbafec3b9ec2c5eda45038a5ea54e175.jpeg",
    caption: "Traditional Splendor 💎",
    angle: "rotate-2"
  },
  {
    url: "https://img.sanishtech.com/u/77a494187b389b9a7ccb1bb95c913a12.jpeg",
    caption: "Purest Happiness ✨",
    angle: "-rotate-3"
  },
  {
    url: "https://img.sanishtech.com/u/f066a156098251a8cbc8ce8c1309f5bd.jpeg",
    caption: "Golden Sunset Hour 🌅",
    angle: "rotate-1"
  }
];

const cinematicReels = [
  {
    poster: "https://img.sanishtech.com/u/da966539e87bcb87674a0e39b85ceb47.jpeg",
    videoUrl: "https://videotourl.com/videos/1779787061615-3abf92c7-fd64-4242-ba43-16f9954e504a.mp4",
    title: "Mesmerized by her traditional charm 🌸",
    views: "520K plays",
    hearts: "131.4K",
    duration: "0:15"
  },
  {
    poster: "https://img.sanishtech.com/u/03e26f2055395d965f376b08e07c34d5.jpeg",
    videoUrl: "https://videotourl.com/videos/1779787086606-b27666f2-0be0-46f2-b6a9-a51f4eee2e5d.mp4",
    title: "Sweet sunset laughters and infinite sparks ✨",
    views: "880K plays",
    hearts: "520.1K",
    duration: "0:11"
  },
  {
    poster: "https://img.sanishtech.com/u/f27da6b00b245127b0c9b720dab9572e.jpeg",
    videoUrl: "https://videotourl.com/videos/1779787109121-ba5bc4ca-ac9f-4e81-9981-01adfb9fb778.mp4",
    title: "A glimpse of absolute celestial perfection 🎵",
    views: "960K plays",
    hearts: "650.3K",
    duration: "0:24"
  },
  {
    poster: "https://img.sanishtech.com/u/f43eba3618da462d933b447f87398539.jpeg",
    videoUrl: "https://videotourl.com/videos/1779787134185-5882f574-70be-4917-aca7-70b2dd64fcb0.mp4",
    title: "Our beautiful golden hour walk together ❤️",
    views: "340K plays",
    hearts: "189.5K",
    duration: "0:18"
  },
  {
    poster: "https://img.sanishtech.com/u/7806bd41b38f7dd66cab008098720c85.jpeg",
    videoUrl: "https://videotourl.com/videos/1779787155179-8a2af384-5039-4c58-9dba-0fce9f1afbed.mp4",
    title: "Sweetest shy gaze that brightens my entire universe 🎀",
    views: "720K plays",
    hearts: "412.3K",
    duration: "0:13"
  },
  {
    poster: "https://img.sanishtech.com/u/94634611bab4e0e7e967706731341448.jpeg",
    videoUrl: "https://videotourl.com/videos/1779787195584-99ccd80a-1c42-4df6-9b68-6726b5d3df5d.mp4",
    title: "Your lovely raw smile captured under the sky ☁️",
    views: "480K plays",
    hearts: "211.8K",
    duration: "0:20"
  },
  {
    poster: "https://img.sanishtech.com/u/68e1be8ca2bb07c3e28341a464cc4cb2.jpeg",
    videoUrl: "https://videotourl.com/videos/1779787206779-66ceb03e-47ee-48ee-860f-2bca955bfc90.mp4",
    title: "A perfect magical love loop of our happiness 🧸",
    views: "640K plays",
    hearts: "388.9K",
    duration: "0:09"
  },
  {
    poster: "https://img.sanishtech.com/u/868915110dbe6f82e0d4c691f4132b9c.jpeg",
    videoUrl: "https://videotourl.com/videos/1779787220479-7a63fa63-88ef-47a3-9415-2260146aaaf7.mp4",
    title: "Pure cinematic grace and high-fashion splendour 👑",
    views: "890K plays",
    hearts: "512.4K",
    duration: "0:16"
  },
  {
    poster: "https://img.sanishtech.com/u/51c6743a4980e4c6d557a25dcc9c673b.jpeg",
    videoUrl: "https://videotourl.com/videos/1779787236007-e6ec5fce-32bf-4148-b9c2-b5207e204726.mp4",
    title: "Cozy weekend morning strolls holding your hand 🌸",
    views: "410K plays",
    hearts: "154.2K",
    duration: "0:14"
  },
  {
    poster: "https://img.sanishtech.com/u/834488daba4767f95d83ae85345e83c3.jpeg",
    videoUrl: "https://videotourl.com/videos/1779787249839-89228327-5d30-434e-ab1d-1c000679c1c2.mp4",
    title: "Sharing endless laughter, joy, and forever love 💖",
    views: "930K plays",
    hearts: "629.7K",
    duration: "0:15"
  },
  {
    poster: "https://img.sanishtech.com/u/840c9c0542d2eff64de4063aa0aae1b9.jpeg",
    videoUrl: "https://videotourl.com/videos/1779787270106-7d2878f5-444e-4586-8aa2-e9439cea03d9.mp4",
    title: "Enchanting traditional vibe that is so mesmerizingly pure ✨",
    views: "580K plays",
    hearts: "245.6K",
    duration: "0:12"
  },
  {
    poster: "https://img.sanishtech.com/u/b65e8318e02c6284d7a851006f8db12a.jpeg",
    videoUrl: "https://videotourl.com/videos/1779787281107-4d70e7b2-d310-4dd0-a377-6b2ea35ca8f9.mp4",
    title: "Dancing in the breeze with celestial elegance 💃",
    views: "710K plays",
    hearts: "472.9K",
    duration: "0:22"
  },
  {
    poster: "https://img.sanishtech.com/u/329105cb0e05b4f431d58385e3d71627.jpeg",
    videoUrl: "https://videotourl.com/videos/1779787301079-d48d3a57-30c3-4ec6-bba9-f5813e7e3373.mp4",
    title: "The sparkle of complete devotion in those beautiful eyes 💎",
    views: "830K plays",
    hearts: "599.1K",
    duration: "0:17"
  },
  {
    poster: "https://img.sanishtech.com/u/293514ff5879544d4bee4844311f270f.jpeg",
    videoUrl: "https://videotourl.com/videos/1779787314978-171308e4-604f-4c86-b4d4-749eb2bbf5ed.mp4",
    title: "Our sweet milestone celebration and lovely moments 🎉",
    views: "500K plays",
    hearts: "310.2K",
    duration: "0:19"
  },
  {
    poster: "https://img.sanishtech.com/u/cbafec3b9ec2c5eda45038a5ea54e175.jpeg",
    videoUrl: "https://videotourl.com/videos/1779787330813-8317b8cf-2bc5-446d-a9e6-618ce7924272.mp4",
    title: "Soft raw laughters that make everything simple and beautiful 🎀",
    views: "670K plays",
    hearts: "420.5K",
    duration: "0:13"
  },
  {
    poster: "https://img.sanishtech.com/u/cfe70bef568f9da98d89c86bbe23cf23.jpeg",
    videoUrl: "https://videotourl.com/videos/1779787346537-3c695046-67f0-4422-a0fc-d17e5e51638e.mp4",
    title: "Forever mesmerizing gaze bathed in quiet elegance ❤️",
    views: "1.1M plays",
    hearts: "820.4K",
    duration: "0:16"
  }
];

interface RibbonParticle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  label: string;
}

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  char: string;
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Media Hub Custom States & Persistence
  const [masonryList, setMasonryList] = useState(masonryImages);
  const [polaroidList, setPolaroidList] = useState(polaroidSnapshots);
  const [heroVideoSrc, setHeroVideoSrc] = useState("https://videotourl.com/videos/1779787061615-3abf92c7-fd64-4242-ba43-16f9954e504a.mp4");
  const [reelsList, setReelsList] = useState(cinematicReels);
  const [customReelVideos, setCustomReelVideos] = useState<(string | null)[]>(Array(16).fill(null));

  const [curatorOpen, setCuratorOpen] = useState(false);
  const [activeCuratorTab, setActiveCuratorTab] = useState("masonry");

  // Multilingual Photo Lightbox Viewer State
  const [activeLightbox, setActiveLightbox] = useState<{
    type: "masonry" | "polaroid";
    index: number;
  } | null>(null);

  // Custom Video Cinema Theater Lightbox State
  const [activeVideoLightboxUrl, setActiveVideoLightboxUrl] = useState<string | null>(null);

  // Keypress listener for Lightbox (arrows and escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeLightbox) return;
      if (e.key === "Escape") {
        setActiveLightbox(null);
      } else if (e.key === "ArrowLeft") {
        const list = activeLightbox.type === "masonry" ? masonryList : polaroidList;
        setActiveLightbox((prev) => {
          if (!prev) return null;
          const newIndex = prev.index === 0 ? list.length - 1 : prev.index - 1;
          return { ...prev, index: newIndex };
        });
      } else if (e.key === "ArrowRight") {
        const list = activeLightbox.type === "masonry" ? masonryList : polaroidList;
        setActiveLightbox((prev) => {
          if (!prev) return null;
          const newIndex = prev.index === list.length - 1 ? 0 : prev.index + 1;
          return { ...prev, index: newIndex };
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightbox, masonryList, polaroidList]);

  // Load custom user-uploaded media on mount
  useEffect(() => {
    async function loadCustomMedia() {
      try {
        const saved = await getAllMedia();
        if (saved && saved.length > 0) {
          const updatedMasonry = [...masonryImages];
          const updatedPolaroid = [...polaroidSnapshots];
          const updatedReels = [...cinematicReels];
          const updatedCustomVideos = Array(16).fill(null) as (string | null)[];
          let updatedHero = "https://videotourl.com/videos/1779787061615-3abf92c7-fd64-4242-ba43-16f9954e504a.mp4";

          saved.forEach((item) => {
            if (item.key.startsWith("masonry-")) {
              const idx = parseInt(item.key.split("-")[1]);
              if (idx >= 0 && idx < updatedMasonry.length) {
                updatedMasonry[idx] = {
                  ...updatedMasonry[idx],
                  url: item.dataUrl,
                  caption: item.caption || updatedMasonry[idx].caption
                };
              }
            } else if (item.key.startsWith("polaroid-")) {
              const idx = parseInt(item.key.split("-")[1]);
              if (idx >= 0 && idx < updatedPolaroid.length) {
                updatedPolaroid[idx] = {
                  ...updatedPolaroid[idx],
                  url: item.dataUrl,
                  caption: item.caption || updatedPolaroid[idx].caption
                };
              }
            } else if (item.key === "hero-video") {
              updatedHero = item.dataUrl;
            } else if (item.key.startsWith("reel-")) {
              const idx = parseInt(item.key.split("-")[1]);
              if (idx >= 0 && idx < updatedReels.length) {
                updatedReels[idx] = {
                  ...updatedReels[idx],
                  title: item.caption || updatedReels[idx].title,
                  poster: item.dataUrl
                };
                updatedCustomVideos[idx] = item.dataUrl;
              }
            }
          });

          setMasonryList(updatedMasonry);
          setPolaroidList(updatedPolaroid);
          setHeroVideoSrc(updatedHero);
          setReelsList(updatedReels);
          setCustomReelVideos(updatedCustomVideos);
        }
      } catch (err) {
        console.error("Failed to load custom user-uploaded media from IndexedDB", err);
      }
    }
    loadCustomMedia();
  }, []);

  // Handle uploaded photo/video
  const handleMediaUpload = async (key: string, file: File, caption?: string) => {
    if (!file) return;
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        if (!dataUrl) {
          reject(new Error("Failed to read file"));
          return;
        }
        try {
          await saveMedia({
            key,
            dataUrl,
            caption: caption || "",
            name: file.name,
            type: file.type
          });

          if (key.startsWith("masonry-")) {
            const idx = parseInt(key.split("-")[1]);
            setMasonryList((prev) => {
              const updated = [...prev];
              updated[idx] = {
                ...updated[idx],
                url: dataUrl,
                ...(caption ? { caption } : {})
              };
              return updated;
            });
          } else if (key.startsWith("polaroid-")) {
            const idx = parseInt(key.split("-")[1]);
            setPolaroidList((prev) => {
              const updated = [...prev];
              updated[idx] = {
                ...updated[idx],
                url: dataUrl,
                ...(caption ? { caption } : {})
              };
              return updated;
            });
          } else if (key === "hero-video") {
            setHeroVideoSrc(dataUrl);
            if (videoRef.current) {
              videoRef.current.load();
            }
          } else if (key.startsWith("reel-")) {
            const idx = parseInt(key.split("-")[1]);
            setReelsList((prev) => {
              const updated = [...prev];
              updated[idx] = {
                ...updated[idx],
                poster: dataUrl,
                ...(caption ? { title: caption } : {})
              };
              return updated;
            });
            setCustomReelVideos((prev) => {
              const updated = [...prev];
              updated[idx] = dataUrl;
              return updated;
            });
          }
          resolve();
        } catch (err) {
          console.error("Failed to save media in IndexedDB", err);
          reject(err);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  // Revert a customized slot to Unsplash/Vimeo default
  const handleMediaRevert = async (key: string) => {
    try {
      await deleteMedia(key);
      if (key.startsWith("masonry-")) {
        const idx = parseInt(key.split("-")[1]);
        setMasonryList((prev) => {
          const updated = [...prev];
          updated[idx] = masonryImages[idx];
          return updated;
        });
      } else if (key.startsWith("polaroid-")) {
        const idx = parseInt(key.split("-")[1]);
        setPolaroidList((prev) => {
          const updated = [...prev];
          updated[idx] = polaroidSnapshots[idx];
          return updated;
        });
      } else if (key === "hero-video") {
        setHeroVideoSrc("https://videotourl.com/videos/1779787061615-3abf92c7-fd64-4242-ba43-16f9954e504a.mp4");
        if (videoRef.current) {
          videoRef.current.load();
        }
      } else if (key.startsWith("reel-")) {
        const idx = parseInt(key.split("-")[1]);
        setReelsList((prev) => {
          const updated = [...prev];
          updated[idx] = cinematicReels[idx];
          return updated;
        });
        setCustomReelVideos((prev) => {
          const updated = [...prev];
          updated[idx] = null;
          return updated;
        });
      }
    } catch (err) {
      console.error("Failed to delete media from IndexedDB", err);
    }
  };

  // Counters State
  const [millisecondCounter, setMillisecondCounter] = useState<number>(0);
  const [humanTime, setHumanTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Dynamic animations
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const [ribbons, setRibbons] = useState<RibbonParticle[]>([]);

  // Video State
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  // Envelope state
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [letterRevealed, setLetterRevealed] = useState(false);

  // Track state for the Reels mockup popup/simulate playing
  const [selectedReel, setSelectedReel] = useState<number | null>(null);

  // Hibiscus Queen Spotlight interactive state hooks
  const [bloomValue, setBloomValue] = useState<number>(0.5); // blur value in px
  const [vignetteValue, setVignetteValue] = useState<number>(0.6); // vignette opacity
  const [grainValue, setGrainValue] = useState<number>(0.15); // grain opacity
  const [activePreset, setActivePreset] = useState<string>("dreamy"); // 'dreamy' | 'vintage' | 'vibrant' | 'pure'
  const [flowerHovered, setFlowerHovered] = useState<boolean>(false);
  const [hibiscusHearts, setHibiscusHearts] = useState<number>(127);
  const [showWaterSuccess, setShowWaterSuccess] = useState<boolean>(false);

  const applyPreset = (preset: string) => {
    setActivePreset(preset);
    if (preset === "pure") {
      setBloomValue(0);
      setVignetteValue(0);
      setGrainValue(0);
    } else if (preset === "dreamy") {
      setBloomValue(0.5);
      setVignetteValue(0.6);
      setGrainValue(0.15);
    } else if (preset === "vintage") {
      setBloomValue(1.2);
      setVignetteValue(0.85);
      setGrainValue(0.35);
    } else if (preset === "vibrant") {
      setBloomValue(0);
      setVignetteValue(0.4);
      setGrainValue(0.08);
    }
  };

  // Golden Marigold Spotlight interactive state hooks
  const [marigoldBloomValue, setMarigoldBloomValue] = useState<number>(0.6); // blur value in px
  const [marigoldVignetteValue, setMarigoldVignetteValue] = useState<number>(0.65); // vignette opacity
  const [marigoldGrainValue, setMarigoldGrainValue] = useState<number>(0.18); // grain opacity
  const [marigoldActivePreset, setMarigoldActivePreset] = useState<string>("dreamy"); // 'dreamy' | 'vintage' | 'vibrant' | 'pure'
  const [marigoldFlowerHovered, setMarigoldFlowerHovered] = useState<boolean>(false);
  const [marigoldHearts, setMarigoldHearts] = useState<number>(185);
  const [showMarigoldWaterSuccess, setShowMarigoldWaterSuccess] = useState<boolean>(false);
  const [marigoldAngleTilt, setMarigoldAngleTilt] = useState<number>(-8);

  const applyMarigoldPreset = (preset: string) => {
    setMarigoldActivePreset(preset);
    if (preset === "pure") {
      setMarigoldBloomValue(0);
      setMarigoldVignetteValue(0);
      setMarigoldGrainValue(0);
    } else if (preset === "dreamy") {
      setMarigoldBloomValue(0.6);
      setMarigoldVignetteValue(0.65);
      setMarigoldGrainValue(0.18);
    } else if (preset === "vintage") {
      setMarigoldBloomValue(1.4);
      setMarigoldVignetteValue(0.9);
      setMarigoldGrainValue(0.4);
    } else if (preset === "vibrant") {
      setMarigoldBloomValue(0);
      setMarigoldVignetteValue(0.45);
      setMarigoldGrainValue(0.1);
    }
  };

  // Retro Indigo VHS Spotlight interactive state hooks
  const [indigoBloomValue, setIndigoBloomValue] = useState<number>(0.8); // blur value in px
  const [indigoVignetteValue, setIndigoVignetteValue] = useState<number>(0.75); // vignette opacity
  const [indigoGrainValue, setIndigoGrainValue] = useState<number>(0.25); // grain opacity
  const [indigoScanlineValue, setIndigoScanlineValue] = useState<number>(0.15); // scanlines opacity
  const [indigoChromaShift, setIndigoChromaShift] = useState<number>(3); // shift px
  const [indigoActivePreset, setIndigoActivePreset] = useState<string>("dreamy"); // 'dreamy' | 'vhs_retro' | 'cyber' | 'pure'
  const [indigoFlowerHovered, setIndigoFlowerHovered] = useState<boolean>(false);
  const [indigoHearts, setIndigoHearts] = useState<number>(241);
  const [showIndigoWaterSuccess, setShowIndigoWaterSuccess] = useState<boolean>(false);
  const [indigoAngleTilt, setIndigoAngleTilt] = useState<number>(-4);

  const applyIndigoPreset = (preset: string) => {
    setIndigoActivePreset(preset);
    if (preset === "pure") {
      setIndigoBloomValue(0);
      setIndigoVignetteValue(0);
      setIndigoGrainValue(0);
      setIndigoScanlineValue(0);
      setIndigoChromaShift(0);
    } else if (preset === "dreamy") {
      setIndigoBloomValue(0.8);
      setIndigoVignetteValue(0.75);
      setIndigoGrainValue(0.25);
      setIndigoScanlineValue(0.15);
      setIndigoChromaShift(3);
    } else if (preset === "vhs_retro") {
      setIndigoBloomValue(1.5);
      setIndigoVignetteValue(0.85);
      setIndigoGrainValue(0.45);
      setIndigoScanlineValue(0.25);
      setIndigoChromaShift(5);
    } else if (preset === "cyber") {
      setIndigoBloomValue(0.4);
      setIndigoVignetteValue(0.6);
      setIndigoGrainValue(0.15);
      setIndigoScanlineValue(0.35);
      setIndigoChromaShift(6);
    }
  };

  // Violet Neon Infinity Spotlight interactive state hooks
  const [violetBloomValue, setVioletBloomValue] = useState<number>(0.6); // blur value in px
  const [violetVignetteValue, setVioletVignetteValue] = useState<number>(0.7); // vignette opacity
  const [violetGrainValue, setVioletGrainValue] = useState<number>(0.2); // grain opacity
  const [violetGlowValue, setVioletGlowValue] = useState<number>(0.65); // glow intensity
  const [violetActivePreset, setVioletActivePreset] = useState<string>("neon_dream"); // 'neon_dream' | 'intimate_glow' | 'vivid_pop' | 'pure'
  const [violetFlowerHovered, setVioletFlowerHovered] = useState<boolean>(false);
  const [violetHearts, setVioletHearts] = useState<number>(314);
  const [showVioletWaterSuccess, setShowVioletWaterSuccess] = useState<boolean>(false);
  const [violetAngleTilt, setVioletAngleTilt] = useState<number>(3);

  const applyVioletPreset = (preset: string) => {
    setVioletActivePreset(preset);
    if (preset === "pure") {
      setVioletBloomValue(0);
      setVioletVignetteValue(0);
      setVioletGrainValue(0);
      setVioletGlowValue(0);
    } else if (preset === "neon_dream") {
      setVioletBloomValue(0.6);
      setVioletVignetteValue(0.7);
      setVioletGrainValue(0.2);
      setVioletGlowValue(0.65);
    } else if (preset === "intimate_glow") {
      setVioletBloomValue(1.2);
      setVioletVignetteValue(0.85);
      setVioletGrainValue(0.35);
      setVioletGlowValue(0.9);
    } else if (preset === "vivid_pop") {
      setVioletBloomValue(0);
      setVioletVignetteValue(0.4);
      setVioletGrainValue(0.1);
      setVioletGlowValue(0.8);
    }
  };

  // Cyber Magenta Scribble Spotlight interactive state hooks
  const [magentaBloomValue, setMagentaBloomValue] = useState<number>(0.5); // blur value in px
  const [magentaVignetteValue, setMagentaVignetteValue] = useState<number>(0.65); // vignette opacity
  const [magentaGrainValue, setMagentaGrainValue] = useState<number>(0.22); // grain opacity
  const [magentaGlowValue, setMagentaGlowValue] = useState<number>(0.7); // glow intensity
  const [magentaScribbleOpacity, setMagentaScribbleOpacity] = useState<number>(0.9); // crayon overlay opacity
  const [magentaActivePreset, setMagentaActivePreset] = useState<string>("cyber_haze"); // 'cyber_haze' | 'raw_grunge' | 'soft_glow' | 'pure'
  const [magentaFlowerHovered, setMagentaFlowerHovered] = useState<boolean>(false);
  const [magentaHearts, setMagentaHearts] = useState<number>(520);
  const [showMagentaWaterSuccess, setShowMagentaWaterSuccess] = useState<boolean>(false);
  const [magentaAngleTilt, setMagentaAngleTilt] = useState<number>(5);
  const [magentaScribbleColor, setMagentaScribbleColor] = useState<string>("#FFFFFF"); // Support switching white, hot pink, or neon cyan crayon!

  const applyMagentaPreset = (preset: string) => {
    setMagentaActivePreset(preset);
    if (preset === "pure") {
      setMagentaBloomValue(0);
      setMagentaVignetteValue(0);
      setMagentaGrainValue(0);
      setMagentaGlowValue(0);
      setMagentaScribbleOpacity(0);
    } else if (preset === "cyber_haze") {
      setMagentaBloomValue(0.5);
      setMagentaVignetteValue(0.65);
      setMagentaGrainValue(0.22);
      setMagentaGlowValue(0.7);
      setMagentaScribbleOpacity(0.9);
    } else if (preset === "raw_grunge") {
      setMagentaBloomValue(1.4);
      setMagentaVignetteValue(0.85);
      setMagentaGrainValue(0.45);
      setMagentaGlowValue(0.85);
      setMagentaScribbleOpacity(1.0);
    } else if (preset === "soft_glow") {
      setMagentaBloomValue(0.2);
      setMagentaVignetteValue(0.4);
      setMagentaGrainValue(0.1);
      setMagentaGlowValue(0.95);
      setMagentaScribbleOpacity(0.6);
    }
  };

  // Teal Retro Star Dithered Spotlight interactive state hooks
  const [tealBloomValue, setTealBloomValue] = useState<number>(0.3); // blur in px
  const [tealVignetteValue, setTealVignetteValue] = useState<number>(0.6); // vignette opacity
  const [tealGrainValue, setTealGrainValue] = useState<number>(0.25); // grain opacity
  const [tealFlashHighlight, setTealFlashHighlight] = useState<number>(0.8); // camera flash intensity
  const [tealStarsOpacity, setTealStarsOpacity] = useState<number>(0.85); // star overlays opacity
  const [tealStarsCount, setTealStarsCount] = useState<number>(3); // number of stars: 1 to 5
  const [tealActivePreset, setTealActivePreset] = useState<string>("indie_sleaze"); // 'indie_sleaze' | 'vintage_flash' | 'dither_retro' | 'pure'
  const [tealFlowerHovered, setTealFlowerHovered] = useState<boolean>(false);
  const [tealHearts, setTealHearts] = useState<number>(365);
  const [showTealWaterSuccess, setShowTealWaterSuccess] = useState<boolean>(false);
  const [tealAngleTilt, setTealAngleTilt] = useState<number>(-4);
  const [tealStarsColor, setTealStarsColor] = useState<string>("#E5E8E6");

  const applyTealPreset = (preset: string) => {
    setTealActivePreset(preset);
    if (preset === "pure") {
      setTealBloomValue(0);
      setTealVignetteValue(0);
      setTealGrainValue(0);
      setTealFlashHighlight(0);
      setTealStarsOpacity(0);
    } else if (preset === "indie_sleaze") {
      setTealBloomValue(0.3);
      setTealVignetteValue(0.6);
      setTealGrainValue(0.25);
      setTealFlashHighlight(0.8);
      setTealStarsOpacity(0.85);
    } else if (preset === "vintage_flash") {
      setTealBloomValue(0.5);
      setTealVignetteValue(0.75);
      setTealGrainValue(0.35);
      setTealFlashHighlight(1.0);
      setTealStarsOpacity(0.95);
    } else if (preset === "dither_retro") {
      setTealBloomValue(0.1);
      setTealVignetteValue(0.45);
      setTealGrainValue(0.15);
      setTealFlashHighlight(0.5);
      setTealStarsOpacity(0.7);
    }
  };

  // Golden Hour Vintage Saree/Sari Spotlight state hooks
  const [goldenBloomValue, setGoldenBloomValue] = useState<number>(0.2); // soft focus blur
  const [goldenVignetteValue, setGoldenVignetteValue] = useState<number>(0.5); // vignette edges
  const [goldenGrainValue, setGoldenGrainValue] = useState<number>(0.18); // nostalgic film grain
  const [goldenGlowIntensity, setGoldenGlowIntensity] = useState<number>(0.65); // warm amber glow level
  const [goldenZigZagBorder, setGoldenZigZagBorder] = useState<boolean>(true); // zig-zag trim overlay
  const [goldenSareeTrimColor, setGoldenSareeTrimColor] = useState<string>("#FAFAFA"); // warm white, gold, dark charcoal etc
  const [goldenActivePreset, setGoldenActivePreset] = useState<string>("golden_hour"); // 'golden_hour' | 'analog_print' | 'sun_drenched' | 'pure_photo'
  const [goldenFlowerHovered, setGoldenFlowerHovered] = useState<boolean>(false);
  const [goldenHearts, setGoldenHearts] = useState<number>(1008); // started on Jan 27, 2025 celebrating 1y 5m!
  const [showGoldenWaterSuccess, setShowGoldenWaterSuccess] = useState<boolean>(false);
  const [goldenAngleTilt, setGoldenAngleTilt] = useState<number>(4);
  const [goldenZigZagScale, setGoldenZigZagScale] = useState<number>(20); // 10 to 40 triangles

  const applyGoldenPreset = (preset: string) => {
    setGoldenActivePreset(preset);
    if (preset === "pure_photo") {
      setGoldenBloomValue(0);
      setGoldenVignetteValue(0);
      setGoldenGrainValue(0);
      setGoldenGlowIntensity(0);
      setGoldenZigZagBorder(false);
    } else if (preset === "golden_hour") {
      setGoldenBloomValue(0.2);
      setGoldenVignetteValue(0.5);
      setGoldenGrainValue(0.18);
      setGoldenGlowIntensity(0.65);
      setGoldenZigZagBorder(true);
    } else if (preset === "analog_print") {
      setGoldenBloomValue(0.4);
      setGoldenVignetteValue(0.7);
      setGoldenGrainValue(0.35);
      setGoldenGlowIntensity(0.5);
      setGoldenZigZagBorder(true);
    } else if (preset === "sun_drenched") {
      setGoldenBloomValue(0.1);
      setGoldenVignetteValue(0.3);
      setGoldenGrainValue(0.12);
      setGoldenGlowIntensity(0.95);
      setGoldenZigZagBorder(true);
    }
  };

  // Spotlight 8: Velvet Teal Chiaroscuro Muse interactive state hooks
  const [chiaroscuroBloom, setChiaroscuroBloom] = useState<number>(0.2); // soft focus blur value
  const [chiaroscuroVignette, setChiaroscuroVignette] = useState<number>(0.75); // vignette edges intensity
  const [chiaroscuroGrain, setChiaroscuroGrain] = useState<number>(0.2); // retro low-light noise/grain grain
  const [chiaroscuroOverlayGlow, setChiaroscuroOverlayGlow] = useState<number>(0.55); // neon teal ambient bounce
  const [chiaroscuroKeyHighlight, setChiaroscuroKeyHighlight] = useState<number>(0.7); // front key light exposure
  const [chiaroscuroSequinsCount, setChiaroscuroSequinsCount] = useState<number>(12); // sparkling sequins on blouse
  const [chiaroscuroActivePreset, setChiaroscuroActivePreset] = useState<string>("velvet_chiaroscuro"); // 'velvet_chiaroscuro' | 'soft_glow' | 'deep_nocturne' | 'pure_asset'
  const [chiaroscuroHovered, setChiaroscuroHovered] = useState<boolean>(false);
  const [chiaroscuroHearts, setChiaroscuroChamber] = useState<number>(1314); // 1314 for lifelong love loop
  const [showChiaroscuroWaterSuccess, setShowChiaroscuroWaterSuccess] = useState<boolean>(false);
  const [chiaroscuroAngleTilt, setChiaroscuroAngleTilt] = useState<number>(-3);
  const [chiaroscuroSequinsSparkleColor, setChiaroscuroSequinsSparkleColor] = useState<string>("#FFFFFF"); // Shiny white sequins, cyan-teal, or golden sparkles

  const applyChiaroscuroPreset = (preset: string) => {
    setChiaroscuroActivePreset(preset);
    if (preset === "pure_asset") {
      setChiaroscuroBloom(0);
      setChiaroscuroVignette(0);
      setChiaroscuroGrain(0);
      setChiaroscuroOverlayGlow(0);
      setChiaroscuroKeyHighlight(0);
      setChiaroscuroSequinsCount(0);
    } else if (preset === "velvet_chiaroscuro") {
      setChiaroscuroBloom(0.2);
      setChiaroscuroVignette(0.75);
      setChiaroscuroGrain(0.2);
      setChiaroscuroOverlayGlow(0.55);
      setChiaroscuroKeyHighlight(0.7);
      setChiaroscuroSequinsCount(12);
    } else if (preset === "soft_glow") {
      setChiaroscuroBloom(0.5);
      setChiaroscuroVignette(0.55);
      setChiaroscuroGrain(0.12);
      setChiaroscuroOverlayGlow(0.85);
      setChiaroscuroKeyHighlight(0.9);
      setChiaroscuroSequinsCount(18);
    } else if (preset === "deep_nocturne") {
      setChiaroscuroBloom(0.1);
      setChiaroscuroVignette(0.95);
      setChiaroscuroGrain(0.38);
      setChiaroscuroOverlayGlow(0.3);
      setChiaroscuroKeyHighlight(0.4);
      setChiaroscuroSequinsCount(8);
    }
  };

  // Love Games: Perfect Match Memory Game State
  const initialSymbols = ["🎀", "👑", "✨", "❤️", "🌸", "🧸", "🕯️", "🦢"];
  const [memoryCards, setMemoryCards] = useState<{ id: number; symbol: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [selectedCardIndices, setSelectedCardIndices] = useState<number[]>([]);
  const [memoryCompleted, setMemoryCompleted] = useState(false);
  const [memoryMoves, setMemoryMoves] = useState(0);

  // Initialize Memory Game
  const initMemoryGame = () => {
    const doubled = [...initialSymbols, ...initialSymbols];
    const shuffled = doubled
      .map((sym, idx) => ({ id: idx, symbol: sym, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    setMemoryCards(shuffled);
    setSelectedCardIndices([]);
    setMemoryCompleted(false);
    setMemoryMoves(0);
  };

  useEffect(() => {
    initMemoryGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (selectedCardIndices.length >= 2 || memoryCards[index].isFlipped || memoryCards[index].isMatched || memoryCompleted) {
      return;
    }

    const updated = [...memoryCards];
    updated[index].isFlipped = true;
    setMemoryCards(updated);

    const newSelected = [...selectedCardIndices, index];
    setSelectedCardIndices(newSelected);

    if (newSelected.length === 2) {
      setMemoryMoves((prev) => prev + 1);
      const [firstIdx, secondIdx] = newSelected;
      if (updated[firstIdx].symbol === updated[secondIdx].symbol) {
        // Match found!
        setTimeout(() => {
          const matchedState = [...updated];
          matchedState[firstIdx].isMatched = true;
          matchedState[secondIdx].isMatched = true;
          setMemoryCards(matchedState);
          setSelectedCardIndices([]);

          if (matchedState.every((card) => card.isMatched)) {
            setMemoryCompleted(true);
          }
        }, 400);
      } else {
        // Turn back
        setTimeout(() => {
          const resetState = [...updated];
          resetState[firstIdx].isFlipped = false;
          resetState[secondIdx].isFlipped = false;
          setMemoryCards(resetState);
          setSelectedCardIndices([]);
        }, 900);
      }
    }
  };

  // Love Games: "How Well Do You Know Us?" Love Quiz State
  const [quizStep, setQuizStep] = useState(0); // 0 = not started, 1 = Q1, 2 = Q2, 3 = Q3, 4 = complete
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizError, setQuizError] = useState("");

  const quizQuestions = [
    {
      q: "When did our beautiful journey begin?",
      options: ["Jan 2024", "Jan 27, 2025", "Nov 2025"],
      correct: "Jan 27, 2025",
      caption: "A morning that changed our lives forever."
    },
    {
      q: "What is Bishnu's absolute favorite nickname for Babita?",
      options: ["Friend", "Colleague", "Pasandida Aurat 👑"],
      correct: "Pasandida Aurat 👑",
      caption: "Crowned as the absolute queen of his universe."
    },
    {
      q: "What milestone are we celebrating today?",
      options: ["6 Months", "1 Year & 5 Months", "2 Years"],
      correct: "1 Year & 5 Months",
      caption: "A golden milestone filled with infinite growth."
    }
  ];

  const handleQuizAnswer = (answer: string) => {
    const currentQ = quizQuestions[quizStep - 1];
    if (answer === currentQ.correct) {
      setQuizError("");
      const newAnswers = [...quizAnswers, answer];
      setQuizAnswers(newAnswers);
      if (quizStep < quizQuestions.length) {
        setQuizStep(quizStep + 1);
      } else {
        setQuizStep(4); // Success screen
      }
    } else {
      setQuizError("Oh, my beautiful gudiya, think closer to our hearts! 🎀 Let's try again.");
    }
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setQuizAnswers([]);
    setQuizError("");
  };

  // Countdown initialization
  useEffect(() => {
    const startDate = new Date("2025-01-27T10:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const diffMs = now.getTime() - startDate.getTime();
      setMillisecondCounter(diffMs);

      // Deep precise time arithmetic
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();

      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }

      if (months < 0) {
        months += 12;
        years--;
      }

      setHumanTime({
        years,
        months,
        days: Math.abs(days),
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
      });
    }, 45);

    return () => clearInterval(timer);
  }, []);

  // Background sparkles initialization
  useEffect(() => {
    const symbols = ["✦", "✨", "✦", "❇", "♥", "🌸"];
    const initialSparkles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 10 + Math.random() * 16,
      speed: 10 + Math.random() * 15,
      delay: Math.random() * -10,
      char: symbols[Math.floor(Math.random() * symbols.length)]
    }));
    setSparkles(initialSparkles);
  }, []);

  // Monitor video progress safely
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setVideoProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleVideoEnded = () => {
      setVideoPlaying(false);
      setVideoProgress(0);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleVideoEnded);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleVideoEnded);
    };
  }, []);

  // Video click play/pause logic
  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (videoPlaying) {
      video.pause();
      setVideoPlaying(false);
    } else {
      video.play().then(() => {
        setVideoPlaying(true);
      }).catch((err) => {
        console.log("Interactive gesture needed for video start: ", err);
        // Fallback toggling UI state
        setVideoPlaying(true);
      });
    }
  };

  const playTrackInHero = (videoUrl: string) => {
    const video = videoRef.current;
    if (!video) return;
    setHeroVideoSrc(videoUrl);
    // Directly setting matching url to source
    video.src = videoUrl;
    video.load();
    video.play().then(() => {
      setVideoPlaying(true);
    }).catch((err) => {
      console.log("Autoplay blocked, user interaction fallback applied", err);
      setVideoPlaying(true);
    });
  };

  const toggleVideoMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !videoMuted;
    setVideoMuted(!videoMuted);
  };

  const handleFullscreenVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    try {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen();
      } else if ((video as any).mozRequestFullScreen) {
        (video as any).mozRequestFullScreen();
      } else if ((video as any).msRequestFullscreen) {
        (video as any).msRequestFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen API error:", err);
    }
  };

  // Matrix Ribbon particle explosion emitter
  const handleConfessionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const parentRect = containerRef.current?.getBoundingClientRect();
    const clickX = e.clientX - (parentRect?.left || 0);
    const clickY = e.clientY - (parentRect?.top || 0) - window.scrollY;

    const particles = ["🎀", "🌸", "✨", "💖", "🌷", "🎀", "✦"];
    const burst = Array.from({ length: 9 }).map((_, i) => ({
      id: Date.now() + i,
      x: clickX,
      y: clickY,
      rotation: Math.random() * 360,
      scale: 0.75 + Math.random() * 0.75,
      label: particles[Math.floor(Math.random() * particles.length)]
    }));

    setRibbons((prev) => [...prev, ...burst]);

    // Clean up
    setTimeout(() => {
      setRibbons((prev) => prev.filter((r) => !burst.find((b) => b.id === r.id)));
    }, 1500);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#FAF6F0] text-[#5C4033] font-sans selection:bg-[#EBDCCB] selection:text-[#5C4033] relative overflow-x-hidden flex flex-col justify-between"
    >
      {/* BACKGROUND DECORATIVE FLOATING PARTICLES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="absolute text-luxury-gold/25 select-none animate-pulse hover:text-luxury-gold/70 transition-all duration-300"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              fontSize: `${s.size}px`,
              animationDuration: `${s.speed}s`,
              animationDelay: `${s.delay}s`,
            }}
          >
            {s.char}
          </span>
        ))}
      </div>

      {/* 1. TOP AMBIENT MARQUEE */}
      <section className="w-full overflow-hidden bg-[#F4EBE1]/35 border-b border-luxury-brown/5 py-3 z-10">
        <div className="flex whitespace-nowrap animate-[marquee-left_36s_linear_infinite]">
          {Array(4).fill(null).map((_, groupIdx) => (
            <div key={groupIdx} className="flex items-center min-w-full justify-around shrink-0">
              {bishnuNames.map((name, i) => (
                <div key={`bishnu-${i}`} className="mx-6 flex items-center gap-2">
                  <span className="font-serif italic font-medium text-[15px] text-[#A07855]">
                    {name}
                  </span>
                  <Heart className="w-2.5 h-2.5 text-luxury-gold fill-luxury-gold opacity-50" />
                </div>
              ))}
              {babitaNames.map((name, i) => (
                <div key={`babita-${i}`} className="mx-6 flex items-center gap-2">
                  <span className="font-mono text-xs tracking-widest uppercase text-luxury-gold">
                    {name}
                  </span>
                  <Sparkles className="w-2.5 h-2.5 text-luxury-gold opacity-45" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 2. HERO SPLASH HEADERVIEW */}
      <header className="max-w-5xl mx-auto w-full px-6 pt-16 pb-12 text-center z-10 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-5 opacity-85">
          <span className="h-[1px] w-12 bg-luxury-brown/20 animate-scale-in"></span>
          <span className="font-serif italic text-xs tracking-[0.2em] text-[#A07855] uppercase font-semibold">1 Year &amp; 5 Months Milestone</span>
          <span className="h-[1px] w-12 bg-luxury-brown/20 animate-scale-in"></span>
        </div>

        <h1 
          id="main-celebration-title"
          className="font-serif text-5xl md:text-8xl font-extralight tracking-tight text-[#4E3629] mb-4 drop-shadow-sm select-none"
        >
          Bishnu <span className="italic font-light text-luxury-gold">&amp;</span> Babita
        </h1>

        <p className="font-serif italic text-lg md:text-xl text-[#8B6E59] max-w-xl mx-auto leading-relaxed mb-10 font-light">
          "Celebrating a beautiful canvas of trust, starry horizons, and a love that blooms on and on since January 27, 2025."
        </p>

        {/* HIGH PRECISION COUNTDOWN TIMER WIDGET */}
        <div className="w-full max-w-3xl bg-white/50 backdrop-blur-md rounded-[32px] p-6 md:p-10 border border-[#EACBB0]/40 shadow-[0_12px_45px_rgba(92,64,51,0.03)] relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent"></div>
          
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#A07855] font-bold mb-5">
            ✨ High-Precision Golden Chronological Ledger ✨
          </p>

          {/* Milliseconds continuous clockup */}
          <div className="font-mono text-3xl md:text-5xl font-light tracking-widest text-[#4E3629] mb-8 select-none tabular-nums bg-cream-base/50 py-4 px-6 rounded-2xl border border-luxury-brown/5 max-w-xl mx-auto shadow-inner">
            {millisecondCounter === 0 ? "Initialising..." : millisecondCounter.toLocaleString()} <span className="text-xs md:text-sm text-luxury-gold font-serif italic ml-1">ms on earth</span>
          </div>

          {/* Human Readable Grid layout */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 pt-3.5 border-t border-luxury-brown/5">
            {[
              { val: humanTime.years, label: "Years" },
              { val: humanTime.months, label: "Months" },
              { val: humanTime.days, label: "Days" },
              { val: humanTime.hours, label: "Hours", pad: true },
              { val: humanTime.minutes, label: "Minutes", pad: true },
              { val: humanTime.seconds, label: "Seconds", pad: true, special: true }
            ].map((unit, idx) => (
              <div key={idx} className="flex flex-col items-center bg-white/75 p-3 rounded-xl border border-luxury-brown/5 shadow-xs transform hover:scale-105 transition-transform duration-300">
                <span className={`font-serif text-2xl md:text-3xl font-light ${unit.special ? "text-luxury-gold animate-pulse font-medium" : "text-luxury-brown"}`}>
                  {unit.pad ? String(unit.val).padStart(2, '0') : unit.val}
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[#8B6E59] mt-1 font-semibold">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-xs font-serif italic text-[#8B6E59]/80 flex items-center justify-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Sacred voyage started Jan 27, 2025 at exactly 10:00 AM</span>
          </div>
        </div>
      </header>

      {/* 2. "THE GALLERY OF MY QUEEN" (Dedicated Photo Space) */}
      <section id="queens-gallery-hub" className="max-w-6xl mx-auto w-full px-6 py-12 z-10">
        <div className="text-center mb-12">
          <p className="font-serif italic text-luxury-gold text-sm tracking-widest uppercase font-semibold">Candid Relics of Divinity</p>
          <h2 className="font-serif text-3xl md:text-4xl font-extralight text-[#4E3629] mt-1 tracking-tight">The Gallery of My Queen</h2>
          <p className="text-[10px] tracking-widest font-sans uppercase text-luxury-brown/50 mt-1 max-w-md mx-auto">
            Dedicated entirely to Babita's unparalleled grace and radiant beauty.
          </p>
          <div className="h-[1px] w-12 bg-luxury-gold/50 mx-auto mt-4"></div>
        </div>

        {/* PRIVATE ANNIVERSARY MEDIA CURATOR PANEL */}
        <div className="mb-14 max-w-4xl mx-auto bg-[#F4EBE1]/40 backdrop-blur-md rounded-2xl border border-[#EACBB0]/40 p-5 shadow-[0_10px_35px_rgba(92,64,51,0.02)] transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-left">
              <SlidersHorizontal className="w-4 h-4 text-luxury-gold" />
              <div>
                <h3 className="font-serif text-sm font-semibold text-[#4E3629] tracking-wider uppercase">Gudiya's Personal Media Vault</h3>
                <p className="text-[9.5px] font-mono text-luxury-brown/60">Customize her photos, videos, and captions in real-time</p>
              </div>
            </div>
            <button
              onClick={() => setCuratorOpen(!curatorOpen)}
              className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-white/75 hover:bg-white text-[10px] font-mono tracking-widest text-[#5C4033] border border-luxury-brown/10 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              {curatorOpen ? (
                <>
                  CLOSE CONSOLE <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  OPEN MEDIA CURATOR <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Collapsible Content */}
          {curatorOpen && (
            <div className="mt-5 border-t border-luxury-brown/5 pt-5 animate-slide-in">
              {/* Tab Toggles */}
              <div className="flex gap-2 border-b border-luxury-brown/5 pb-3 mb-5 overflow-x-auto scrollbar-none">
                {[
                  { id: "masonry", label: "Editorial Masonry (6 Slots)" },
                  { id: "polaroid", label: "Polaroid Strip (5 Slots)" },
                  { id: "cinema", label: "Video & Reels Theater" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCuratorTab(tab.id)}
                    className={`py-1.5 px-4 rounded-xl text-[10.5px] font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                      activeCuratorTab === tab.id
                        ? "bg-[#5C4033] text-white shadow-sm font-bold"
                        : "bg-white/50 hover:bg-white text-[#5C4033] border border-luxury-brown/5"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB CONTENT: MASONRY */}
              {activeCuratorTab === "masonry" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {masonryList.map((img, i) => (
                    <div key={i} className="bg-white p-3.5 rounded-xl border border-luxury-brown/5 flex gap-3.5 items-center">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-cream-base shrink-0 relative border border-luxury-brown/5 shadow-xs">
                        <img src={img.url} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-[8px] font-mono text-white text-center font-bold px-1">SLOT {i+1}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 space-y-2 text-left">
                        <div className="flex items-center gap-1.5 justify-between">
                          <span className="text-[10px] font-mono font-bold text-luxury-gold uppercase">Masonry Slot {i+1}</span>
                          {img.url !== masonryImages[i].url && (
                            <button
                              onClick={() => handleMediaRevert(`masonry-${i}`)}
                              className="text-[9px] font-mono text-red-500 hover:text-red-750 flex items-center gap-0.5 cursor-pointer"
                              title="Revert to default template image"
                            >
                              <Trash2 className="w-3 h-3" /> Revert
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          className="w-full text-[11px] py-1 px-2.5 rounded border border-luxury-brown/10 bg-[#FAF6F0]/40 focus:outline-none focus:border-luxury-gold focus:bg-white font-serif"
                          placeholder="Customize Caption..."
                          value={img.caption || ""}
                          onChange={async (e) => {
                            const val = e.target.value;
                            setMasonryList((prev) => {
                              const updated = [...prev];
                              updated[i] = { ...updated[i], caption: val };
                              return updated;
                            });
                            const dbItem = await getMedia(`masonry-${i}`);
                            if (dbItem) {
                              await saveMedia({ ...dbItem, caption: val });
                            }
                          }}
                        />
                        <label className="inline-flex items-center gap-1 py-1 px-2.5 bg-[#FAF6F0] hover:bg-[#EBDCCB] border border-luxury-brown/10 text-[9.5px] font-mono tracking-wider rounded-md cursor-pointer transition-colors shadow-2xs">
                          <Upload className="w-3 h-3 text-luxury-gold" /> UPLOAD PHOTO
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleMediaUpload(`masonry-${i}`, file, img.caption ?? "");
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB CONTENT: POLAROID */}
              {activeCuratorTab === "polaroid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {polaroidList.map((snap, i) => (
                    <div key={i} className="bg-white p-3.5 rounded-xl border border-luxury-brown/5 flex gap-3.5 items-center">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-cream-base shrink-0 relative border border-luxury-brown/5 shadow-xs">
                        <img src={snap.url} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-[8px] font-mono text-white text-center font-bold px-1">SNAP {i+1}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 space-y-2 text-left">
                        <div className="flex items-center gap-1.5 justify-between">
                          <span className="text-[10px] font-mono font-bold text-luxury-gold uppercase">Polaroid Snap {i+1}</span>
                          {snap.url !== polaroidSnapshots[i].url && (
                            <button
                              onClick={() => handleMediaRevert(`polaroid-${i}`)}
                              className="text-[9px] font-mono text-red-500 hover:text-red-750 flex items-center gap-0.5 cursor-pointer"
                              title="Revert to default template snapshot"
                            >
                              <Trash2 className="w-3 h-3" /> Revert
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          className="w-full text-[11px] py-1 px-2.5 rounded border border-luxury-brown/10 bg-[#FAF6F0]/40 focus:outline-none focus:border-luxury-gold focus:bg-white font-serif"
                          placeholder="Customize Caption..."
                          value={snap.caption || ""}
                          onChange={async (e) => {
                            const val = e.target.value;
                            setPolaroidList((prev) => {
                              const updated = [...prev];
                              updated[i] = { ...updated[i], caption: val };
                              return updated;
                            });
                            const dbItem = await getMedia(`polaroid-${i}`);
                            if (dbItem) {
                              await saveMedia({ ...dbItem, caption: val });
                            }
                          }}
                        />
                        <label className="inline-flex items-center gap-1 py-1 px-2.5 bg-[#FAF6F0] hover:bg-[#EBDCCB] border border-luxury-brown/10 text-[9.5px] font-mono tracking-wider rounded-md cursor-pointer transition-colors shadow-2xs">
                          <Upload className="w-3 h-3 text-luxury-gold" /> UPLOAD PHOTO
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleMediaUpload(`polaroid-${i}`, file, snap.caption ?? "");
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB CONTENT: CINEMA & REELS */}
              {activeCuratorTab === "cinema" && (
                <div className="space-y-5">
                  {/* MAIN THEATER VALUE VIDEO */}
                  <div className="bg-white p-4 rounded-xl border border-luxury-brown/5 space-y-3 text-left">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Video className="w-3.5 h-3.5 text-luxury-gold" />
                        <span className="text-[11px] font-mono font-bold text-luxury-gold uppercase">Main Video Theater (MP4)</span>
                      </div>
                      {heroVideoSrc !== "https://videotourl.com/videos/1779787061615-3abf92c7-fd64-4242-ba43-16f9954e504a.mp4" && (
                        <button
                          onClick={() => handleMediaRevert("hero-video")}
                          className="text-[9px] font-mono text-red-500 hover:text-red-750 flex items-center gap-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" /> Revert
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-[#8B6E59] font-serif italic leading-relaxed">
                      Replace the default horizontal player clip with your own MP4 video memory.
                    </p>
                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center gap-1.5 py-1.5 px-4 bg-[#FAF6F0]/80 hover:bg-[#EBDCCB] border border-luxury-brown/10 text-[10px] font-mono tracking-widest rounded-lg cursor-pointer transition-colors shadow-2xs">
                        <Upload className="w-3.5 h-3.5 text-luxury-gold" /> CHOOSE VIDEO FILE
                        <input
                          type="file"
                          accept="video/mp4,video/x-m4v,video/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleMediaUpload("hero-video", file);
                          }}
                        />
                      </label>
                      {heroVideoSrc.startsWith("data:") && (
                        <span className="text-[9.5px] font-mono text-green-500 tracking-wider">● Custom Video Active</span>
                      )}
                    </div>
                  </div>

                  {/* VERTICAL REELS UPLOADS */}
                  <div className="bg-white p-4 rounded-xl border border-luxury-brown/5 space-y-4 text-left">
                    <div className="flex items-center gap-2">
                      <Film className="w-3.5 h-3.5 text-luxury-gold" />
                      <span className="text-[11px] font-mono font-bold text-[#4E3629] uppercase">Vertical Reels (9:16 Portrait Video Clips)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[420px] overflow-y-auto pr-1">
                      {reelsList.map((reel, idx) => (
                        <div key={idx} className="bg-[#FAF6F0]/40 p-3 rounded-lg border border-luxury-brown/5 space-y-2.5">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono text-luxury-gold font-bold">REEL SLOT {idx + 1}</span>
                            {customReelVideos[idx] && (
                              <button
                                onClick={() => handleMediaRevert(`reel-${idx}`)}
                                className="text-[9px] font-mono text-red-500 hover:text-red-750 flex items-center gap-0.5 cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" /> Revert
                              </button>
                            )}
                          </div>
                          
                          <input
                            type="text"
                            value={reel.title || ""}
                            className="w-full text-[11px] py-1 px-2 rounded border border-luxury-brown/10 bg-white focus:outline-none font-serif"
                            placeholder="Reel Caption..."
                            onChange={async (e) => {
                              const val = e.target.value;
                              setReelsList((prev) => {
                                const updated = [...prev];
                                updated[idx] = { ...updated[idx], title: val };
                                return updated;
                              });
                              const dbItem = await getMedia(`reel-${idx}`);
                              if (dbItem) {
                                await saveMedia({ ...dbItem, caption: val });
                              }
                            }}
                          />

                          <label className="w-full inline-flex items-center justify-center gap-1 py-1 px-2 bg-white hover:bg-cream-base/50 border border-luxury-brown/10 text-[9px] font-mono tracking-wider rounded cursor-pointer transition-colors">
                            <Upload className="w-3 h-3 text-luxury-gold" /> UPLOAD VIDEO (9:16)
                            <input
                              type="file"
                              accept="video/mp4,video/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleMediaUpload(`reel-${idx}`, file, reel.title ?? "");
                              }}
                            />
                          </label>

                          {customReelVideos[idx] && (
                            <span className="text-[8px] font-mono text-green-500 flex items-center justify-center gap-1 font-bold">
                              ● PORTRAIT ACTIVE
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 2026 SPECIAL SPOTLIGHT: THE PINK HIBISCUS QUEEN */}
        <div id="hibiscus-spotlight-card" className="mb-16 bg-[#151D18] rounded-[32px] p-6 lg:p-12 border border-[#232F27]/60 shadow-[0_24px_55px_rgba(21,29,24,0.3)] relative overflow-hidden text-left text-stone-200">
          {/* Subtle glowing radial background decor */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-radial from-[#FF6B8B]/10 to-transparent pointer-events-none rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-[240px] h-[240px] bg-gradient-radial from-[#A3C1AD]/10 to-transparent pointer-events-none rounded-full blur-2xl"></div>

          {/* SVG Noise Generator Filter */}
          <svg className="absolute w-0 h-0 pointer-events-none">
            <defs>
              <filter id="hibiscus-grainy-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.18 0" />
                <feComposite operator="in" in2="SourceGraphic" />
              </filter>
            </defs>
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* LEFT HALF: THE INTERACTIVE PORTRAIT PLAYER (6 cols) */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div 
                className="relative aspect-[3/4] w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#1D2721] p-2 border border-[#2C3B32] shadow-2xl group transition-all duration-500 hover:scale-[1.015]"
                onMouseEnter={() => setFlowerHovered(true)}
                onMouseLeave={() => setFlowerHovered(false)}
              >
                {/* Real-time filters viewport container */}
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-black">
                  {/* The actual photo of Babita from the user's link */}
                  <img 
                    src="https://plain-apac-prod-public.komododecks.com/202605/26/We9K9QU8MMvnFpF3UwUU/image.jpg" 
                    alt="Babita Hibiscus Portrait" 
                    className="w-full h-full object-cover select-none transition-all duration-300"
                    style={{
                      filter: `brightness(1.05) contrast(0.92) saturate(1.02) blur(${bloomValue}px)`
                    }}
                    referrerPolicy="no-referrer"
                  />

                  {/* Micro-simulation option for photographic Noise filter overlay */}
                  {grainValue > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-overlay"
                      style={{ 
                        filter: "url(#hibiscus-grainy-noise)", 
                        opacity: grainValue 
                      }}
                    />
                  )}

                  {/* Vignette Gradiation layer */}
                  {vignetteValue > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{ 
                        background: "radial-gradient(circle, transparent 40%, rgba(0,0,0,0.92) 100%)",
                        opacity: vignetteValue 
                      }}
                    />
                  )}

                  {/* Decorative flower overlay filter mimicking the digital sticker in photo */}
                  <div 
                    className={`absolute top-[18%] left-[20%] w-[15%] aspect-square flex items-center justify-center text-3xl pointer-events-none transition-all duration-1000 ease-out select-none drop-shadow-[0_4px_10px_rgba(255,107,139,0.5)] ${
                      flowerHovered ? "rotate-12 scale-[1.3] animate-pulse" : "rotate-0 scale-100"
                    }`}
                  >
                    🌸
                  </div>

                  {/* Aesthetic signature label */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[9px] font-mono tracking-widest text-white/50 bg-black/45 backdrop-blur-md py-1.5 px-3 rounded-lg border border-white/5 uppercase select-none">
                    <span>👑 Babita Devi</span>
                    <span>Preset: {activePreset}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT HALF: ROMANTIC DISCOVERY & INTERACTIVE STUDIO PANEL (6 cols) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 py-1 px-3.5 bg-[#FF6B8B]/10 hover:bg-[#FF6B8B]/20 border border-[#FF6B8B]/20 text-[#FF8DA6] text-[9.5px] font-mono tracking-widest rounded-full uppercase leading-none select-none">
                  <Star className="w-3 h-3 text-[#FF8DA6] fill-[#FF8DA6]" />
                  Gudiya's Divine Portrait Spotlight
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl font-extralight text-white tracking-tight leading-tight">
                  The Pink <span className="italic text-[#FF8DA6] font-normal">Hibiscus</span> Queen
                </h3>
                
                <div className="h-[1px] w-20 bg-[#FF8DA6]/40"></div>
              </div>

              {/* Poetic description parsing visual cues */}
              <p className="font-serif italic text-sm md:text-[15px] text-stone-300 leading-relaxed font-light">
                "Tucked gently into her hair is a vibrant pink hibiscus flower, painting her dark eyes and warm golden-tan skin in beautiful contrast. Every delicate detail—from her subtle silver nose piercing to the elegant embroidered white border neckline of her sage-green top—sings a quiet ballad of unmatched grace. She is my wifey, my baby, and my forever princess November."
              </p>

              {/* INTERACTIVE CONTROLLER STUDIO BOX */}
              <div className="bg-[#1C2620] rounded-2xl p-5 border border-[#2A392F] space-y-4 shadow-inner">
                <span className="block font-mono text-[9px] tracking-widest text-[#FF8DA6] font-bold uppercase select-none">
                  🎛️ ANALOG STUDIO PRESETS &amp; CALIBRATION
                </span>

                {/* Preset Fast Select Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { id: "pure", label: "Pure (Original)" },
                    { id: "dreamy", label: "Dreamy Bloom ✨" },
                    { id: "vintage", label: "Vintage Grain 🎞️" },
                    { id: "vibrant", label: "Vibrate Glow" }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset.id)}
                      className={`py-1.5 px-3 rounded-lg text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
                        activePreset === preset.id
                          ? "bg-[#FF6B8B] text-white font-bold shadow-md"
                          : "bg-black/35 text-stone-300 hover:bg-black/55 border border-white/5"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Fine Tuning Custom Range Sliders */}
                <div className="space-y-3 pt-2 text-stone-300">
                  {/* Bloom control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Bloom Glow Depth (Blur)</span>
                      <span className="text-[#FF8DA6]">{bloomValue} px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="3" 
                      step="0.1" 
                      value={bloomValue} 
                      onChange={(e) => {
                        setBloomValue(parseFloat(e.target.value));
                        setActivePreset("custom");
                      }}
                      className="w-full accent-[#FF6B8B] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Vignette control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Vignette Darkness (Edges)</span>
                      <span className="text-[#FF8DA6]">{Math.round(vignetteValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={vignetteValue} 
                      onChange={(e) => {
                        setVignetteValue(parseFloat(e.target.value));
                        setActivePreset("custom");
                      }}
                      className="w-full accent-[#FF6B8B] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Noise Weight control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Film Grain Density (Photographic Noise)</span>
                      <span className="text-[#FF8DA6]">{Math.round(grainValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="0.6" 
                      step="0.02" 
                      value={grainValue} 
                      onChange={(e) => {
                        setGrainValue(parseFloat(e.target.value));
                        setActivePreset("custom");
                      }}
                      className="w-full accent-[#FF6B8B] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* WATER & FLOWER HEART LAUNCHER BUTTON */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <div 
                  onClick={handleConfessionClick}
                  className="flex-1"
                >
                  <button
                    onClick={() => {
                      setHibiscusHearts(prev => prev + 1);
                      setShowWaterSuccess(true);
                      setTimeout(() => setShowWaterSuccess(false), 3200);
                    }}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-[#FF6B8B] to-[#FF477E] hover:from-[#FF477E] hover:to-[#FF6B8B] text-white text-xs font-mono tracking-widest uppercase font-bold rounded-xl shadow-[0_8px_25px_rgba(255,107,139,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 border border-white/10"
                  >
                    <Heart className="w-4 h-4 fill-white animate-pulse" />
                    WATER &amp; SEND HEARTS TO HER SPOTLIGHT
                  </button>
                </div>

                <div className="bg-black/25 py-2 px-4 rounded-xl border border-white/5 text-center flex flex-col justify-center shrink-0 min-w-[100px] select-none">
                  <span className="text-[9px] font-mono uppercase text-stone-400">Sweet Sparkles</span>
                  <span className="text-sm font-sans tracking-tight text-[#FF8DA6] font-bold">{hibiscusHearts} 🌸</span>
                </div>
              </div>

              {/* WATER SUCCESS CONFIRMATION MSG */}
              {showWaterSuccess && (
                <div className="text-[11px] font-serif italic text-[#FF8DA6] bg-[#FF6B8B]/10 p-3 rounded-xl border border-[#FF6B8B]/20 animate-fade-in text-center lg:text-left flex items-center justify-center lg:justify-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF8DA6] animate-spin-slow" />
                  <span>Watered with absolute love! Her pink hibiscus sparkled. Floating ribbons released over her frame! 💖</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2026 SPECIAL SPOTLIGHT 2: THE GOLDEN MARIGOLD MUSE */}
        <div id="marigold-spotlight-card" className="mb-16 bg-[#161313] rounded-[32px] p-6 lg:p-12 border border-[#2B231A]/60 shadow-[0_24px_55px_rgba(22,19,19,0.35)] relative overflow-hidden text-left text-stone-200">
          {/* Subtle glowing radial background decor */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-radial from-[#FFA000]/10 to-transparent pointer-events-none rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-[240px] h-[240px] bg-gradient-radial from-[#E8C5AF]/10 to-transparent pointer-events-none rounded-full blur-2xl"></div>

          {/* SVG Noise Generator Filter */}
          <svg className="absolute w-0 h-0 pointer-events-none">
            <defs>
              <filter id="marigold-grainy-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.60" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.18 0" />
                <feComposite operator="in" in2="SourceGraphic" />
              </filter>
            </defs>
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* LEFT HALF: THE INTERACTIVE PORTRAIT PLAYER */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div 
                className="relative aspect-[3/4] w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#221C1B] p-2 border border-[#3A2E2C] shadow-2xl group transition-all duration-500 hover:scale-[1.015]"
                onMouseEnter={() => setMarigoldFlowerHovered(true)}
                onMouseLeave={() => setMarigoldFlowerHovered(false)}
              >
                {/* Real-time filters viewport container */}
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-black">
                  {/* The actual photo of Babita from the user's second link */}
                  <img 
                    src="https://img.sanishtech.com/u/d17f0b0b2c627cd6d5b7dab6b8c8cc76.jpeg" 
                    alt="Babita Marigold Portrait" 
                    className="w-full h-full object-cover select-none transition-all duration-300"
                    style={{
                      filter: `brightness(1.05) contrast(0.9) saturate(1.0) blur(${marigoldBloomValue}px)`,
                      transform: `scale(1.1) rotate(${marigoldAngleTilt}deg)`
                    }}
                    referrerPolicy="no-referrer"
                  />

                  {/* Micro-simulation option for photographic Noise filter overlay */}
                  {marigoldGrainValue > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-overlay"
                      style={{ 
                        filter: "url(#marigold-grainy-noise)", 
                        opacity: marigoldGrainValue 
                      }}
                    />
                  )}

                  {/* Vignette Gradiation layer */}
                  {marigoldVignetteValue > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{ 
                        background: "radial-gradient(circle, transparent 40%, rgba(0,0,0,0.92) 100%)",
                        opacity: marigoldVignetteValue 
                      }}
                    />
                  )}

                  {/* Floating yellow flower overlay filter mimicking the marigold daisy filter in photo */}
                  <div 
                    className={`absolute top-[28%] right-[15%] w-[15%] aspect-square flex items-center justify-center text-3xl pointer-events-none transition-all duration-1000 ease-out select-none drop-shadow-[0_4px_12px_rgba(255,160,0,0.6)] ${
                      marigoldFlowerHovered ? "rotate-45 scale-[1.3] animate-bounce" : "rotate-12 scale-100"
                    }`}
                  >
                    🌻
                  </div>

                  {/* Aesthetic signature label */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[9px] font-mono tracking-widest text-white/50 bg-black/45 backdrop-blur-md py-1.5 px-3 rounded-lg border border-white/5 uppercase select-none">
                    <span>👑 Gudiya Babita</span>
                    <span>Preset: {marigoldActivePreset}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT HALF: ROMANTIC DISCOVERY & INTERACTIVE STUDIO PANEL */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 py-1 px-3.5 bg-[#FFA000]/10 hover:bg-[#FFA000]/20 border border-[#FFA000]/20 text-[#FFC107] text-[9.5px] font-mono tracking-widest rounded-full uppercase leading-none select-none">
                  <Sparkles className="w-3 h-3 text-[#FFC107] fill-[#FFC107]" />
                  Gudiya's Cosy Sleeping Portrait
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl font-extralight text-white tracking-tight leading-tight">
                  The Amber <span className="italic text-[#FFC107] font-normal">Marigold</span> Dream
                </h3>
                
                <div className="h-[1px] w-20 bg-[#FFC107]/40"></div>
              </div>

              {/* Poetic description parsing visual cues */}
              <p className="font-serif italic text-sm md:text-[15px] text-stone-300 leading-relaxed font-light">
                "Tilted softly, she rests in gentle silence, looking directly into my heart with eyes full of quiet reassurance. A glowing amber marigold flower is nestled in her dark silk hair, casting a warm sunlit golden hue. She wears an abstract hand-drawn zigzag pattern dark top. In this warm, low-key dream, she is my sanctuary, my beautiful pumpkin, my Babita girl."
              </p>

              {/* INTERACTIVE CONTROLLER STUDIO BOX */}
              <div className="bg-[#1F1918] rounded-2xl p-5 border border-[#352927] space-y-4 shadow-inner">
                <span className="block font-mono text-[9px] tracking-widest text-[#FFC107] font-bold uppercase select-none">
                  🎛️ PORTRAIT STUDIO CONTROL DECK
                </span>

                {/* Preset Fast Select Buttons */}
                <div className="flex flex-wrap gap-2 pt-1 font-mono">
                  {[
                    { id: "pure", label: "Pure (Original)" },
                    { id: "dreamy", label: "Dreamy Bloom ✨" },
                    { id: "vintage", label: "Vintage Grain 🎞️" },
                    { id: "vibrant", label: "Vibrate Glow" }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyMarigoldPreset(preset.id)}
                      className={`py-1.5 px-3 rounded-lg text-[10px] tracking-wider transition-all cursor-pointer ${
                        marigoldActivePreset === preset.id
                          ? "bg-[#FFA000] text-[#121010] font-bold shadow-md"
                          : "bg-black/35 text-stone-300 hover:bg-black/55 border border-white/5"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Fine Tuning Custom Range Sliders */}
                <div className="space-y-3 pt-2 text-stone-300">
                  {/* Bloom control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Bloom Glow Depth (Blur)</span>
                      <span className="text-[#FFC107]">{marigoldBloomValue} px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="3" 
                      step="0.1" 
                      value={marigoldBloomValue} 
                      onChange={(e) => {
                        setMarigoldBloomValue(parseFloat(e.target.value));
                        setMarigoldActivePreset("custom");
                      }}
                      className="w-full accent-[#FFA000] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Vignette control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Vignette Darkness (Edges)</span>
                      <span className="text-[#FFC107]">{Math.round(marigoldVignetteValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={marigoldVignetteValue} 
                      onChange={(e) => {
                        setMarigoldVignetteValue(parseFloat(e.target.value));
                        setMarigoldActivePreset("custom");
                      }}
                      className="w-full accent-[#FFA000] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Noise Weight control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Film Grain Density (Photographic Noise)</span>
                      <span className="text-[#FFC107]">{Math.round(marigoldGrainValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="0.6" 
                      step="0.02" 
                      value={marigoldGrainValue} 
                      onChange={(e) => {
                        setMarigoldGrainValue(parseFloat(e.target.value));
                        setMarigoldActivePreset("custom");
                      }}
                      className="w-full accent-[#FFA000] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Angle Tilt control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Cinematic Photo Rotation (Tilt Axis)</span>
                      <span className="text-[#FFC107]">{marigoldAngleTilt} deg</span>
                    </div>
                    <input 
                      type="range" 
                      min="-20" 
                      max="20" 
                      step="1" 
                      value={marigoldAngleTilt} 
                      onChange={(e) => setMarigoldAngleTilt(parseInt(e.target.value))}
                      className="w-full accent-[#FFA000] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* WATER & FLOWER HEART LAUNCHER BUTTON */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <button
                  onClick={() => {
                    setMarigoldHearts(prev => prev + 1);
                    setShowMarigoldWaterSuccess(true);
                    setTimeout(() => setShowMarigoldWaterSuccess(false), 3200);
                  }}
                  className="flex-1 py-3.5 px-6 bg-gradient-to-r from-[#FFA000] to-[#FF8F00] hover:from-[#FF8F00] hover:to-[#FFA000] text-[#121010] text-xs font-mono tracking-widest uppercase font-bold rounded-xl shadow-[0_8px_25px_rgba(255,160,0,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 border border-white/15"
                >
                  <Heart className="w-4 h-4 fill-[#121010] animate-pulse" />
                  WATER &amp; SHINE MARIGOLD BLOSSOMS
                </button>

                <div className="bg-black/25 py-2 px-4 rounded-xl border border-white/5 text-center flex flex-col justify-center shrink-0 min-w-[100px] select-none">
                  <span className="text-[9px] font-mono uppercase text-stone-400">Amber Glow</span>
                  <span className="text-sm font-sans tracking-tight text-[#FFC107] font-bold">{marigoldHearts} 🌻</span>
                </div>
              </div>

              {/* WATER SUCCESS CONFIRMATION MSG */}
              {showMarigoldWaterSuccess && (
                <div className="text-[11px] font-serif italic text-[#FFC107] bg-[#FFA000]/10 p-3 rounded-xl border border-[#FFA000]/20 animate-fade-in text-center lg:text-left flex items-center justify-center lg:justify-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFC107] animate-spin-slow" />
                  <span>Nurtured with golden rays! Her amber marigold shimmered warmly. Sending sparkles through her frame! 🌻🌞</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2026 SPECIAL SPOTLIGHT 3: THE RETRO INDIGO VHS MUSE */}
        <div id="indigo-spotlight-card" className="mb-16 bg-[#0B0D16] rounded-[32px] p-6 lg:p-12 border border-[#1C2035]/60 shadow-[0_24px_55px_rgba(11,13,22,0.4)] relative overflow-hidden text-left text-stone-200">
          {/* Subtle glowing radial background decor matching cyan light bar */}
          <div className="absolute top-10 left-10 w-[280px] h-[280px] bg-gradient-radial from-[#5CE1E6]/10 to-transparent pointer-events-none rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-gradient-radial from-[#FF3B30]/5 to-transparent pointer-events-none rounded-full blur-3xl"></div>

          {/* SVG Noise Generator Filter */}
          <svg className="absolute w-0 h-0 pointer-events-none">
            <defs>
              <filter id="indigo-grainy-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.22 0" />
                <feComposite operator="in" in2="SourceGraphic" />
              </filter>
            </defs>
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* LEFT HALF: THE PORTRAIT CRT SCANLINE PLAYER */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div 
                className="relative aspect-[3/4] w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#121526] p-2 border border-[#232946] shadow-2xl group transition-all duration-500 hover:scale-[1.015]"
                onMouseEnter={() => setIndigoFlowerHovered(true)}
                onMouseLeave={() => setIndigoFlowerHovered(false)}
              >
                {/* Real-time filters viewport container for analog signals */}
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-black">
                  
                  {/* Chromatic aberration layers simulation using offset positioning & CSS blending */}
                  {indigoChromaShift > 0 ? (
                    <div className="relative w-full h-full">
                      {/* RED CHIEF LAYER */}
                      <img 
                        src="https://img.sanishtech.com/u/8654b0a795db0048cbbd6e41d1ac8db7.jpeg" 
                        alt="Babita VHS red channel" 
                        className="absolute inset-0 w-full h-full object-cover select-none mix-blend-screen opacity-70"
                        style={{
                          filter: `brightness(1.02) contrast(1.05) saturate(1.1) blur(${indigoBloomValue}px)`,
                          transform: `scale(1.08) rotate(${indigoAngleTilt}deg) translate(${indigoChromaShift}px, 0px)`
                        }}
                        referrerPolicy="no-referrer"
                      />
                      {/* CYAN OFFSET LAYER */}
                      <img 
                        src="https://img.sanishtech.com/u/8654b0a795db0048cbbd6e41d1ac8db7.jpeg" 
                        alt="Babita VHS cyan channel" 
                        className="absolute inset-0 w-full h-full object-cover select-none mix-blend-screen opacity-75"
                        style={{
                          filter: `brightness(1.02) contrast(1.05) saturate(1.1) blur(${indigoBloomValue}px)`,
                          transform: `scale(1.08) rotate(${indigoAngleTilt}deg) translate(-${indigoChromaShift}px, 0px)`
                        }}
                        referrerPolicy="no-referrer"
                      />
                      {/* BASE MASTER LAYER */}
                      <img 
                        src="https://img.sanishtech.com/u/8654b0a795db0048cbbd6e41d1ac8db7.jpeg" 
                        alt="Babita VHS master channel" 
                        className="w-full h-full object-cover select-none relative opacity-85"
                        style={{
                          filter: `brightness(1.02) contrast(0.95) saturate(0.9) blur(${indigoBloomValue}px)`,
                          transform: `scale(1.08) rotate(${indigoAngleTilt}deg)`
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <img 
                      src="https://img.sanishtech.com/u/8654b0a795db0048cbbd6e41d1ac8db7.jpeg" 
                      alt="Babita VHS Original" 
                      className="w-full h-full object-cover select-none transition-all duration-300"
                      style={{
                        filter: `brightness(1.02) contrast(0.95) saturate(0.95) blur(${indigoBloomValue}px)`,
                        transform: `scale(1.08) rotate(${indigoAngleTilt}deg)`
                      }}
                      referrerPolicy="no-referrer"
                    />
                  )}

                  {/* Horizontal static lighting bar overlay matching top-left glowing cyan element */}
                  <div className="absolute top-[33%] left-[10%] w-[38%] h-1.5 bg-[#5CE1E6] rounded-full blur-[3px] opacity-80 pointer-events-none shadow-[0_0_12px_rgba(92,225,230,0.8)] animate-pulse"></div>

                  {/* CRT Horizontal Scanlines Overlay */}
                  {indigoScanlineValue > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none select-none transition-opacity duration-300"
                      style={{
                        background: "repeating-linear-gradient(rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 2px, transparent 4px)",
                        opacity: indigoScanlineValue
                      }}
                    />
                  )}

                  {/* Micro-simulation option for photographic Noise filter overlay */}
                  {indigoGrainValue > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-overlay"
                      style={{ 
                        filter: "url(#indigo-grainy-noise)", 
                        opacity: indigoGrainValue 
                      }}
                    />
                  )}

                  {/* Vignette Gradiation layer */}
                  {indigoVignetteValue > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{ 
                        background: "radial-gradient(circle, transparent 35%, rgba(10,13,22,0.95) 100%)",
                        opacity: indigoVignetteValue 
                      }}
                    />
                  )}

                  {/* Glowing custom light filter badge */}
                  <div 
                    className={`absolute bottom-16 right-6 w-3 h-3 rounded-full bg-[#5CE1E6] pointer-events-none transition-all duration-700 shadow-[0_0_15px_rgba(92,225,230,1)] ${
                      indigoFlowerHovered ? "scale-[1.5] bg-[#FF3B30] shadow-[0_0_15px_rgba(255,59,48,1)]" : "scale-100"
                    }`}
                  ></div>

                  {/* Aesthetic signature label */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[9px] font-mono tracking-widest text-[#5CE1E6]/80 bg-black/55 backdrop-blur-md py-1.5 px-3 rounded-lg border border-[#5CE1E6]/10 uppercase select-none">
                    <span>📺 RETRO ANALOG LENS</span>
                    <span>Preset: {indigoActivePreset}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT HALF: ROMANTIC DISCOVERY & INTERACTIVE TUNER PANEL */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 py-1 px-3.5 bg-[#5CE1E6]/10 hover:bg-[#5CE1E6]/20 border border-[#5CE1E6]/20 text-[#5CE1E6] text-[9.5px] font-mono tracking-widest rounded-full uppercase leading-none select-none">
                  <Flame className="w-3 h-3 text-[#5CE1E6] fill-[#5CE1E6]" />
                  Gudiya's Lo-Fi Aesthetic Tape
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl font-extralight text-white tracking-tight leading-tight">
                  The Retro <span className="italic text-[#5CE1E6] font-normal">Indigo</span> Dream
                </h3>
                
                <div className="h-[1px] w-20 bg-[#5CE1E6]/40"></div>
              </div>

              {/* Poetic description parsing visual cues */}
              <p className="font-serif italic text-sm md:text-[15px] text-stone-300 leading-relaxed font-light">
                "In the soft desaturated indigo glow, her arms lift gracefully as she styles her silky dark hair. A sleek glowing neon cyan line cuts the soft-focus shadows, painting her profile in a modern lo-fi vintage frame. In this analog dream of mine, her cozy silence is my ultimate comfort, my beautiful queen Babita."
              </p>

              {/* INTERACTIVE CONTROLLER STUDIO BOX */}
              <div className="bg-[#111425] rounded-2xl p-5 border border-[#20253B] space-y-4 shadow-inner">
                <span className="block font-mono text-[9px] tracking-widest text-[#5CE1E6] font-bold uppercase select-none">
                  🎛️ COZY VHS ANALOG CALIBRATION DECK
                </span>

                {/* Preset Fast Select Buttons */}
                <div className="flex flex-wrap gap-2 pt-1 font-mono">
                  {[
                    { id: "pure", label: "Pure (Original)" },
                    { id: "dreamy", label: "Cozy Bloom ✨" },
                    { id: "vhs_retro", label: "CRT VHS Tape 🎞️" },
                    { id: "cyber", label: "Cyber Neon ⚡" }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyIndigoPreset(preset.id)}
                      className={`py-1.5 px-3 rounded-lg text-[10px] tracking-wider transition-all cursor-pointer ${
                        indigoActivePreset === preset.id
                          ? "bg-[#5CE1E6] text-[#0A0D16] font-bold shadow-md"
                          : "bg-black/35 text-[#5CE1E6] hover:bg-black/55 border border-[#5CE1E6]/10"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Fine Tuning Custom Range Sliders */}
                <div className="space-y-3 pt-2 text-stone-300">
                  {/* Bloom control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Bloom Glow Depth (Blur)</span>
                      <span className="text-[#5CE1E6]">{indigoBloomValue} px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="3" 
                      step="0.1" 
                      value={indigoBloomValue} 
                      onChange={(e) => {
                        setIndigoBloomValue(parseFloat(e.target.value));
                        setIndigoActivePreset("custom");
                      }}
                      className="w-full accent-[#5CE1E6] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Vignette control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Vignette Darkness (Edges)</span>
                      <span className="text-[#5CE1E6]">{Math.round(indigoVignetteValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={indigoVignetteValue} 
                      onChange={(e) => {
                        setIndigoVignetteValue(parseFloat(e.target.value));
                        setIndigoActivePreset("custom");
                      }}
                      className="w-full accent-[#5CE1E6] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Noise Weight control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Film Grain Density (Analog Static Noise)</span>
                      <span className="text-[#5CE1E6]">{Math.round(indigoGrainValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="0.6" 
                      step="0.02" 
                      value={indigoGrainValue} 
                      onChange={(e) => {
                        setIndigoGrainValue(parseFloat(e.target.value));
                        setIndigoActivePreset("custom");
                      }}
                      className="w-full accent-[#5CE1E6] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* CRT Scanline opacity */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>CRT Scanline Intensity</span>
                      <span className="text-[#5CE1E6]">{Math.round(indigoScanlineValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="0.5" 
                      step="0.02" 
                      value={indigoScanlineValue} 
                      onChange={(e) => {
                        setIndigoScanlineValue(parseFloat(e.target.value));
                        setIndigoActivePreset("custom");
                      }}
                      className="w-full accent-[#5CE1E6] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Chromatic Aberration Shift */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Chromatic Color Fringe Shift (RGB Out-of-sync)</span>
                      <span className="text-[#5CE1E6]">{indigoChromaShift} px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="8" 
                      step="0.5" 
                      value={indigoChromaShift} 
                      onChange={(e) => {
                        setIndigoChromaShift(parseFloat(e.target.value));
                        setIndigoActivePreset("custom");
                      }}
                      className="w-full accent-[#5CE1E6] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Angle Tilt control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Cinematic Photo Rotation (Tilt Axis)</span>
                      <span className="text-[#5CE1E6]">{indigoAngleTilt} deg</span>
                    </div>
                    <input 
                      type="range" 
                      min="-20" 
                      max="20" 
                      step="1" 
                      value={indigoAngleTilt} 
                      onChange={(e) => setIndigoAngleTilt(parseInt(e.target.value))}
                      className="w-full accent-[#5CE1E6] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* WATER & TUNE ANALOG SIGNAL BUTTON */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <button
                  onClick={() => {
                    setIndigoHearts(prev => prev + 1);
                    setShowIndigoWaterSuccess(true);
                    setTimeout(() => setShowIndigoWaterSuccess(false), 3200);
                  }}
                  className="flex-1 py-3.5 px-6 bg-gradient-to-r from-[#5CE1E6] to-[#00F2FE] hover:from-[#00F2FE] hover:to-[#5CE1E6] text-[#0A0D16] text-xs font-mono tracking-widest uppercase font-bold rounded-xl shadow-[0_8px_25px_rgba(92,225,230,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 border border-[#5CE1E6]/30"
                >
                  <Heart className="w-4 h-4 fill-[#0A0D16] animate-pulse" />
                  WATER &amp; TRANSMIT LOVE WAVES
                </button>

                <div className="bg-black/25 py-2 px-4 rounded-xl border border-white/5 text-center flex flex-col justify-center shrink-0 min-w-[100px] select-none">
                  <span className="text-[9px] font-mono uppercase text-stone-400">Cyber Waves</span>
                  <span className="text-sm font-sans tracking-tight text-[#5CE1E6] font-bold">{indigoHearts} ⚡</span>
                </div>
              </div>

              {/* WATER SUCCESS CONFIRMATION MSG */}
              {showIndigoWaterSuccess && (
                <div className="text-[11px] font-serif italic text-[#5CE1E6] bg-[#5CE1E6]/10 p-3 rounded-xl border border-[#5CE1E6]/20 animate-fade-in text-center lg:text-left flex items-center justify-center lg:justify-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#5CE1E6] animate-spin-slow" />
                  <span>Calibrated with endless romantic frequencies! Her retro CRT portrait glowed cleanly. Transmitting sweet code signals! ⚡📡💞</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2026 SPECIAL SPOTLIGHT 4: THE VIOLET INFINITY MUSE */}
        <div id="violet-spotlight-card" className="mb-16 bg-[#120321] rounded-[32px] p-6 lg:p-12 border border-[#2D124D]/60 shadow-[0_24px_55px_rgba(18,3,33,0.45)] relative overflow-hidden text-left text-stone-200">
          {/* Glowing bottom intense light-source simulation to mimic image */}
          {violetGlowValue > 0 && (
            <div 
              className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full blur-[45px] pointer-events-none mix-blend-screen transition-all duration-300"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(168,85,247,0.85) 55%, rgba(0,0,0,0) 100%)",
                opacity: violetGlowValue
              }}
            />
          )}

          {/* Radial bg lights */}
          <div className="absolute top-0 right-0 w-[260px] h-[260px] bg-gradient-radial from-[#F472B6]/10 to-transparent pointer-events-none rounded-full blur-3xl"></div>
          <div className="absolute top-10 left-10 w-[240px] h-[240px] bg-gradient-radial from-[#A855F7]/10 to-transparent pointer-events-none rounded-full blur-3xl"></div>

          {/* SVG Noise Generator Filter */}
          <svg className="absolute w-0 h-0 pointer-events-none">
            <defs>
              <filter id="violet-grainy-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.70" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.19 0" />
                <feComposite operator="in" in2="SourceGraphic" />
              </filter>
            </defs>
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* LEFT HALF: THE PORTRAIT CRT VIEWPORT */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div 
                className="relative aspect-[3/4] w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#1B0C2B] p-2 border border-[#3E1D5B] shadow-2xl group transition-all duration-500 hover:scale-[1.015]"
                onMouseEnter={() => setVioletFlowerHovered(true)}
                onMouseLeave={() => setVioletFlowerHovered(false)}
              >
                {/* Real-time filters viewport container */}
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-[#120321]">
                  {/* The actual photo of Babita from the user's fourth link */}
                  <img 
                    src="https://img.sanishtech.com/u/67f3e497b9f76a7a232cb70a2ed4f8d7.jpeg" 
                    alt="Babita Violet Infinity Portrait" 
                    className="w-full h-full object-cover select-none transition-all duration-300"
                    style={{
                      filter: `brightness(1.05) contrast(1.0) saturate(1.1) blur(${violetBloomValue}px)`,
                      transform: `scale(1.1) rotate(${violetAngleTilt}deg)`
                    }}
                    referrerPolicy="no-referrer"
                  />

                  {/* Intense Bottom White-Pink Glow Layer */}
                  {violetGlowValue > 0 && (
                    <div 
                      className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[70%] h-[35%] rounded-full blur-[25px] pointer-events-none mix-blend-screen transition-all duration-300"
                      style={{
                        background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(244,114,182,0.8) 60%, rgba(0,0,0,0) 100%)",
                        opacity: violetGlowValue * 0.95
                      }}
                    />
                  )}

                  {/* Micro-simulation option for photographic Noise filter overlay */}
                  {violetGrainValue > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-overlay"
                      style={{ 
                        filter: "url(#violet-grainy-noise)", 
                        opacity: violetGrainValue 
                      }}
                    />
                  )}

                  {/* Vignette Gradiation layer */}
                  {violetVignetteValue > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{ 
                        background: "radial-gradient(circle, transparent 40%, rgba(18,3,33,0.95) 100%)",
                        opacity: violetVignetteValue 
                      }}
                    />
                  )}

                  {/* Infinity Symbol Pendant Badge Floating on her collarbone area */}
                  <div 
                    className={`absolute bottom-[28%] left-[45%] translate-x-[-50%] flex flex-col items-center pointer-events-none transition-all duration-700 ease-out select-none ${
                      violetFlowerHovered ? "scale-[1.3] text-[#F472B6]" : "scale-100 text-white"
                    }`}
                  >
                    <span className="text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.85)] font-sans">∞</span>
                    <span className="text-[7px] tracking-widest font-mono text-white/60 uppercase">Infinite Bond</span>
                  </div>

                  {/* Aesthetic signature label */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[9px] font-mono tracking-widest text-[#F472B6]/80 bg-black/60 backdrop-blur-md py-1.5 px-3 rounded-lg border border-[#A855F7]/20 uppercase select-none">
                    <span>👑 Babita Gudiya</span>
                    <span>Preset: {violetActivePreset}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT HALF: ROMANTIC DISCOVERY & INTERACTIVE TUNER PANEL */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 py-1 px-3.5 bg-[#A855F7]/10 hover:bg-[#A855F7]/20 border border-[#A855F7]/20 text-[#D946EF] text-[9.5px] font-mono tracking-widest rounded-full uppercase leading-none select-none">
                  <Infinity className="w-3   h-3 text-[#D946EF]" />
                  Gudiya's Purple Infinity Loop
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl font-extralight text-white tracking-tight leading-tight">
                  The Violet <span className="italic text-[#D946EF] font-normal">Infinite</span> Glow
                </h3>
                
                <div className="h-[1px] w-20 bg-[#D946EF]/40"></div>
              </div>

              {/* Poetic description parsing visual cues */}
              <p className="font-serif italic text-sm md:text-[15px] text-stone-300 leading-relaxed font-light">
                "As she styles her hair in the soft-focus magenta shadows, an ambient crimson-violet wash paints her delicate profile. Ringing around her collarbone is a beautiful silver infinity pendant—a pure emblem of our eternal bond. The bright glow shining from below highlights her sweet grace, telling a timeless story of infinite adoration. You are my forever infinity, Gudiya."
              </p>

              {/* INTERACTIVE CONTROLLER STUDIO BOX */}
              <div className="bg-[#19092B] rounded-2xl p-5 border border-[#3A145C] space-y-4 shadow-inner">
                <span className="block font-mono text-[9px] tracking-widest text-[#D946EF] font-bold uppercase select-none">
                  🎛️ NOCTURNAL LED CALIBRATION DECK
                </span>

                {/* Preset Fast Select Buttons */}
                <div className="flex flex-wrap gap-2 pt-1 font-mono">
                  {[
                    { id: "pure", label: "Pure (Original)" },
                    { id: "neon_dream", label: "Neon Dream ✨" },
                    { id: "intimate_glow", label: "Midnight Glow 🕯️" },
                    { id: "vivid_pop", label: "Vivid Magenta ⚡" }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyVioletPreset(preset.id)}
                      className={`py-1.5 px-3 rounded-lg text-[10px] tracking-wider transition-all cursor-pointer ${
                        violetActivePreset === preset.id
                          ? "bg-[#D946EF] text-[#120321] font-bold shadow-md"
                          : "bg-black/35 text-[#D946EF] hover:bg-black/55 border border-[#D946EF]/10"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Fine Tuning Custom Range Sliders */}
                <div className="space-y-3 pt-2 text-stone-300">
                  {/* Bloom control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Bloom Glow Depth (Blur)</span>
                      <span className="text-[#D946EF]">{violetBloomValue} px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="3" 
                      step="0.1" 
                      value={violetBloomValue} 
                      onChange={(e) => {
                        setVioletBloomValue(parseFloat(e.target.value));
                        setVioletActivePreset("custom");
                      }}
                      className="w-full accent-[#D946EF] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Vignette control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Vignette Darkness (Edges)</span>
                      <span className="text-[#D946EF]">{Math.round(violetVignetteValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={violetVignetteValue} 
                      onChange={(e) => {
                        setVioletVignetteValue(parseFloat(e.target.value));
                        setVioletActivePreset("custom");
                      }}
                      className="w-full accent-[#D946EF] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Noise Weight control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Film Grain Density (Nocturnal Noise)</span>
                      <span className="text-[#D946EF]">{Math.round(violetGrainValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="0.6" 
                      step="0.02" 
                      value={violetGrainValue} 
                      onChange={(e) => {
                        setVioletGrainValue(parseFloat(e.target.value));
                        setVioletActivePreset("custom");
                      }}
                      className="w-full accent-[#D946EF] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Blown-out Bottom Glow intensity */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Bottom Luminous LED Light Intensity</span>
                      <span className="text-[#D946EF]">{Math.round(violetGlowValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={violetGlowValue} 
                      onChange={(e) => {
                        setVioletGlowValue(parseFloat(e.target.value));
                        setVioletActivePreset("custom");
                      }}
                      className="w-full accent-[#D946EF] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Angle Tilt control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Cinematic Photo Rotation (Tilt Axis)</span>
                      <span className="text-[#D946EF]">{violetAngleTilt} deg</span>
                    </div>
                    <input 
                      type="range" 
                      min="-20" 
                      max="20" 
                      step="1" 
                      value={violetAngleTilt} 
                      onChange={(e) => setVioletAngleTilt(parseInt(e.target.value))}
                      className="w-full accent-[#D946EF] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* WATER & FLOWER HEART LAUNCHER BUTTON */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <button
                  onClick={() => {
                    setVioletHearts(prev => prev + 1);
                    setShowVioletWaterSuccess(true);
                    setTimeout(() => setShowVioletWaterSuccess(false), 3200);
                  }}
                  className="flex-1 py-3.5 px-6 bg-gradient-to-r from-[#D946EF] to-[#A855F7] hover:from-[#A855F7] hover:to-[#D946EF] text-white text-xs font-mono tracking-widest uppercase font-bold rounded-xl shadow-[0_8px_25px_rgba(217,70,239,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 border border-white/10"
                >
                  <Heart className="w-4 h-4 fill-white animate-pulse" />
                  WATER &amp; SEND INFINITE HEARTS
                </button>

                <div className="bg-black/25 py-2 px-4 rounded-xl border border-white/5 text-center flex flex-col justify-center shrink-0 min-w-[100px] select-none">
                  <span className="text-[9px] font-mono uppercase text-stone-400">Infinity Loop</span>
                  <span className="text-sm font-sans tracking-tight text-[#D946EF] font-bold">{violetHearts} $\infty$</span>
                </div>
              </div>

              {/* WATER SUCCESS CONFIRMATION MSG */}
              {showVioletWaterSuccess && (
                <div className="text-[11px] font-serif italic text-[#D946EF] bg-[#D946EF]/10 p-3 rounded-xl border border-[#D946EF]/20 animate-fade-in text-center lg:text-left flex items-center justify-center lg:justify-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D946EF] animate-spin-slow" />
                  <span>Nurtured with eternal energy! Her glowing infinity symbol shone with intense pink light. Floating particles sent! 💖🔮♾️</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2026 SPECIAL SPOTLIGHT 5: THE CYBER MAGENTA SCRIBBLE MUSE */}
        <div id="magenta-scribble-spotlight-card" className="mb-16 bg-[#0C051A] rounded-[32px] p-6 lg:p-12 border border-[#25123E]/60 shadow-[0_24px_55px_rgba(12,5,26,0.5)] relative overflow-hidden text-left text-stone-200">
          {/* Intense bottom ambient glow to replicate the source image key highlights */}
          {magentaGlowValue > 0 && (
            <div 
              className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full blur-[45px] pointer-events-none mix-blend-screen transition-all duration-300"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,51,168,0.85) 55%, rgba(0,0,0,0) 100%)",
                opacity: magentaGlowValue
              }}
            />
          )}

          {/* Duotone Pink/Indigo radial decorations */}
          <div className="absolute top-0 right-0 w-[280px] h-[280px] bg-gradient-radial from-[#FF33A8]/10 to-transparent pointer-events-none rounded-full blur-3xl"></div>
          <div className="absolute -left-10 top-1/3 w-[250px] h-[250px] bg-gradient-radial from-[#8A2BE2]/10 to-transparent pointer-events-none rounded-full blur-3xl"></div>

          {/* SVG Grainy Noise Generator Filter */}
          <svg className="absolute w-0 h-0 pointer-events-none">
            <defs>
              <filter id="magenta-grainy-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.22 0" />
                <feComposite operator="in" in2="SourceGraphic" />
              </filter>
            </defs>
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* LEFT HALF: THE INTERACTIVE GRAPHIC VIEWPORT */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div 
                className="relative aspect-[3/4] w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#1B0A26] p-2 border border-[#3E1A5B] shadow-2xl group transition-all duration-500 hover:scale-[1.015]"
                onMouseEnter={() => setMagentaFlowerHovered(true)}
                onMouseLeave={() => setMagentaFlowerHovered(false)}
              >
                {/* Visual Signal Viewport Wrapper */}
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-black">
                  {/* Master Graphic Input Portrait */}
                  <img 
                    src="https://img.sanishtech.com/u/6a386c4d249e9cccee94cfd1583a5851.jpeg" 
                    alt="Babita Cyber Scribble Portrait" 
                    className="w-full h-full object-cover select-none transition-all duration-300"
                    style={{
                      filter: `brightness(1.05) contrast(1.0) saturate(1.15) blur(${magentaBloomValue}px)`,
                      transform: `scale(1.1) rotate(${magentaAngleTilt}deg)`
                    }}
                    referrerPolicy="no-referrer"
                  />

                  {/* Cyber Luminous bottom-center glow leaking upward */}
                  {magentaGlowValue > 0 && (
                    <div 
                      className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[75%] h-[35%] rounded-full blur-[25px] pointer-events-none mix-blend-screen transition-all duration-300"
                      style={{
                        background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,51,168,0.85) 60%, rgba(0,0,0,0) 100%)",
                        opacity: magentaGlowValue * 0.95
                      }}
                    />
                  )}

                  {/* Analog film grain static overlay */}
                  {magentaGrainValue > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-overlay"
                      style={{ 
                        filter: "url(#magenta-grainy-noise)", 
                        opacity: magentaGrainValue 
                      }}
                    />
                  )}

                  {/* Vignette edge shadows */}
                  {magentaVignetteValue > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{ 
                        background: "radial-gradient(circle, transparent 40%, rgba(12,5,26,0.96) 100%)",
                        opacity: magentaVignetteValue 
                      }}
                    />
                  )}

                  {/* STYLISH HAND-DRAWN CRAYON/BRUSH SCRIBBLE OVERLAY OVER HEART/EYE AREA */}
                  {magentaScribbleOpacity > 0 && (
                    <div 
                      className="absolute top-[38%] left-1/2 -translate-x-1/2 w-[72%] h-[15%] pointer-events-none transition-all duration-500 ease-out select-none flex items-center justify-center"
                      style={{ 
                        opacity: magentaScribbleOpacity,
                        transform: `rotate(${-magentaAngleTilt * 0.6}deg)`
                      }}
                    >
                      {/* SVG Rough Grunge Crayon Stroke */}
                      <svg viewBox="0 0 200 40" className="w-full h-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                        <path 
                          d="M10,18 C30,12 50,22 70,14 C90,16 110,24 130,12 C150,18 170,12 190,20 M15,22 C35,16 60,26 80,18 C105,20 120,28 145,16 C165,22 180,15 195,24 M5,26 C40,18 70,30 110,22 C140,24 160,32 185,22 M25,14 C55,10 85,18 115,12 C145,15 165,11 185,17"
                          fill="none" 
                          stroke={magentaScribbleColor} 
                          strokeWidth="3.2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="opacity-95"
                        />
                        {/* Dynamic heart icon drawn dynamically inside the scribble */}
                        <path 
                          d="M100,5 C95,0 85,0 80,5 C75,10 80,20 100,32 C120,20 125,10 120,5 C115,0 105,0 100,5 Z"
                          fill="none" 
                          stroke={magentaScribbleColor} 
                          strokeWidth="1.5" 
                          strokeDasharray="3,3"
                          className="opacity-70"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Micro spark particles floating */}
                  <div className={`absolute top-12 left-12 text-sm pointer-events-none transition-all duration-1000 ${
                    magentaFlowerHovered ? "scale-150 rotate-45 text-[#FF33A8]" : "scale-100 text-[#FF33A8]/40"
                  }`}>✦</div>
                  <div className={`absolute bottom-20 right-12 text-lg pointer-events-none transition-all duration-1000 ${
                    magentaFlowerHovered ? "scale-150 -rotate-12 text-white" : "scale-100 text-white/20"
                  }`}>✦</div>

                  {/* Aesthetic signature label */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[9px] font-mono tracking-widest text-[#FF33A8]/80 bg-black/60 backdrop-blur-md py-1.5 px-3 rounded-lg border border-[#FF33A8]/25 uppercase select-none">
                    <span>👑 GRUNGE STREET ART</span>
                    <span>Preset: {magentaActivePreset}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT HALF: ROMANTIC DISCOVERY & INTERACTIVE STUDIO PANEL */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 py-1 px-3.5 bg-[#FF33A8]/10 hover:bg-[#FF33A8]/20 border border-[#FF33A8]/20 text-[#FF33A8] text-[9.5px] font-mono tracking-widest rounded-full uppercase leading-none select-none">
                  <span className="w-2 h-2 rounded-full bg-[#FF33A8] animate-ping"></span>
                  Gudiya's Cyberpunk Rebellion Accent
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl font-extralight text-white tracking-tight leading-tight">
                  The Cyber <span className="italic text-[#FF33A8] font-normal">Scribble</span> Nocturne
                </h3>
                
                <div className="h-[1px] w-20 bg-[#FF33A8]/40"></div>
              </div>

              {/* Poetic description parsing visual cues */}
              <p className="font-serif italic text-sm md:text-[15px] text-stone-300 leading-relaxed font-light">
                "Washed in rich duotone hot magenta lights and deep indigo shadows, her silhouette is immortalized in a gorgeous late-night aesthetic. A bold street-art style scribble sweeps gracefully over her frame—a beautifully messy representation of a mind completely colored by her presence. Her hands guide her soft dark hair, making this rebellious urban canvas my favorite portrait in our dream."
              </p>

              {/* INTERACTIVE CONTROLLER STUDIO BOX */}
              <div className="bg-[#180B26] rounded-2xl p-5 border border-[#3E1B5C] space-y-4 shadow-inner">
                <span className="block font-mono text-[9px] tracking-widest text-[#FF33A8] font-bold uppercase select-none">
                  🎛️ CYBER GRUNGE ART CALIBRATION BAY
                </span>

                {/* Preset Fast Select Buttons */}
                <div className="flex flex-wrap gap-2 pt-1 font-mono">
                  {[
                    { id: "pure", label: "Pure (Original Photo)" },
                    { id: "cyber_haze", label: "Cyber Haze ✨" },
                    { id: "raw_grunge", label: "Street Grunge 🎞️" },
                    { id: "soft_glow", label: "Diffused Ambient 🕯️" }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyMagentaPreset(preset.id)}
                      className={`py-1.5 px-3 rounded-lg text-[10px] tracking-wider transition-all cursor-pointer ${
                        magentaActivePreset === preset.id
                          ? "bg-[#FF33A8] text-white font-bold shadow-md"
                          : "bg-black/35 text-[#FF33A8] hover:bg-black/55 border border-[#FF33A8]/10"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Brush Crayon Scribble Color Swatches */}
                <div className="space-y-1.5">
                  <span className="block text-[9px] font-mono uppercase text-stone-400 select-none">Scribble Stroke Hue</span>
                  <div className="flex gap-2.5">
                    {[
                      { hex: "#FFFFFF", name: "Pure White" },
                      { hex: "#FF33A8", name: "Hot Magenta" },
                      { hex: "#5CE1E6", name: "Cyber Cyan" },
                      { hex: "#FFA000", name: "Warm Gold" }
                    ].map((item) => (
                      <button
                        key={item.hex}
                        onClick={() => setMagentaScribbleColor(item.hex)}
                        title={item.name}
                        className={`w-6 h-6 rounded-full border cursor-pointer transition-all ${
                          magentaScribbleColor === item.hex 
                            ? "ring-2 ring-white scale-110 border-transparent shadow-md" 
                            : "border-white/20 hover:scale-105"
                        }`}
                        style={{ backgroundColor: item.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Fine Tuning Custom Range Sliders */}
                <div className="space-y-3 pt-2 text-stone-300">
                  {/* Bloom control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Bloom Blur Depth</span>
                      <span className="text-[#FF33A8]">{magentaBloomValue} px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="3" 
                      step="0.1" 
                      value={magentaBloomValue} 
                      onChange={(e) => {
                        setMagentaBloomValue(parseFloat(e.target.value));
                        setMagentaActivePreset("custom");
                      }}
                      className="w-full accent-[#FF33A8] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Vignette control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Vignette Edge Darkness</span>
                      <span className="text-[#FF33A8]">{Math.round(magentaVignetteValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={magentaVignetteValue} 
                      onChange={(e) => {
                        setMagentaVignetteValue(parseFloat(e.target.value));
                        setMagentaActivePreset("custom");
                      }}
                      className="w-full accent-[#FF33A8] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Noise Weight control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Film Grain Density (ISO Noise)</span>
                      <span className="text-[#FF33A8]">{Math.round(magentaGrainValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="0.6" 
                      step="0.02" 
                      value={magentaGrainValue} 
                      onChange={(e) => {
                        setMagentaGrainValue(parseFloat(e.target.value));
                        setMagentaActivePreset("custom");
                      }}
                      className="w-full accent-[#FF33A8] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Crayon Scribble Opacity */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Crayon Scribble Opacity</span>
                      <span className="text-[#FF33A8]">{Math.round(magentaScribbleOpacity * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={magentaScribbleOpacity} 
                      onChange={(e) => {
                        setMagentaScribbleOpacity(parseFloat(e.target.value));
                        setMagentaActivePreset("custom");
                      }}
                      className="w-full accent-[#FF33A8] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Luminous Glow strength */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Key Luminous Glow Intensity</span>
                      <span className="text-[#FF33A8]">{Math.round(magentaGlowValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={magentaGlowValue} 
                      onChange={(e) => {
                        setMagentaGlowValue(parseFloat(e.target.value));
                        setMagentaActivePreset("custom");
                      }}
                      className="w-full accent-[#FF33A8] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Angle Tilt control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Cinematic Photo Rotation (Tilt Axis)</span>
                      <span className="text-[#FF33A8]">{magentaAngleTilt} deg</span>
                    </div>
                    <input 
                      type="range" 
                      min="-20" 
                      max="20" 
                      step="1" 
                      value={magentaAngleTilt} 
                      onChange={(e) => setMagentaAngleTilt(parseInt(e.target.value))}
                      className="w-full accent-[#FF33A8] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* WATER & FLASH CYBER WAVES BUTTON */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <button
                  onClick={() => {
                    setMagentaHearts(prev => prev + 1);
                    setShowMagentaWaterSuccess(true);
                    setTimeout(() => setShowMagentaWaterSuccess(false), 3200);
                  }}
                  className="flex-1 py-3.5 px-6 bg-gradient-to-r from-[#FF33A8] to-[#E91E63] hover:from-[#E91E63] hover:to-[#FF33A8] text-white text-xs font-mono tracking-widest uppercase font-bold rounded-xl shadow-[0_8px_25px_rgba(255,51,168,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 border border-white/10"
                >
                  <Heart className="w-4 h-4 fill-white animate-pulse" />
                  WATER &amp; TRANSMIT CYBER PULSES
                </button>

                <div className="bg-black/25 py-2 px-4 rounded-xl border border-white/5 text-center flex flex-col justify-center shrink-0 min-w-[100px] select-none">
                  <span className="text-[9px] font-mono uppercase text-stone-400">Neon Spark</span>
                  <span className="text-sm font-sans tracking-tight text-[#FF33A8] font-bold">{magentaHearts} ⚡</span>
                </div>
              </div>

              {/* WATER SUCCESS CONFIRMATION MSG */}
              {showMagentaWaterSuccess && (
                <div className="text-[11px] font-serif italic text-[#FF33A8] bg-[#FF33A8]/10 p-3 rounded-xl border border-[#FF33A8]/20 animate-fade-in text-center lg:text-left flex items-center justify-center lg:justify-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF33A8] animate-spin-slow" />
                  <span>Emitted high-density love streams! The cyber scribble glowed with beautiful intense neon coloring! Transmitting sweet messages! ⚡💖🎨</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2026 SPECIAL SPOTLIGHT 6: THE TEAL RETRO STAR DITHERED MUSE */}
        <div id="teal-stars-spotlight-card" className="mb-16 bg-[#162A20] rounded-[32px] p-6 lg:p-12 border border-[#2A453A]/50 shadow-[0_24px_55px_rgba(22,42,32,0.45)] relative overflow-hidden text-left text-stone-200">
          {/* Glowing central camera flash highlight simulation to replicate direct flash look */}
          {tealFlashHighlight > 0 && (
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full blur-[60px] pointer-events-none mix-blend-screen transition-all duration-300"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(90,140,133,0.4) 65%, rgba(0,0,0,0) 100%)",
                opacity: tealFlashHighlight * 0.45
              }}
            />
          )}

          {/* Indigo/Teal corner ambient background glows */}
          <div className="absolute top-0 right-0 w-[260px] h-[260px] bg-gradient-radial from-[#5A8C85]/20 to-transparent pointer-events-none rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-[240px] h-[240px] bg-gradient-radial from-[#1B2A24]/40 to-transparent pointer-events-none rounded-full blur-3xl"></div>

          {/* SVG Grainy Noise Generator Filter */}
          <svg className="absolute w-0 h-0 pointer-events-none">
            <defs>
              <filter id="teal-grainy-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0" />
                <feComposite operator="in" in2="SourceGraphic" />
              </filter>
              
              {/* Retro ASCII/Crosshatch star dither fill pattern */}
              <pattern id="retro-star-dither-pattern" width="6" height="6" patternUnits="userSpaceOnUse">
                <path d="M 3 0 L 3 6 M 0 3 L 6 3" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* LEFT HALF: THE DETAILED CAMERA VIEWFINDER WITH RETRO STAR GRAPHICS */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div 
                className="relative aspect-[3/4] w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#101F18] p-2 border border-[#2D453A] shadow-2xl group transition-all duration-500 hover:scale-[1.015]"
                onMouseEnter={() => setTealFlowerHovered(true)}
                onMouseLeave={() => setTealFlowerHovered(false)}
              >
                {/* Visual Viewport Wrapper */}
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-black">
                  {/* Portrait of Babita (Indie Sleaze Retro Star) */}
                  <img 
                    src="https://img.sanishtech.com/u/38b0883b2b0a68a085b25b0e5b8f7a8a.jpeg" 
                    alt="Babita Retro Teal Star Portrait" 
                    className="w-full h-full object-cover select-none transition-all duration-300"
                    style={{
                      filter: `brightness(${1.0 + tealFlashHighlight * 0.12}) contrast(1.1) saturate(0.9) blur(${tealBloomValue}px)`,
                      transform: `scale(1.1) rotate(${tealAngleTilt}deg)`
                    }}
                    referrerPolicy="no-referrer"
                  />

                  {/* Direct Camera Flash highlight layer - harsh central hot-spot */}
                  {tealFlashHighlight > 0 && (
                    <div 
                      className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[55%] h-[40%] rounded-full blur-[20px] pointer-events-none mix-blend-overlay transition-all duration-300"
                      style={{
                        background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(90,140,133,0.5) 70%, rgba(0,0,0,0) 100%)",
                        opacity: tealFlashHighlight * 0.75
                      }}
                    />
                  )}

                  {/* Analog film grain static overlay */}
                  {tealGrainValue > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-overlay"
                      style={{ 
                        filter: "url(#teal-grainy-noise)", 
                        opacity: tealGrainValue 
                      }}
                    />
                  )}

                  {/* Vignette edge shadows */}
                  {tealVignetteValue > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{ 
                        background: "radial-gradient(circle, transparent 40%, rgba(16,32,24,0.98) 100%)",
                        opacity: tealVignetteValue 
                      }}
                    />
                  )}

                  {/* DITHERED RETRO STARS OVERLAY MAP (Jagged retro edges & ASCII cross-stitching filled) */}
                  {tealStarsOpacity > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out"
                      style={{ 
                        opacity: tealStarsOpacity,
                        color: tealStarsColor
                      }}
                    >
                      {/* Star 1: Top Right */}
                      {tealStarsCount >= 1 && (
                        <div 
                          className="absolute w-[36%] aspect-square top-[4%] right-[-3%] transition-all duration-1000"
                          style={{
                            transform: `rotate(${-12 + tealAngleTilt}deg) ${tealFlowerHovered ? "scale(1.15)" : "scale(1)"}`
                          }}
                        >
                          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                            <polygon 
                              points="50,5 62,38 95,50 62,62 50,95 38,62 5,50 38,38" 
                              fill="url(#retro-star-dither-pattern)" 
                              stroke="currentColor" 
                              strokeWidth="1.5" 
                              strokeDasharray="1.5"
                            />
                            {/* Inner pixel star shape */}
                            <polygon 
                              points="50,22 57,43 78,50 57,57 50,78 43,57 22,50 43,43" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="1"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Star 2: Mid Left */}
                      {tealStarsCount >= 2 && (
                        <div 
                          className="absolute w-[32%] aspect-square top-[24%] left-[-10%] transition-all duration-1000"
                          style={{
                            transform: `rotate(${25 - tealAngleTilt}deg) ${tealFlowerHovered ? "scale(1.15)" : "scale(1)"}`
                          }}
                        >
                          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                            <polygon 
                              points="50,5 62,38 95,50 62,62 50,95 38,62 5,50 38,38" 
                              fill="url(#retro-star-dither-pattern)" 
                              stroke="currentColor" 
                              strokeWidth="1.5" 
                              strokeDasharray="1.5"
                            />
                            <polygon 
                              points="50,22 57,43 78,50 57,57 50,78 43,57 22,50 43,43" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="1"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Star 3: Bottom Right */}
                      {tealStarsCount >= 3 && (
                        <div 
                          className="absolute w-[34%] aspect-square bottom-[8%] right-[-4%] transition-all duration-1000"
                          style={{
                            transform: `rotate(${15 + tealAngleTilt * 0.5}deg) ${tealFlowerHovered ? "scale(1.15)" : "scale(1)"}`
                          }}
                        >
                          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                            <polygon 
                              points="50,5 62,38 95,50 62,62 50,95 38,62 5,50 38,38" 
                              fill="url(#retro-star-dither-pattern)" 
                              stroke="currentColor" 
                              strokeWidth="1.5" 
                              strokeDasharray="1.5"
                            />
                            <polygon 
                              points="50,22 57,43 78,50 57,57 50,78 43,57 22,50 43,43" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="1"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Star 4: Center Floating Mini Star */}
                      {tealStarsCount >= 4 && (
                        <div className="absolute w-[14%] aspect-square top-[48%] left-[24%] animate-bounce">
                          <svg viewBox="0 0 100 100" className="w-full h-full text-[#5A8C85] filter drop-shadow-[0_0_5px_rgba(90,140,133,0.8)]">
                            <polygon points="50,5 62,38 95,50 62,62 50,95 38,62 5,50 38,38" fill="currentColor" />
                          </svg>
                        </div>
                      )}

                      {/* Star 5: Top Left Floating Mini Star */}
                      {tealStarsCount >= 5 && (
                        <div className="absolute w-[12%] aspect-square top-[12%] left-[30%] text-[#FFD1F5]">
                          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_5px_rgba(255,209,245,0.8)]">
                            <polygon points="50,5 62,38 95,50 62,62 50,95 38,62 5,50 38,38" fill="currentColor" />
                          </svg>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Soft camera direct shadow drop layer mimicking background flash shadow */}
                  <div className="absolute top-[32%] right-[10%] w-[10px] h-[45px] bg-black/45 blur-[5px] rounded-full pointer-events-none transform rotate-[8deg]"></div>

                  {/* Aesthetic signature labels */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[9px] font-mono tracking-widest text-[#5A8C85] bg-black/60 backdrop-blur-md py-1.5 px-3 rounded-lg border border-[#2D453A]/50 uppercase select-none">
                    <span>👑 INDIE SLEAZE PIXELS</span>
                    <span>Preset: {tealActivePreset}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT HALF: DETAILED CONTROLLER & ROMANTIC DESCRIPTION */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 py-1 px-3.5 bg-[#5A8C85]/15 hover:bg-[#5A8C85]/25 border border-[#5A8C85]/20 text-[#5A8C85] text-[9.5px] font-mono tracking-widest rounded-full uppercase leading-none select-none">
                  <Star className="w-3 h-3 text-[#5A8C85]" />
                  Y2K Analog Star Calibration Deck
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl font-extralight text-white tracking-tight leading-tight">
                  The Teal <span className="italic text-[#5A8C85] font-normal">Retro Star</span> Muse
                </h3>
                
                <div className="h-[1px] w-20 bg-[#5A8C85]/40"></div>
              </div>

              {/* Poetic description parsing visual cues */}
              <p className="font-serif italic text-sm md:text-[15px] text-stone-300 leading-relaxed font-light">
                "Framed in desaturated, vintage deep green and cold teal colorways, her portrait shine under a direct frontal flash. Layered star meshes dithered in elegant retro grid patterns float around her cute silhouette. This beautiful analog composition captures her pure, effortless beauty, reminding us of early internet nostalgia and eternal bonds. You are the star of my galaxy, Gudiya."
              </p>

              {/* INTERACTIVE CONTROLLER STUDIO BOX */}
              <div className="bg-[#11211A] rounded-2xl p-5 border border-[#234032] space-y-4 shadow-inner">
                <span className="block font-mono text-[9px] tracking-widest text-[#5A8C85] font-bold uppercase select-none">
                  🎛️ ANALOG FILM GRAPHIC CALIBRATION BAY
                </span>

                {/* Preset Fast Select Buttons */}
                <div className="flex flex-wrap gap-2 pt-1 font-mono">
                  {[
                    { id: "pure", label: "Pure Photo" },
                    { id: "indie_sleaze", label: "Indie Sleaze 🎞️" },
                    { id: "vintage_flash", label: "Harsh Flash ⚡" },
                    { id: "dither_retro", label: "Dithered Retro 👾" }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyTealPreset(preset.id)}
                      className={`py-1.5 px-3 rounded-lg text-[10px] tracking-wider transition-all cursor-pointer ${
                        tealActivePreset === preset.id
                          ? "bg-[#5A8C85] text-white font-bold shadow-md"
                          : "bg-black/35 text-[#5A8C85] hover:bg-black/55 border border-[#5A8C85]/10"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Star Overlay Count and Sliders */}
                <div className="grid grid-cols-2 gap-4 pb-1">
                  <div>
                    <span className="block text-[9px] font-mono uppercase text-stone-400 select-none mb-1">Stars Overlay Count</span>
                    <select
                      value={tealStarsCount}
                      onChange={(e) => setTealStarsCount(parseInt(e.target.value))}
                      className="w-full bg-black/45 border border-[#5A8C85]/20 text-[#5A8C85] text-xs font-mono rounded-lg p-1.5 outline-none cursor-pointer"
                    >
                      <option value="1">1 Star (Top-Right)</option>
                      <option value="2">2 Stars (Top + Left)</option>
                      <option value="3">3 Stars (Original Trio)</option>
                      <option value="4">4 Stars (+ Floating Base)</option>
                      <option value="5">5 Stars (Ultimate Starfield)</option>
                    </select>
                  </div>

                  <div>
                    <span className="block text-[9px] font-mono uppercase text-stone-400 select-none mb-1">Star Colorway</span>
                    <select
                      value={tealStarsColor}
                      onChange={(e) => setTealStarsColor(e.target.value)}
                      className="w-full bg-black/45 border border-[#5A8C85]/20 text-[#5A8C85] text-xs font-mono rounded-lg p-1.5 outline-none cursor-pointer"
                    >
                      <option value="#E5E8E6">Vintage Off-White (Original)</option>
                      <option value="#5A8C85">Sage/Teal Green</option>
                      <option value="#FF33A8">Hot Cyber Magenta</option>
                      <option value="#FFD1F5">Blown-out Rose Gold</option>
                    </select>
                  </div>
                </div>

                {/* Fine Tuning Custom Range Sliders */}
                <div className="space-y-3 pt-1 text-stone-300">
                  {/* Bloom control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Soft Focus Edge Blur (Depth)</span>
                      <span className="text-[#5A8C85]">{tealBloomValue} px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="3" 
                      step="0.1" 
                      value={tealBloomValue} 
                      onChange={(e) => {
                        setTealBloomValue(parseFloat(e.target.value));
                        setTealActivePreset("custom");
                      }}
                      className="w-full accent-[#5A8C85] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Vignette control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Vignette Edge Darkness</span>
                      <span className="text-[#5A8C85]">{Math.round(tealVignetteValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={tealVignetteValue} 
                      onChange={(e) => {
                        setTealVignetteValue(parseFloat(e.target.value));
                        setTealActivePreset("custom");
                      }}
                      className="w-full accent-[#5A8C85] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Noise Weight control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Analog Film Grain (Digital ISO Noise)</span>
                      <span className="text-[#5A8C85]">{Math.round(tealGrainValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="0.6" 
                      step="0.02" 
                      value={tealGrainValue} 
                      onChange={(e) => {
                        setTealGrainValue(parseFloat(e.target.value));
                        setTealActivePreset("custom");
                      }}
                      className="w-full accent-[#5A8C85] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Direct Camera Flash highlight */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Direct Camera Flash Power</span>
                      <span className="text-[#5A8C85]">{Math.round(tealFlashHighlight * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={tealFlashHighlight} 
                      onChange={(e) => {
                        setTealFlashHighlight(parseFloat(e.target.value));
                        setTealActivePreset("custom");
                      }}
                      className="w-full accent-[#5A8C85] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Star overlay opacity */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Dithered Stars Opacity</span>
                      <span className="text-[#5A8C85]">{Math.round(tealStarsOpacity * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={tealStarsOpacity} 
                      onChange={(e) => {
                        setTealStarsOpacity(parseFloat(e.target.value));
                        setTealActivePreset("custom");
                      }}
                      className="w-full accent-[#5A8C85] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Angle Tilt control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Cinematic Photo Rotation (Tilt Axis)</span>
                      <span className="text-[#5A8C85]">{tealAngleTilt} deg</span>
                    </div>
                    <input 
                      type="range" 
                      min="-20" 
                      max="20" 
                      step="1" 
                      value={tealAngleTilt} 
                      onChange={(e) => setTealAngleTilt(parseInt(e.target.value))}
                      className="w-full accent-[#5A8C85] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* WATER & FLASH STARS CO-CREATOR BUTTON */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <button
                  onClick={() => {
                    setTealHearts(prev => prev + 1);
                    setShowTealWaterSuccess(true);
                    setTimeout(() => setShowTealWaterSuccess(false), 3200);
                  }}
                  className="flex-1 py-3.5 px-6 bg-gradient-to-r from-[#5A8C85] to-[#2D453A] hover:from-[#2D453A] hover:to-[#5A8C85] text-white text-xs font-mono tracking-widest uppercase font-bold rounded-xl shadow-[0_8px_25px_rgba(90,140,133,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 border border-white/10"
                >
                  <Heart className="w-4 h-4 fill-white animate-pulse" />
                  WATER &amp; TRANSMIT ANALOG SPARKS
                </button>

                <div className="bg-black/25 py-2 px-4 rounded-xl border border-white/5 text-center flex flex-col justify-center shrink-0 min-w-[100px] select-none">
                  <span className="text-[9px] font-mono uppercase text-stone-400">Teal Sparks</span>
                  <span className="text-sm font-sans tracking-tight text-[#5A8C85] font-bold">{tealHearts} ⭐</span>
                </div>
              </div>

              {/* WATER SUCCESS CONFIRMATION MSG */}
              {showTealWaterSuccess && (
                <div className="text-[11px] font-serif italic text-[#5A8C85] bg-[#5A8C85]/10 p-3 rounded-xl border border-[#5A8C85]/20 animate-fade-in text-center lg:text-left flex items-center justify-center lg:justify-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#5A8C85] animate-spin-slow" />
                  <span>Emitted stars dither matrix! Retro flashes emitted lovely patterns! Sparks transmitted to her night! ⭐🕰️🌌</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2026 SPECIAL SPOTLIGHT 7: THE GOLDEN HOUR VINTAGE MUSE */}
        <div id="golden-hour-spotlight-card" className="mb-16 bg-[#1A1510] rounded-[32px] p-6 lg:p-12 border border-[#3E2F20]/60 shadow-[0_24px_55px_rgba(26,21,16,0.45)] relative overflow-hidden text-left text-stone-200">
          {/* Intense warm golden-glow key highlight simulation to mimic cozy sunset lighting */}
          {goldenGlowIntensity > 0 && (
            <div 
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full blur-[50px] pointer-events-none mix-blend-screen transition-all duration-300"
              style={{
                background: "radial-gradient(circle, rgba(245,229,201,0.9) 0%, rgba(214,158,105,0.7) 60%, rgba(0,0,0,0) 100%)",
                opacity: goldenGlowIntensity * 0.95
              }}
            />
          )}

          {/* Warm Amber corner ambient background light leaks */}
          <div className="absolute top-0 right-0 w-[280px] h-[280px] bg-gradient-radial from-[#D69E69]/15 to-transparent pointer-events-none rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 -left-10 w-[240px] h-[240px] bg-gradient-radial from-[#F5E5C9]/10 to-transparent pointer-events-none rounded-full blur-3xl"></div>

          {/* SVG Grainy Noise Generator Filter */}
          <svg className="absolute w-0 h-0 pointer-events-none">
            <defs>
              <filter id="golden-grainy-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.18 0" />
                <feComposite operator="in" in2="SourceGraphic" />
              </filter>
            </defs>
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* LEFT HALF: THE DETAILED CAMERA VIEWFINDER WITH SARIS TRIMS */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div 
                className="relative aspect-[3/4] w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#1D1712] p-2 border border-[#3E2F20] shadow-2xl group transition-all duration-500 hover:scale-[1.015]"
                onMouseEnter={() => setGoldenFlowerHovered(true)}
                onMouseLeave={() => setGoldenFlowerHovered(false)}
              >
                {/* Visual Viewport Wrapper */}
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-black">
                  {/* Portrait of Babita (Cozy Saree Golden Hour) */}
                  <img 
                    src="https://img.sanishtech.com/u/b88c13cf57284c67c5ee934f7c3eb6bb.jpeg" 
                    alt="Babita Saree Retro Golden Hour Portrait" 
                    className="w-full h-full object-cover select-none transition-all duration-300"
                    style={{
                      filter: `brightness(${1.0 + goldenGlowIntensity * 0.1}) contrast(0.95) saturate(1.15) sepia(0.1) blur(${goldenBloomValue}px)`,
                      transform: `scale(1.1) rotate(${goldenAngleTilt}deg)`
                    }}
                    referrerPolicy="no-referrer"
                  />

                  {/* Sunset bloom simulation layer */}
                  {goldenGlowIntensity > 0 && (
                    <div 
                      className="absolute bottom-[-10%] left-1/4 w-[70%] h-[35%] rounded-full blur-[30px] pointer-events-none mix-blend-screen transition-all duration-300"
                      style={{
                        background: "radial-gradient(circle, rgba(245,229,201,0.85) 0%, rgba(214,158,105,0.7) 65%, rgba(0,0,0,0) 100%)",
                        opacity: goldenGlowIntensity * 0.9
                      }}
                    />
                  )}

                  {/* Analog film grain static overlay */}
                  {goldenGrainValue > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-overlay"
                      style={{ 
                        filter: "url(#golden-grainy-noise)", 
                        opacity: goldenGrainValue 
                      }}
                    />
                  )}

                  {/* Vignette edge shadows */}
                  {goldenVignetteValue > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{ 
                        background: "radial-gradient(circle, transparent 40%, rgba(26,21,16,0.98) 100%)",
                        opacity: goldenVignetteValue 
                      }}
                    />
                  )}

                  {/* GEOMETRIC SARIS ZIG-ZAG BORDER DETAIL OVERLAY */}
                  {goldenZigZagBorder && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-4 transition-all duration-500 ease-out select-none"
                      style={{
                        backgroundColor: goldenSareeTrimColor,
                        opacity: 0.95,
                        clipPath: `polygon(
                          0% 100%, 100% 100%, 100% 0%, 
                          ${Array.from({ length: goldenZigZagScale }).map((_, i) => {
                            const step = 100 / goldenZigZagScale;
                            const x1 = (100 - i * step).toFixed(2);
                            const x2 = (100 - (i * step + step / 2)).toFixed(2);
                            return `${x1}% 100%, ${x2}% 0%`;
                          }).join(", ")}, 0% 0%
                        )`
                      }}
                    />
                  )}

                  {/* Floating fine stars / sun rays particle badges */}
                  <div className={`absolute top-8 right-8 text-xl pointer-events-none transition-all duration-1000 ${
                    goldenFlowerHovered ? "scale-150 rotate-90 text-[#F5E5C9]" : "scale-100 text-[#D69E69]/40"
                  }`}>✦</div>
                  <div className={`absolute bottom-16 left-8 text-sm pointer-events-none transition-all duration-1000 ${
                    goldenFlowerHovered ? "scale-150 -rotate-45 text-[#FAFAFA]" : "scale-100 text-[#FAFAFA]/20"
                  }`}>✦</div>

                  {/* Aesthetic signature labels */}
                  <div className="absolute bottom-6 left-4 right-4 flex items-center justify-between text-[9px] font-mono tracking-widest text-[#D69E69] bg-black/60 backdrop-blur-md py-1.5 px-3 rounded-lg border border-[#3E2F20]/50 uppercase select-none">
                    <span>👑 Saree Golden Hour</span>
                    <span>Preset: {goldenActivePreset}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT HALF: DETAILED CONTROLLER & ROMANTIC DESCRIPTION */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 py-1 px-3.5 bg-[#D69E69]/15 hover:bg-[#D69E69]/25 border border-[#D69E69]/20 text-[#D69E69] text-[9.5px] font-mono tracking-widest rounded-full uppercase leading-none select-none">
                  <Sun className="w-3   h-3 text-[#D69E69] animate-spin-slow" />
                  Golden Saree Glamour Deck
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl font-extralight text-white tracking-tight leading-tight">
                  The Saree <span className="italic text-[#D69E69] font-normal">Golden Hour</span> Muse
                </h3>
                
                <div className="h-[1px] w-20 bg-[#D69E69]/40"></div>
              </div>

              {/* Poetic description parsing visual cues */}
              <p className="font-serif italic text-sm md:text-[15px] text-stone-300 leading-relaxed font-light">
                "Draped in absolute cultural grace, she sits framed by warm late-afternoon sun rays. The beautiful geometric patterns along her saree contrast perfectly with her sweet face, highlighted beautifully with silver bracelets and direct glowing warmth. This elegant analog souvenir represents the perfect milestone of our beautiful 1 year and 5 months—started Jan 27, 2025. You are my home, Gudiya."
              </p>

              {/* INTERACTIVE CONTROLLER STUDIO BOX */}
              <div className="bg-[#241B14] rounded-2xl p-5 border border-[#443324] space-y-4 shadow-inner">
                <span className="block font-mono text-[9px] tracking-widest text-[#D69E69] font-bold uppercase select-none">
                  🎛️ COZY SUNSET GRAIN CALIBRATION BAY
                </span>

                {/* Preset Fast Select Buttons */}
                <div className="flex flex-wrap gap-2 pt-1 font-mono">
                  {[
                    { id: "pure_photo", label: "Pure Portrait" },
                    { id: "golden_hour", label: "Golden Hour ✨" },
                    { id: "analog_print", label: "Analog 90s Print 🎞️" },
                    { id: "sun_drenched", label: "Sun-Drenched Bloom ☀️" }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyGoldenPreset(preset.id)}
                      className={`py-1.5 px-3 rounded-lg text-[10px] tracking-wider transition-all cursor-pointer ${
                        goldenActivePreset === preset.id
                          ? "bg-[#D69E69] text-stone-900 font-bold shadow-md"
                          : "bg-black/35 text-[#D69E69] hover:bg-black/55 border border-[#D69E69]/10"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Saree Trim Custom Selection parameters */}
                <div className="grid grid-cols-2 gap-4 pb-1">
                  <div>
                    <span className="block text-[9px] font-mono uppercase text-stone-400 select-none mb-1">Saree Border overlay</span>
                    <select
                      value={goldenZigZagBorder ? "on" : "off"}
                      onChange={(e) => setGoldenZigZagBorder(e.target.value === "on")}
                      className="w-full bg-black/45 border border-[#D69E69]/25 text-[#D69E69] text-xs font-mono rounded-lg p-1.5 outline-none cursor-pointer"
                    >
                      <option value="on">Show Geometric Border</option>
                      <option value="off">Hide Border Trim</option>
                    </select>
                  </div>

                  <div>
                    <span className="block text-[9px] font-mono uppercase text-stone-400 select-none mb-1">Border Hue colorway</span>
                    <select
                      value={goldenSareeTrimColor}
                      onChange={(e) => setGoldenSareeTrimColor(e.target.value)}
                      className="w-full bg-black/45 border border-[#D69E69]/25 text-[#D69E69] text-xs font-mono rounded-lg p-1.5 outline-none cursor-pointer"
                    >
                      <option value="#FAFAFA">Saree White Accent (Original)</option>
                      <option value="#D69E69">Royal Amber Gold</option>
                      <option value="#B54C4C">Rose Saffron Crimson</option>
                      <option value="#1A1918">Deep Midnight Charcoal</option>
                    </select>
                  </div>
                </div>

                {/* Fine Tuning Custom Range Sliders */}
                <div className="space-y-3 pt-1 text-stone-300">
                  {/* Bloom control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Soft Bloom Haze Blur</span>
                      <span className="text-[#D69E69]">{goldenBloomValue} px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="3" 
                      step="0.1" 
                      value={goldenBloomValue} 
                      onChange={(e) => {
                        setGoldenBloomValue(parseFloat(e.target.value));
                        setGoldenActivePreset("custom");
                      }}
                      className="w-full accent-[#D69E69] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Vignette control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Vignette Edge Masking</span>
                      <span className="text-[#D69E69]">{Math.round(goldenVignetteValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={goldenVignetteValue} 
                      onChange={(e) => {
                        setGoldenVignetteValue(parseFloat(e.target.value));
                        setGoldenActivePreset("custom");
                      }}
                      className="w-full accent-[#D69E69] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Noise Weight control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Vintage Film Grain Density</span>
                      <span className="text-[#D69E69]">{Math.round(goldenGrainValue * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="0.6" 
                      step="0.02" 
                      value={goldenGrainValue} 
                      onChange={(e) => {
                        setGoldenGrainValue(parseFloat(e.target.value));
                        setGoldenActivePreset("custom");
                      }}
                      className="w-full accent-[#D69E69] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Sunset Bloom Glow intensity */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Key Sunset Glow Strength</span>
                      <span className="text-[#D69E69]">{Math.round(goldenGlowIntensity * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={goldenGlowIntensity} 
                      onChange={(e) => {
                        setGoldenGlowIntensity(parseFloat(e.target.value));
                        setGoldenActivePreset("custom");
                      }}
                      className="w-full accent-[#D69E69] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Zig-Zag Border Triangles Count */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Saree Trim Pattern Complexity</span>
                      <span className="text-[#D69E69]">{goldenZigZagScale} pattern units</span>
                    </div>
                    <input 
                      type="range" 
                      min="8" 
                      max="40" 
                      step="2" 
                      value={goldenZigZagScale} 
                      onChange={(e) => setGoldenZigZagScale(parseInt(e.target.value))}
                      className="w-full accent-[#D69E69] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Angle Tilt control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono select-none">
                      <span>Cinematic Photo Rotation (Tilt Axis)</span>
                      <span className="text-[#D69E69]">{goldenAngleTilt} deg</span>
                    </div>
                    <input 
                      type="range" 
                      min="-20" 
                      max="20" 
                      step="1" 
                      value={goldenAngleTilt} 
                      onChange={(e) => setGoldenAngleTilt(parseInt(e.target.value))}
                      className="w-full accent-[#D69E69] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* WATER & TRANSMIT AMBER SUNLIGHT PULSES BUTTON */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <button
                  onClick={() => {
                    setGoldenHearts(prev => prev + 1);
                    setShowGoldenWaterSuccess(true);
                    setTimeout(() => setShowGoldenWaterSuccess(false), 3200);
                  }}
                  className="flex-1 py-3.5 px-6 bg-gradient-to-r from-[#D69E69] to-[#8C8273] hover:from-[#8C8273] hover:to-[#D69E69] text-white text-xs font-mono tracking-widest uppercase font-bold rounded-xl shadow-[0_8px_25px_rgba(214,158,105,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 border border-white/10"
                >
                  <Heart className="w-4 h-4 fill-white animate-pulse" />
                  WATER &amp; SEND COZY SUNBEAMS
                </button>

                <div className="bg-black/25 py-2 px-4 rounded-xl border border-white/5 text-center flex flex-col justify-center shrink-0 min-w-[100px] select-none">
                  <span className="text-[9px] font-mono uppercase text-stone-400">Warm Sunbeams</span>
                  <span className="text-sm font-sans tracking-tight text-[#D69E69] font-bold">{goldenHearts} ☀️</span>
                </div>
              </div>

              {/* WATER SUCCESS CONFIRMATION MSG */}
              {showGoldenWaterSuccess && (
                <div className="text-[11px] font-serif italic text-[#D69E69] bg-[#D69E69]/10 p-3 rounded-xl border border-[#D69E69]/20 animate-fade-in text-center lg:text-left flex items-center justify-center lg:justify-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D69E69] animate-spin-slow" />
                  <span>Emitted cozy solar particles! Her beautiful saree trim shimmers under gold rays! Cozy wave transmitted flawlessly! ☀️💖👑</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2026 SPECIAL SPOTLIGHT 8: THE VELVET TEAL CHIAROSCURO MUSE */}
        <div id="chiaroscuro-spotlight-card" className="mb-16 bg-[#090D0C] rounded-[32px] p-6 lg:p-12 border border-[#16302B]/60 shadow-[0_24px_55px_rgba(8,12,11,0.5)] relative overflow-hidden text-left text-stone-200">
          {/* Glowing cinematic teal ambient backdrop highlights */}
          {chiaroscuroOverlayGlow > 0 && (
            <div 
              className="absolute -top-12 -right-12 w-[340px] h-[340px] rounded-full blur-[60px] pointer-events-none mix-blend-screen transition-all duration-300"
              style={{
                background: `radial-gradient(circle, rgba(72,192,200,0.45) 0%, rgba(30,152,158,0.15) 60%, rgba(0,0,0,0) 100%)`,
                opacity: chiaroscuroOverlayGlow
              }}
            />
          )}

          {/* Glowing bottom-left key light highlights */}
          {chiaroscuroKeyHighlight > 0 && (
            <div 
              className="absolute -bottom-24 left-1/3 w-[360px] h-[360px] rounded-full blur-[55px] pointer-events-none mix-blend-screen transition-all duration-300"
              style={{
                background: "radial-gradient(circle, rgba(234,227,221,0.3) 0%, rgba(30,152,158,0.1) 65%, rgba(0,0,0,0) 100%)",
                opacity: chiaroscuroKeyHighlight
              }}
            />
          )}

          {/* SVG Film Grain Noise Mask */}
          <svg className="absolute w-0 h-0 pointer-events-none">
            <defs>
              <filter id="chiaroscuro-grain-mask">
                <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.22 0" />
                <feComposite operator="in" in2="SourceGraphic" />
              </filter>
            </defs>
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* LEFT HALF: THE CAMERA SYSTEM & PORTRAIT VIEWPORT */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div 
                className="relative aspect-[3/4] w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#060A09] p-2 border border-[#162B27] shadow-2xl group transition-all duration-500 hover:scale-[1.015]"
                onMouseEnter={() => setChiaroscuroHovered(true)}
                onMouseLeave={() => setChiaroscuroHovered(false)}
              >
                {/* Viewport Frame */}
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-black">
                  {/* Portrait of Babita (Teal Chiaroscuro Velvet) */}
                  <img 
                    src="https://img.sanishtech.com/u/3b242b299a486f9fcbba47c87e2574c6.jpeg" 
                    alt="Babita Chiaroscuro Velvet Portrait" 
                    className="w-full h-full object-cover select-none transition-all duration-300"
                    style={{
                      filter: `brightness(${0.85 + chiaroscuroKeyHighlight * 0.15}) contrast(1.1) saturate(1.1) sepia(0.05) blur(${chiaroscuroBloom}px)`,
                      transform: `scale(1.1) rotate(${chiaroscuroAngleTilt}deg)`
                    }}
                    referrerPolicy="no-referrer"
                  />

                  {/* Ambient Drape Bloom overlay */}
                  {chiaroscuroOverlayGlow > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-300"
                      style={{
                        background: "radial-gradient(circle at 75% 85%, rgba(30,152,158,0.28) 0%, rgba(30,152,158,0.02) 75%, transparent 100%)",
                        opacity: chiaroscuroOverlayGlow
                      }}
                    />
                  )}

                  {/* Grain layer overlay */}
                  {chiaroscuroGrain > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-overlay"
                      style={{ 
                        filter: "url(#chiaroscuro-grain-mask)", 
                        opacity: chiaroscuroGrain 
                      }}
                    />
                  )}

                  {/* Chiaroscuro vignetting deep corners */}
                  {chiaroscuroVignette > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{ 
                        background: "radial-gradient(circle, transparent 35%, rgba(0,0,0,0.99) 95%)",
                        opacity: chiaroscuroVignette 
                      }}
                    />
                  )}

                  {/* SHINY REFLECTIVE BLOUSE SEQUINS SIMULATOR OVERLAY */}
                  {chiaroscuroSequinsCount > 0 && (
                    <div className="absolute inset-0 pointer-events-none transition-all duration-500">
                      {Array.from({ length: chiaroscuroSequinsCount }).map((_, idx) => {
                        // Pre-calculate beautiful scatter positions corresponding to blouse area (bottom right mostly)
                        const coords = [
                          { t: "76%", l: "52%", s: 1.2 },
                          { t: "82%", l: "58%", s: 0.9 },
                          { t: "74%", l: "68%", s: 1.5 },
                          { t: "85%", l: "74%", s: 1.1 },
                          { t: "78%", l: "80%", s: 1.3 },
                          { t: "88%", l: "64%", s: 0.8 },
                          { t: "92%", l: "78%", s: 1.4 },
                          { t: "80%", l: "48%", s: 1.0 },
                          { t: "90%", l: "52%", s: 1.3 },
                          { t: "72%", l: "60%", s: 1.1 },
                          { t: "86%", l: "85%", s: 1.2 },
                          { t: "94%", l: "70%", s: 0.9 },
                          { t: "75%", l: "74%", s: 1.6 },
                          { t: "81%", l: "88%", s: 1.0 },
                          { t: "88%", l: "45%", s: 1.4 },
                          { t: "95%", l: "58%", s: 1.1 },
                          { t: "70%", l: "55%", s: 1.2 },
                          { t: "83%", l: "66%", s: 1.5 }
                        ];
                        const pos = coords[idx % coords.length];
                        return (
                          <div 
                            key={idx}
                            className="absolute rounded-full transition-all duration-1000 animate-pulse"
                            style={{
                              top: pos.t,
                              left: pos.l,
                              width: `${4 * pos.s}px`,
                              height: `${4 * pos.s}px`,
                              backgroundColor: chiaroscuroSequinsSparkleColor,
                              boxShadow: `0 0 ${8 * pos.s}px ${chiaroscuroSequinsSparkleColor}`,
                              opacity: chiaroscuroHovered ? 1.0 : 0.6,
                              animationDelay: `${idx * 0.15}s`
                            }}
                          />
                        );
                      })}
                    </div>
                  )}

                  {/* Soft shimmering floating light ray particles */}
                  <div className={`absolute top-12 left-12 text-sm pointer-events-none transition-all duration-1000 ${
                    chiaroscuroHovered ? "scale-150 rotate-45 text-[#48C0C8]" : "scale-100 text-[#1E989E]/20"
                  }`}>✦</div>
                  <div className={`absolute top-24 right-16 text-lg pointer-events-none transition-all duration-1000 ${
                    chiaroscuroHovered ? "scale-150 -rotate-90 text-[#EAE3DD]" : "scale-100 text-[#EAE3DD]/20"
                  }`}>✦</div>

                  {/* Aesthetic HUD interface bar */}
                  <div className="absolute bottom-6 left-4 right-4 flex items-center justify-between text-[9px] font-mono tracking-widest text-[#48C0C8] bg-black/75 backdrop-blur-md py-1.5 px-3 rounded-lg border border-[#1E989E]/30 uppercase select-none">
                    <span>👑 Velvet Cyan Darkroom</span>
                    <span>Preset: {chiaroscuroActivePreset}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT HALF: CONTROL PANEL & POETIC APPRECIATION */}
            <div className="lg:col-span-6 space-y-6 text-left animate-fade-in">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 py-1 px-3.5 bg-[#1E989E]/15 hover:bg-[#1E989E]/25 border border-[#1E989E]/20 text-[#48C0C8] text-[9.5px] font-mono tracking-widest rounded-full uppercase leading-none select-none">
                  <Moon className="w-3 h-3 text-[#48C0C8] animate-pulse" />
                  Muted Cyan Low-Light Calibrator
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl font-extralight text-white tracking-tight leading-tight">
                  The Velvet <span className="italic text-[#1E989E] font-normal">Teal Chiaroscuro</span> Muse
                </h3>
                
                <div className="h-[1px] w-20 bg-[#1E989E]/40"></div>
              </div>

              {/* Romantic parsing of cozy photo */}
              <p className="font-serif italic text-sm md:text-[15px] text-stone-300 leading-relaxed font-light">
                "Shrouded in deep shadows and luxurious velvet teal tones, this magical capture emphasizes the soft low-light chiaroscuro around her features. The beautiful grid sequined blouse catches the screen glow, casting reflective specs like stars across a midnight sky. Every pixel of this intimate souvenir sings a soft melody celebrating our deep 1 year, 5 month journey. You are the peace of my darkest nights, Gudiya."
              </p>

              {/* CONTROLS BAY CONTAINER */}
              <div className="bg-[#0D1312] rounded-2xl p-5 border border-[#1A312E] space-y-4 shadow-inner">
                <span className="block font-mono text-[9px] tracking-widest text-[#48C0C8] font-bold uppercase select-none">
                  🎛️ VELVET NOCTURNE CALIBRATION STUDIO
                </span>

                {/* Preset Fast Select Buttons */}
                <div className="flex flex-wrap gap-2 pt-1 font-mono">
                  {[
                    { id: "pure_asset", label: "Pure Portrait" },
                    { id: "velvet_chiaroscuro", label: "Velvet Cozy ✨" },
                    { id: "soft_glow", label: "Liquid Cyan Glow 🔮" },
                    { id: "deep_nocturne", label: "Nocturne Dim 🌌" }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyChiaroscuroPreset(preset.id)}
                      className={`py-1.5 px-3 rounded-lg text-[10px] tracking-wider transition-all cursor-pointer ${
                        chiaroscuroActivePreset === preset.id
                          ? "bg-[#1E989E] text-black font-bold shadow-md shadow-[#1E989E]/30"
                          : "bg-black/45 text-[#48C0C8] hover:bg-black/65 border border-[#1E989E]/10"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Custom Sequins and Glow controls */}
                <div className="grid grid-cols-2 gap-4 pb-1">
                  <div>
                    <span className="block text-[9px] font-mono uppercase text-stone-400 select-none mb-1">Sequin Star Count</span>
                    <select
                      value={chiaroscuroSequinsCount}
                      onChange={(e) => setChiaroscuroSequinsCount(parseInt(e.target.value))}
                      className="w-full bg-black/55 border border-[#1E989E]/25 text-[#48C0C8] text-xs font-mono rounded-lg p-1.5 outline-none cursor-pointer"
                    >
                      <option value="0">No Sequins (Minimalist)</option>
                      <option value="6">6 Floating Highlights</option>
                      <option value="12">12 Classic Sequins (Original)</option>
                      <option value="18">18 Ultimate Galaxy Sparkles</option>
                    </select>
                  </div>

                  <div>
                    <span className="block text-[9px] font-mono uppercase text-stone-400 select-none mb-1">Sequins Tint Sparkle</span>
                    <select
                      value={chiaroscuroSequinsSparkleColor}
                      onChange={(e) => setChiaroscuroSequinsSparkleColor(e.target.value)}
                      className="w-full bg-black/55 border border-[#1E989E]/25 text-[#48C0C8] text-xs font-mono rounded-lg p-1.5 outline-none cursor-pointer"
                    >
                      <option value="#FFFFFF">Royal Silver White (Original)</option>
                      <option value="#48C0C8">Radiant Cyan Teal</option>
                      <option value="#FFD700">Golden Sunburst Speck</option>
                      <option value="#D4AF37">Vintage Warm Brass</option>
                    </select>
                  </div>
                </div>

                {/* Range Sliders */}
                <div className="space-y-3 pt-1 text-stone-300 font-mono">
                  {/* Bloom control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] select-none">
                      <span>Backdrop Soft Bloom Focus</span>
                      <span className="text-[#48C0C8]">{chiaroscuroBloom} px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="3" 
                      step="0.1" 
                      value={chiaroscuroBloom} 
                      onChange={(e) => {
                        setChiaroscuroBloom(parseFloat(e.target.value));
                        setChiaroscuroActivePreset("custom");
                      }}
                      className="w-full accent-[#1E989E] h-1.5 bg-black/45 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Vignette control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] select-none">
                      <span>Vignette Edge Depth (Shadows)</span>
                      <span className="text-[#48C0C8]">{Math.round(chiaroscuroVignette * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={chiaroscuroVignette} 
                      onChange={(e) => {
                        setChiaroscuroVignette(parseFloat(e.target.value));
                        setChiaroscuroActivePreset("custom");
                      }}
                      className="w-full accent-[#1E989E] h-1.5 bg-black/45 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Noise Weight control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] select-none">
                      <span>Low-Light ISO Noise Grain</span>
                      <span className="text-[#48C0C8]">{Math.round(chiaroscuroGrain * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="0.6" 
                      step="0.02" 
                      value={chiaroscuroGrain} 
                      onChange={(e) => {
                        setChiaroscuroGrain(parseFloat(e.target.value));
                        setChiaroscuroActivePreset("custom");
                      }}
                      className="w-full accent-[#1E989E] h-1.5 bg-black/45 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Screen reflection glow intensity */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] select-none">
                      <span>Drape Amber Background Contrast Glow</span>
                      <span className="text-[#48C0C8]">{Math.round(chiaroscuroOverlayGlow * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={chiaroscuroOverlayGlow} 
                      onChange={(e) => {
                        setChiaroscuroOverlayGlow(parseFloat(e.target.value));
                        setChiaroscuroActivePreset("custom");
                      }}
                      className="w-full accent-[#1E989E] h-1.5 bg-black/45 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Key highlight exposure strength */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] select-none">
                      <span>Key Highlights Flash Strength</span>
                      <span className="text-[#48C0C8]">{Math.round(chiaroscuroKeyHighlight * 100)} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={chiaroscuroKeyHighlight} 
                      onChange={(e) => {
                        setChiaroscuroKeyHighlight(parseFloat(e.target.value));
                        setChiaroscuroActivePreset("custom");
                      }}
                      className="w-full accent-[#1E989E] h-1.5 bg-black/45 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Angle Tilt control */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] select-none">
                      <span>Cinematic Frame Spin Tilt</span>
                      <span className="text-[#48C0C8]">{chiaroscuroAngleTilt} deg</span>
                    </div>
                    <input 
                      type="range" 
                      min="-20" 
                      max="20" 
                      step="1" 
                      value={chiaroscuroAngleTilt} 
                      onChange={(e) => setChiaroscuroAngleTilt(parseInt(e.target.value))}
                      className="w-full accent-[#1E989E] h-1.5 bg-black/45 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* WATER & SEND CYBER SPARKS BUTTON */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <button
                  onClick={() => {
                    setChiaroscuroChamber(prev => prev + 1);
                    setShowChiaroscuroWaterSuccess(true);
                    setTimeout(() => setShowChiaroscuroWaterSuccess(false), 3200);
                  }}
                  className="flex-1 py-3.5 px-6 bg-gradient-to-r from-[#1E989E] to-[#16302B] hover:from-[#16302B] hover:to-[#1E989E] text-white text-xs font-mono tracking-widest uppercase font-bold rounded-xl shadow-[0_8px_25px_rgba(30,152,158,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 border border-white/10"
                >
                  <Heart className="w-4 h-4 fill-white animate-pulse" />
                  WATER &amp; TRANSMIT VELVET SPARKLES
                </button>

                <div className="bg-black/25 py-2 px-4 rounded-xl border border-white/5 text-center flex flex-col justify-center shrink-0 min-w-[100px] select-none">
                  <span className="text-[9px] font-mono uppercase text-stone-400">Teal Sparks</span>
                  <span className="text-sm font-sans tracking-tight text-[#48C0C8] font-bold">{chiaroscuroHearts} 💙</span>
                </div>
              </div>

              {/* WATER SUCCESS CONFIRMATION MSG */}
              {showChiaroscuroWaterSuccess && (
                <div className="text-[11px] font-serif italic text-[#48C0C8] bg-[#1E989E]/10 p-3 rounded-xl border border-[#1E989E]/20 animate-fade-in text-center lg:text-left flex items-center justify-center lg:justify-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#48C0C8] animate-spin-slow" />
                  <span>Emitted cosmic velvet waves! Reflective blouse sequins shimmer beautifully! Teal lights sent flawlessly! 💙✨👾</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2a. THE MASONRY GRID (Asymmetric candid displays) */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Camera className="w-4 h-4 text-luxury-gold" />
            <h3 className="font-serif text-xl font-medium text-[#4E3629] tracking-tight">The Candid Masonry Grid</h3>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {masonryList.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setActiveLightbox({ type: "masonry", index: i })}
                className="break-inside-avoid bg-white p-4.5 rounded-2xl border border-luxury-brown/5 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
              >
                <div className="overflow-hidden rounded-xl relative shadow-inner cursor-zoom-in">
                  <img 
                    src={img.url} 
                    alt={img.caption} 
                    className="w-full h-auto object-cover max-h-[420px] transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Luxury modern overlay with full view actions on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <div className="flex justify-end">
                      <span className="bg-white/95 backdrop-blur-md hover:bg-white text-[#4E3629] text-[9.5px] uppercase tracking-widest px-3 py-1.5 rounded-full font-mono font-bold flex items-center gap-1.5 transition-all transform -translate-y-2 group-hover:translate-y-0 duration-300 shadow-sm">
                        <Maximize2 className="w-2.5 h-2.5 text-luxury-gold" /> Full View
                      </span>
                    </div>
                    <div>
                      <span className="text-white/90 text-[8px] font-mono tracking-widest uppercase bg-black/40 py-1 px-2.5 rounded backdrop-blur-xs border border-white/10">
                        Candid Snap // 0{i + 1}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-left border-t border-cream-base pt-3">
                  <p className="font-serif italic text-[13.5px] text-[#4E3629] leading-relaxed">
                    "{img.caption}"
                  </p>
                  <p className="text-[9px] tracking-widest font-sans uppercase text-luxury-gold mt-1.5 font-bold">
                    CANVAS MOCKUP {i + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2b. THE POLAROID FILM STRIP (Horizontal scrollingsnapshots) */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-luxury-gold" />
              <h3 className="font-serif text-xl font-medium text-[#4E3629] tracking-tight">The Polaroid Film Strip Snapshots</h3>
            </div>
            <span className="text-[9px] tracking-widest font-sans uppercase bg-[#FAF6F0] text-luxury-gold border border-luxury-gold/20 py-1 px-3 rounded-full">
              SCROLL HORIZONTALLY ➔
            </span>
          </div>

          <div className="flex overflow-x-auto pb-8 pt-4 gap-6 scrollbar-thin scrollbar-thumb-luxury-gold/30 snap-x custom-scrollbar">
            {polaroidList.map((snap, i) => (
              <div
                key={i}
                onClick={() => setActiveLightbox({ type: "polaroid", index: i })}
                className={`snap-center shrink-0 bg-white p-4 pb-6 rounded-md shadow-md border border-luxury-brown/5 max-w-[245px] transform ${snap.angle} hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out cursor-pointer group relative`}
              >
                {/* Polaroid Square Snapshot */}
                <div className="w-[213px] aspect-square bg-[#FAF6F0] overflow-hidden rounded relative border border-luxury-brown/5 cursor-zoom-in">
                  <img 
                    src={snap.url} 
                    alt={snap.caption} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs py-0.5 px-2 rounded text-[7px] font-mono uppercase text-white/90 z-10">
                    SNAP 0{i + 1}
                  </div>
                  {/* Hover action overlay for full view */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/95 backdrop-blur-md text-[#4E3629] text-[9.5px] uppercase tracking-widest px-3 py-1.5 rounded-full font-mono font-bold flex items-center gap-1.5 transition-all transform scale-90 group-hover:scale-100 duration-300 shadow-md">
                      <Maximize2 className="w-2.5 h-2.5 text-luxury-gold" /> Full View
                    </span>
                  </div>
                </div>

                {/* Hand-written text space */}
                <div className="text-center mt-4">
                  <p className="font-serif italic text-md text-[#4E3629] tracking-tight font-semibold">
                    "{snap.caption}"
                  </p>
                  <p className="text-[8px] uppercase tracking-wider text-luxury-gold mt-1">
                    Captured Eternal Memoir
                  </p>
                </div>

                {/* Film Strip binder tape effect overlay */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/60 border-l border-r border-[#EACBB0]/30 border-dashed transform -rotate-1 shadow-[0_1px_2px_rgba(0,0,0,0.01)]"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. "THE CINEMATIC THEATER" (Dedicated Video Space) */}
      <section id="cinematic-theater" className="max-w-5xl mx-auto w-full px-6 py-12 z-10">
        <div className="text-center mb-12">
          <p className="font-serif italic text-luxury-gold text-sm tracking-widest uppercase font-semibold">Cozy Motion Chronicles</p>
          <h2 className="font-serif text-3xl md:text-4xl font-extralight text-[#4E3629] mt-1 tracking-tight">The Cinematic Theater</h2>
          <p className="text-[10px] tracking-widest font-sans uppercase text-luxury-brown/50 mt-1 max-w-md mx-auto">
            A specialized gallery honoring deep motion memories and beautiful vertical snippets.
          </p>
          <div className="h-[1px] w-12 bg-luxury-gold/50 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* 3a. HERO VIDEO PLAYER MOCKUP (Left 7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white p-6 rounded-2xl border border-luxury-brown/5 shadow-xs">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-luxury-gold animate-pulse" />
                  <h3 className="font-serif text-lg font-medium text-[#4E3629]">Hero Video Memoir Player</h3>
                </div>
                {/* Custom Cinema Lightbox Launcher Badge */}
                <button
                  onClick={() => setActiveVideoLightboxUrl(heroVideoSrc)}
                  className="bg-[#FAF6F0] hover:bg-cream-dark border border-luxury-gold/30 hover:border-luxury-gold/50 text-[#5C4033] text-[9.5px] uppercase tracking-widest px-3 py-1.5 rounded-full font-mono font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs"
                  title="Expand to Fullscreen Theater view"
                >
                  <Maximize2 className="w-3 h-3 text-luxury-gold" /> Cinema Mode
                </button>
              </div>

              {/* Video container screen styled like a luxury canvas */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#1A1512] shadow-xl group border-[3px] border-cream-dark ring-1 ring-luxury-gold/25 cursor-zoom-in" onClick={() => setActiveVideoLightboxUrl(heroVideoSrc)}>
                
                {/* Actual Video Element loaded with deep customized or default memory video */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02]"
                  src={heroVideoSrc}
                  poster="https://img.sanishtech.com/u/cbafec3b9ec2c5eda45038a5ea54e175.jpeg"
                  playsInline
                  loop
                  muted={videoMuted}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent opening overlay when playing container
                    toggleVideoPlayback();
                  }}
                />

                {/* Direct Hover Hint Overlay */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="bg-[#FAF6F0]/95 backdrop-blur-md text-[#4E3629] text-[10px] uppercase tracking-widest px-4 py-2 rounded-full font-mono font-bold flex items-center gap-2 shadow-lg scale-90 group-hover:scale-100 transition-all duration-350">
                    <Maximize2 className="w-3.5 h-3.5 text-luxury-gold animate-pulse" /> EXPAND CINEMA THEATER
                  </span>
                </div>

                {/* TRANSLUCENT OVERLAY FOR CUSTOM CONTROLS */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 flex flex-col justify-between p-4 opacity-100 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                  
                  {/* Header Tag */}
                  <div className="flex justify-between items-center">
                    <span className="bg-black/45 backdrop-blur-md py-1 px-3 rounded-full text-[9px] uppercase tracking-widest font-semibold text-white border border-white/10 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-luxury-gold animate-ping"></span>
                      OUR CELESTIAL SECONDS 🌅
                    </span>
                    <span className="text-[9px] font-mono text-white/70 bg-black/50 py-0.5 px-2 rounded border border-white/5">
                      MEME_MPEG4-LITE
                    </span>
                  </div>

                  {/* Center Large play trigger indicator when paused */}
                  {!videoPlaying && (
                    <button 
                      onClick={toggleVideoPlayback}
                      className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-14 h-14 rounded-full bg-luxury-gold/95 border border-white/30 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer z-10"
                    >
                      <Play className="w-6 h-6 ml-1 text-white fill-white" />
                    </button>
                  )}

                  {/* Bottom luxury custom interactive tools bar */}
                  <div className="space-y-3">
                    
                    {/* Seek Bar line */}
                    <div 
                      className="h-1 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
                      onClick={(e) => {
                        const video = videoRef.current;
                        if (!video) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const clickedPerc = x / rect.width;
                        video.currentTime = clickedPerc * video.duration;
                      }}
                    >
                      <div 
                        className="bg-luxury-gold h-full rounded-full transition-all duration-100"
                        style={{ width: `${videoProgress}%` }}
                      ></div>
                    </div>

                    {/* Left Controls & Right Mute toggle controls */}
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={toggleVideoPlayback}
                          className="p-1 px-3 rounded bg-white/15 hover:bg-white/25 border border-white/15 transition-all text-[9.5px] font-mono tracking-widest inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          {videoPlaying ? (
                            <>
                              <Pause className="w-2.5 h-2.5 fill-current" /> PAUSE
                            </>
                          ) : (
                            <>
                              <Play className="w-2.5 h-2.5 fill-current" /> PLAY
                            </>
                          )}
                        </button>
                        <span className="text-[10px] font-mono tracking-wider opacity-85">
                          {videoPlaying ? "Live Resonance Ticking..." : "Stream Suspended"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={toggleVideoMute}
                          className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors border border-white/15 cursor-pointer"
                          title="Toggle Audio Feedback"
                        >
                          {videoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>

                        <button 
                          onClick={() => handleFullscreenVideo()}
                          className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors border border-white/15 cursor-pointer text-white hover:text-luxury-gold flex items-center justify-center"
                          title="Full View Cinema Mode"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              {/* Elegant Cinematic Memoir Track Selector */}
              <div className="mt-5 bg-[#FAF6F0]/60 p-4 rounded-xl border border-luxury-brown/5 text-left">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#8B6E59] font-bold uppercase flex items-center gap-1">
                    <Film className="w-3 h-3 text-luxury-gold animate-spin-slow" /> Memoir Playlist Tracks ({reelsList.length})
                  </span>
                  <span className="text-[9px] font-mono text-luxury-gold font-bold">
                    Click a track to play on main screen
                  </span>
                </div>
                
                <div className="flex gap-3 overflow-x-auto pb-2 pr-1 custom-scrollbar scroll-smooth">
                  {reelsList.map((reel, rIdx) => {
                    const isPlaying = heroVideoSrc === (customReelVideos[rIdx] || reel.videoUrl);
                    return (
                      <button
                        key={rIdx}
                        onClick={() => playTrackInHero(customReelVideos[rIdx] || reel.videoUrl || "")}
                        className={`flex-shrink-0 flex items-center gap-2.5 p-2 rounded-xl border transition-all cursor-pointer ${
                          isPlaying 
                            ? "bg-white border-luxury-gold shadow-xs ring-1 ring-luxury-gold/30" 
                            : "bg-white/40 border-luxury-brown/10 hover:border-luxury-brown/20 hover:bg-white/80"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden relative flex-shrink-0 bg-stone-100">
                          <img 
                            src={reel.poster} 
                            alt="" 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                          {isPlaying && (
                            <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                              <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-luxury-gold"></span>
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-left w-28 md:w-32">
                          <p className="text-[8.5px] font-mono uppercase text-luxury-gold font-bold leading-none mb-0.5">
                            {isPlaying ? "PLAYING" : `TRACK ${String(rIdx + 1).padStart(2, "0")}`}
                          </p>
                          <p className="text-[10px] font-serif font-medium text-[#4E3629] line-clamp-1 leading-snug">
                            {reel.title}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="font-serif italic text-xs text-[#8B6E59]/80 text-center mt-4">
              "Every single frames encapsulate sweet glowing light that mirrors the warm sparkles in your eyes."
            </p>
          </div>

          {/* 3b. REELS MEMORY GRID (Right 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white p-6 rounded-2xl border border-luxury-brown/5 shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-4 justify-between">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-luxury-gold" />
                  <h3 className="font-serif text-lg font-medium text-[#4E3629]">Reels Memories (9:16 Snippets)</h3>
                </div>
                <span className="text-[9px] font-mono bg-[#FAF6F0] py-1 px-2.5 rounded text-luxury-gold border border-luxury-brown/5 uppercase font-bold">
                  16 Clips
                </span>
              </div>

              <div className="max-h-[460px] overflow-y-auto pr-1.5 custom-scrollbar">
                <div className="grid grid-cols-3 gap-3">
                  {reelsList.map((reel, idx) => {
                    const hasVideo = !!customReelVideos[idx] || !!reel.videoUrl;
                    return (
                      <div 
                        key={idx}
                        onClick={() => setSelectedReel(idx)}
                        className="bg-white p-1 pb-1.5 rounded-xl border border-luxury-brown/5 shadow-3xs relative overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-300"
                      >
                        {/* Smartphone 9:16 aspect preview box */}
                        <div className="aspect-[9/16] w-full rounded-lg overflow-hidden bg-[#FAF6F0] relative">
                          <img 
                            src={reel.poster} 
                            alt={reel.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.94]"
                            referrerPolicy="no-referrer"
                          />

                          {/* Dark gradient shadow */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 flex flex-col justify-end p-2 text-white">
                            <p className="text-[7.5px] font-medium tracking-tight line-clamp-2 leading-tight">
                              {reel.title}
                            </p>
                            
                            <div className="flex justify-between items-center mt-1 text-[6.5px] font-mono opacity-80 leading-none">
                              <span className="flex items-center gap-0.5">
                                <Heart className="w-2 h-2 text-red-400 fill-red-400 shrink-0" />
                                {reel.hearts}
                              </span>
                              <span>{reel.views}</span>
                            </div>
                          </div>

                          {/* Interactive Hover "Watch Reel" action overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-1">
                            <div className="w-7 h-7 rounded-sm border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center transition-transform transform scale-90 group-hover:scale-100 duration-300">
                              <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5 animate-pulse" />
                            </div>
                            <span className="text-[7px] font-mono uppercase font-bold tracking-widest text-white px-2">
                              Watch Loop
                            </span>
                          </div>

                          {/* Simulating Reels interface tag overlay */}
                          <div className="absolute top-1 right-1 bg-black/45 py-0.5 px-1.5 rounded text-[5.5px] text-white tracking-widest font-mono border border-white/10">
                            {reel.duration}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Simulated popup for Reels detailed review info */}
            <div className="mt-4 bg-[#FAF6F0] py-3 px-4 rounded-xl border border-[#EACBB0]/30 text-left">
              <span className="font-mono text-[8px] uppercase tracking-widest text-[#A07855] block font-bold">REELS SELECTION LOG</span>
              {selectedReel !== null ? (
                <div className="mt-1">
                  <p className="font-serif italic text-xs font-semibold text-[#4E3629]">
                    "Selected: {reelsList[selectedReel].title}"
                  </p>
                  <p className="text-[9.5px] text-[#A07855] leading-relaxed mt-1">
                    This smartphone segment represents cozy interactions we recorded on weekends. Soft humming sound and beautiful background giggles.
                  </p>
                </div>
              ) : (
                <p className="text-[9.5px] italic text-[#8B6E59]/70 mt-1 leading-relaxed">
                  Click on any interactive reel thumbnail block above to load specific timeline metadata description logs.
                </p>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 3c. PORTRAIT SMARTPHONE REELS MODAL THEATER */}
      {selectedReel !== null && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          
          {/* Close Backdrop Trigger */}
          <div className="absolute inset-0 cursor-default" onClick={() => setSelectedReel(null)}></div>

          {/* iPhone Mockup Frame */}
          <div className="relative w-full max-w-[340px] aspect-[9/19] bg-[#1a110a] rounded-[48px] border-[6px] border-neutral-850 shadow-2xl overflow-hidden flex flex-col justify-between transform transition-transform animate-scale-in outline-none ring-4 ring-luxury-gold/20 z-10">
            
            {/* Upper Speaker Grill & Dynamic Island Notch */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-around px-3 border border-neutral-800">
              <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></span>
              <span className="w-8 h-1 bg-neutral-900 rounded-full"></span>
              <span className="w-2.5 h-2.5 bg-neutral-900 rounded-full border border-neutral-950 flex items-center justify-center">
                <span className="w-1 h-1 bg-[#1e40af] rounded-full"></span>
              </span>
            </div>

            {/* Content Field */}
            <div className="relative flex-1 bg-black overflow-hidden flex flex-col justify-between">
              
              {/* Back close button in device */}
              <button
                onClick={() => setSelectedReel(null)}
                className="absolute top-12 left-4 z-40 bg-black/45 hover:bg-black/75 text-white/90 p-2.5 rounded-full transition-all border border-white/10 active:scale-95 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 transform rotate-180" />
              </button>

              {customReelVideos[selectedReel] || reelsList[selectedReel].videoUrl ? (
                /* Actual user uploaded or default mp4 video player */
                <video
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  src={customReelVideos[selectedReel] || reelsList[selectedReel].videoUrl}
                  autoPlay
                  loop
                  controls
                  playsInline
                />
              ) : (
                /* Fallback Interactive Reels Visual Placeholder in Frame */
                <div className="absolute inset-0 z-10">
                  <img
                    src={reelsList[selectedReel].poster}
                    className="w-full h-full object-cover filter brightness-[0.78]"
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                  {/* Cozy mock loading screen overlay if they have not uploaded vertical video */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 flex flex-col justify-end p-6 text-white space-y-4">
                    
                    <div className="space-y-1 bg-black/45 p-4 rounded-xl border border-white/5 backdrop-blur-xs text-left">
                      <span className="inline-block py-0.5 px-2 bg-luxury-gold/95 border border-white/20 rounded text-[8px] font-mono font-bold tracking-widest text-[#5C4033] uppercase">
                        CHRONOLOGY SNAP {selectedReel + 1}
                      </span>
                      <h4 className="font-serif italic text-md leading-normal text-white font-semibold">
                        "{reelsList[selectedReel].title}"
                      </h4>
                      <p className="text-[10px] text-white/80 leading-relaxed font-serif">
                        Customize this vertical reel clip inside the Media Curator Console above by uploading an MP4 portrait movie memory!
                      </p>
                    </div>

                    <div className="flex gap-2.5">
                      <label className="flex-1 text-center py-2 bg-gradient-to-r from-luxury-gold to-[#E5C158] hover:from-[#E5C158] hover:to-luxury-gold border border-white/10 text-[9.5px] tracking-widest font-mono text-[#5C4033] font-bold rounded-lg cursor-pointer shadow-md active:scale-95 transition-all">
                        UPLOAD VERTICAL MOVIE
                        <input
                          type="file"
                          accept="video/mp4,video/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleMediaUpload(`reel-${selectedReel}`, file, reelsList[selectedReel].title ?? "");
                            }
                          }}
                        />
                      </label>
                    </div>

                  </div>
                </div>
              )}

              {/* Interface Interactive elements overlays (like Instagram/TikTok vertical panels) */}
              <div className="absolute right-3.5 bottom-16 z-20 flex flex-col items-center gap-4 text-white">
                <div className="flex flex-col items-center cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/15 scale-90 group-hover:scale-105 transition-transform">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  </div>
                  <span className="text-[9px] font-mono font-bold">{reelsList[selectedReel].hearts}</span>
                </div>

                <div className="flex flex-col items-center cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/15 scale-90">
                    <Sparkles className="w-5 h-5 text-luxury-gold fill-luxury-gold" />
                  </div>
                  <span className="text-[9px] font-mono font-bold">Resonance</span>
                </div>

                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-luxury-gold animate-spin-slow">
                    <img src="https://img.sanishtech.com/u/77a494187b389b9a7ccb1bb95c913a12.jpeg" className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>

              {/* Lower description bar */}
              <div className="absolute bottom-6 inset-x-0 px-5 z-20 text-white pb-3 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-neutral-700">
                    <img src="https://img.sanishtech.com/u/77a494187b389b9a7ccb1bb95c913a12.jpeg" className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wide">gudiya_babita 👑</span>
                  <span className="text-[7.5px] bg-[#FAF6F0]/25 text-white/95 px-1.5 py-0.5 rounded font-mono">Original Audio</span>
                </div>
                <p className="text-[10.5px] font-serif leading-snug line-clamp-2 italic pr-12">
                  "{reelsList[selectedReel].title}"
                </p>
                <div className="h-[2px] w-full bg-white/20 rounded-full mt-3 overflow-hidden">
                  <div className="bg-luxury-gold h-full w-[45%] animate-[progress_15s_linear_infinite]"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 3d. COZY PHOTO LIGHTBOX INTERACTIVE VIEW FOR BISHNU & BABITA */}
      {activeLightbox !== null && (() => {
        const list = activeLightbox.type === "masonry" ? masonryList : polaroidList;
        const currentItem = list[activeLightbox.index];
        if (!currentItem) return null;

        const handlePrev = (e?: React.MouseEvent) => {
          if (e) e.stopPropagation();
          setActiveLightbox((prev) => {
            if (!prev) return null;
            const newIndex = prev.index === 0 ? list.length - 1 : prev.index - 1;
            return { ...prev, index: newIndex };
          });
        };

        const handleNext = (e?: React.MouseEvent) => {
          if (e) e.stopPropagation();
          setActiveLightbox((prev) => {
            if (!prev) return null;
            const newIndex = prev.index === list.length - 1 ? 0 : prev.index + 1;
            return { ...prev, index: newIndex };
          });
        };

        return (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between p-4 md:p-8 animate-fade-in select-none">
            {/* Dark background click trigger to close */}
            <div className="absolute inset-0 cursor-default" onClick={() => setActiveLightbox(null)}></div>

            {/* Header controls inside Lightbox */}
            <div className="relative z-10 flex justify-between items-center w-full max-w-6xl mx-auto text-white">
              <div className="text-left">
                <p className="text-[10px] font-mono tracking-widest text-[#EACBB0] uppercase font-bold">
                  {activeLightbox.type === "masonry" ? "Candid Grid Memoir" : "Polaroid Film Snapshot"}
                </p>
                <h4 className="font-serif text-[13px] md:text-sm text-white/70 tracking-wider">
                  Photo 0{activeLightbox.index + 1} of {String(list.length).padStart(2, '0')}
                </h4>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setActiveLightbox(null)}
                className="bg-white/10 hover:bg-white/25 border border-white/20 text-white p-3 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center shadow-lg"
                title="Exit Lightbox Preview"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Main Stage: Carousel with Previous / Image / Next */}
            <div className="relative z-10 flex-1 flex items-center justify-between w-full max-w-6xl mx-auto gap-4 md:gap-8 my-4">
              
              {/* Prev Button */}
              <button
                onClick={(e) => handlePrev(e)}
                className="bg-black/40 hover:bg-black/75 border border-white/10 hover:border-luxury-gold/50 text-white p-3 rounded-full transition-all active:scale-90 cursor-pointer hidden md:flex items-center justify-center shrink-0 shadow-xl"
              >
                <ChevronLeft className="w-6 h-6 text-luxury-gold" />
              </button>

              {/* Main Photo Card */}
              <div className="flex-1 flex flex-col items-center justify-center max-h-[72vh] md:max-h-[75vh] relative group">
                <div className="relative overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl bg-stone-900/40 p-1 max-w-full">
                  <img
                    src={currentItem.url}
                    alt={currentItem.caption}
                    className="max-h-[58vh] md:max-h-[64vh] w-auto object-contain rounded-xl select-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Watermark badge */}
                  <div className="absolute top-4 right-4 bg-luxury-gold/90 border border-[#FAF6F0]/20 text-white text-[8px] font-mono font-bold tracking-widest px-2.5 py-1 rounded backdrop-blur-xs uppercase select-none">
                    Babita 🌸 Bishnu
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={(e) => handleNext(e)}
                className="bg-black/40 hover:bg-black/75 border border-white/10 hover:border-luxury-gold/50 text-white p-3 rounded-full transition-all active:scale-90 cursor-pointer hidden md:flex items-center justify-center shrink-0 shadow-xl"
              >
                <ChevronRight className="w-6 h-6 text-luxury-gold" />
              </button>
            </div>

            {/* Bottom textual descriptor inside Lightbox */}
            <div className="relative z-10 w-full max-w-3xl mx-auto text-center space-y-3 pb-4">
              <p className="font-serif italic text-lg md:text-2xl text-white font-light tracking-wide px-4">
                "{currentItem.caption}"
              </p>
              
              <div className="flex justify-center items-center gap-4.5 mt-2">
                {/* Mobile carousel buttons shown on smaller viewports */}
                <button
                  onClick={(e) => handlePrev(e)}
                  className="bg-white/10 border border-white/10 hover:border-white/30 text-white py-1.5 px-3 md:hidden rounded-lg transition-all active:scale-95 cursor-pointer text-xs font-mono font-bold tracking-wider inline-flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> PREV
                </button>
                
                <span className="text-[9px] font-mono uppercase tracking-widest text-luxury-gold font-bold bg-[#FAF6F0]/10 py-1 px-3.5 rounded-full border border-luxury-gold/30">
                  Resonance Archive Loop
                </span>

                <button
                  onClick={(e) => handleNext(e)}
                  className="bg-white/10 border border-white/10 hover:border-white/30 text-white py-1.5 px-3 md:hidden rounded-lg transition-all active:scale-95 cursor-pointer text-xs font-mono font-bold tracking-wider inline-flex items-center gap-1"
                >
                  NEXT <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 3e. IMMERSIVE LUXURY CINEMA STAGE LIGHTBOX FOR VIDEOS */}
      {activeVideoLightboxUrl !== null && (
        <div className="fixed inset-0 bg-[#0A0705]/98 backdrop-blur-xl z-50 flex flex-col justify-between p-4 md:p-8 animate-fade-in select-none">
          {/* Backdrop exit trigger */}
          <div className="absolute inset-0 cursor-default" onClick={() => setActiveVideoLightboxUrl(null)}></div>

          {/* Top Controls Header */}
          <div className="relative z-10 flex justify-between items-center w-full max-w-6xl mx-auto text-white mt-1">
            <div className="text-left">
              <p className="text-[10px] font-mono tracking-widest text-luxury-gold uppercase font-bold flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span> Live Ambient Cinema Theater
              </p>
              <h4 className="font-serif text-[13px] md:text-sm text-neutral-300 italic tracking-wider mt-0.5">
                Now screening: Bishnu & Babita's Shared Chronicles
              </h4>
            </div>
            
            {/* Close Theater Button */}
            <button
              onClick={() => setActiveVideoLightboxUrl(null)}
              className="bg-white/10 hover:bg-white/20 border border-white/25 text-white p-3 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center shadow-lg"
              title="Close Cinema Theater"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Main Visual Stage */}
          <div className="relative z-10 flex-1 flex items-center justify-center w-full max-w-5xl mx-auto my-4">
            <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border-4 border-[#1c120c] ring-1 ring-luxury-gold/30 z-10">
              <video
                className="w-full h-full object-contain"
                src={activeVideoLightboxUrl}
                autoPlay
                controls
                loop
                playsInline
              />
            </div>
          </div>

          {/* Bottom Track / Playlist Quick Selection Row inside Lightbox */}
          <div className="relative z-10 w-full max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md mb-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-mono text-luxury-gold uppercase font-bold tracking-widest flex items-center gap-1">
                <Film className="w-3 h-3" /> Quick Switch Reel
              </span>
              <span className="text-[8px] font-mono text-neutral-400">
                Click to cast onto the Big Stage
              </span>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-1 custom-scrollbar">
              {reelsList.map((reel, rIdx) => {
                const trackUrl = customReelVideos[rIdx] || reel.videoUrl;
                const isSelected = activeVideoLightboxUrl === trackUrl;
                return (
                  <button
                    key={rIdx}
                    onClick={() => trackUrl && setActiveVideoLightboxUrl(trackUrl)}
                    className={`flex-shrink-0 flex items-center gap-2 p-1.5 pr-3 rounded-lg border transition-all text-left cursor-pointer ${
                      isSelected 
                        ? "bg-luxury-gold/20 border-luxury-gold text-white" 
                        : "bg-black/40 border-white/10 hover:border-white/25 text-neutral-300"
                    }`}
                  >
                    <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0 bg-stone-900 border border-white/10">
                      <img src={reel.poster} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                    </div>
                    <div className="ml-2">
                      <span className="text-[7.5px] font-mono text-neutral-400 block uppercase leading-none">Track {String(rIdx + 1).padStart(2, '0')}</span>
                      <span className="text-[9px] font-serif line-clamp-1 leading-snug">{reel.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. PLAYGROUND OF OUR HEARTS */}
      <section id="playground-of-our-hearts" className="max-w-5xl mx-auto w-full px-6 py-12 z-10">
        <div className="text-center mb-12">
          <p className="font-serif italic text-luxury-gold text-sm tracking-widest font-semibold uppercase">Intimate Interactions &amp; Challenges</p>
          <h2 className="font-serif text-3xl md:text-4xl font-extralight text-[#4E3629] mt-1 tracking-tight">Playground of Our Hearts</h2>
          <p className="text-[10px] tracking-widest font-sans uppercase text-luxury-brown/50 mt-1 max-w-md mx-auto">
            Play these cozy custom couple games designed specifically to celebrate our alignment.
          </p>
          <div className="h-[1px] w-12 bg-luxury-gold/50 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* GAME 1: THE PERFECT MATCH MEMORY GAME */}
          <div className="bg-white/60 p-6 md:p-8 rounded-3xl border border-[#EACBB0]/40 shadow-[0_12px_32px_rgba(92,64,51,0.02)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-luxury-gold" />
                  <h3 className="font-serif text-xl font-bold text-[#4E3629]">The Perfect Match</h3>
                </div>
                <span className="text-[10px] font-mono tracking-wider text-luxury-gold uppercase bg-white py-1 px-2.5 rounded-full border border-luxury-gold/20">
                  Moves: {memoryMoves}
                </span>
              </div>
              <p className="text-xs text-[#8B6E59] leading-relaxed mb-6 font-serif italic">
                Flip the cards to pair our sacred love tokens. Match all 8 pairs to decode Bishnu's intimate message ♾️
              </p>

              {/* Grid 4x4 */}
              {!memoryCompleted ? (
                <div className="grid grid-cols-4 gap-3 max-w-[320px] mx-auto">
                  {memoryCards.map((card, idx) => (
                    <div 
                      key={card.id}
                      onClick={() => handleCardClick(idx)}
                      className="aspect-square cursor-pointer card-perspective"
                    >
                      <div className={`w-full h-full relative card-inner rounded-xl shadow-xs transition-transform duration-500 transform-style-preserve-3d ${card.isFlipped || card.isMatched ? "rotate-y-180" : ""}`}>
                        {/* Front (Icon/Symbol Face) */}
                        <div className="absolute inset-0 bg-white border border-luxury-gold/45 rounded-xl flex items-center justify-center text-2xl backface-hidden rotate-y-180">
                          {card.symbol}
                        </div>
                        {/* Back (Cover/Envelope style Face) */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#F4EBE1] to-[#E8DDD0] border border-luxury-brown/10 rounded-xl flex items-center justify-center backface-hidden">
                          <Heart className="w-4 h-4 text-luxury-gold fill-luxury-gold/30" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Unlocked hidden message display with gorgeous styling */
                <div className="text-center py-10 px-4 bg-white rounded-2xl border border-luxury-gold/35 relative overflow-hidden animate-fade-in">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
                    <Heart className="w-40 h-40 text-luxury-gold fill-luxury-gold" />
                  </div>
                  
                  <Trophy className="w-12 h-12 text-luxury-gold mx-auto mb-4 animate-[bounce_1.5s_infinite]" />
                  <p className="font-mono text-[9px] tracking-widest text-[#A07855] uppercase font-bold mb-2">💎 UNLOCKED SOUL CODE 💎</p>
                  <blockquote className="font-serif italic text-lg text-[#4E3629] mb-4 font-semibold px-4 leading-relaxed">
                    "You will always be my perfect match, Mrs. Junior! ♾️"
                  </blockquote>
                  <p className="text-xs text-[#8B6E59]/80 leading-relaxed max-w-xs mx-auto mb-6">
                    Meticulously paired with raw passion, supreme loyalty, and boundless laughter.
                  </p>

                  <button 
                    onClick={initMemoryGame}
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#5C4033] bg-cream-base hover:bg-[#EBDCCB] border border-luxury-brown/10 py-2 px-4 rounded-xl transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> REPLAY MATCH
                  </button>
                </div>
              )}
            </div>

            {!memoryCompleted && (
              <div className="mt-6 text-center">
                <button 
                  onClick={initMemoryGame}
                  className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#8B6E59]/80 hover:text-[#4E3629] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> SHUFFLE CARDS BOARD
                </button>
              </div>
            )}
          </div>

          {/* GAME 2: HOW WELL DO YOU KNOW US? LOVE QUIZ */}
          <div className="bg-white/60 p-6 md:p-8 rounded-3xl border border-[#EACBB0]/40 shadow-[0_12px_32px_rgba(92,64,51,0.02)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-luxury-gold" />
                <h3 className="font-serif text-xl font-bold text-[#4E3629]">How Well Do You Know Us?</h3>
              </div>

              {quizStep === 0 ? (
                /* Start Step UI */
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-[#FAF6F0] flex items-center justify-center mx-auto mb-5 border border-luxury-gold/30">
                    <HeartHandshake className="w-8 h-8 text-luxury-gold" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#4E3629] mb-2">Intimate Couple Challenge</h4>
                  <p className="text-xs text-[#8B6E59] leading-relaxed max-w-xs mx-auto mb-6">
                    Prove your flawless wisdom about our golden history, Gudiya. Get all questions correct to open the shrine.
                  </p>
                  
                  <button 
                    onClick={() => setQuizStep(1)}
                    className="w-full py-3 bg-[#5C4033] hover:bg-[#4E3629] text-white font-mono text-xs tracking-widest rounded-xl shadow-md hover:scale-[1.02] active:scale-95 transition-all text-center"
                  >
                    INITIATE QUIZ ➔
                  </button>
                </div>
              ) : quizStep >= 1 && quizStep <= 3 ? (
                /* Question Steps */
                <div className="space-y-6">
                  {/* Indicator bar */}
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#A07855]">
                      Question 0{quizStep} of 03
                    </span>
                    <span className="h-1.5 w-24 bg-[#FAF6F0] rounded-full overflow-hidden block">
                      <span 
                        className="bg-luxury-gold h-full rounded-full block transition-all duration-300" 
                        style={{ width: `${(quizStep / 3) * 100}%` }}
                      ></span>
                    </span>
                  </div>

                  {/* Ask Statement */}
                  <div className="bg-[#FAF6F0] p-4.5 rounded-2xl border border-luxury-brown/5">
                    <h4 className="font-serif text-[17px] font-bold text-[#4E4E4E] leading-normal mb-1">
                      {quizQuestions[quizStep - 1].q}
                    </h4>
                    <p className="text-[10px] font-serif italic text-luxury-brown/50">
                      "{quizQuestions[quizStep - 1].caption}"
                    </p>
                  </div>

                  {/* Options layout */}
                  <div className="space-y-2.5">
                    {quizQuestions[quizStep - 1].options.map((option, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleQuizAnswer(option)}
                        className="w-full text-left py-3 px-4 rounded-xl border border-[#E8DCCB] hover:border-luxury-gold/50 bg-white/70 hover:bg-white text-xs font-medium text-[#4E3629] transition-all hover:scale-[1.01] flex items-center justify-between"
                      >
                        <span>{option}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-luxury-gold opacity-50" />
                      </button>
                    ))}
                  </div>

                  {/* Gentle helper messages on invalid checks */}
                  {quizError && (
                    <p className="text-[11px] text-[#A07855] text-center font-serif italic py-1 border border-[#EACBB0]/30 bg-rose-50/10 rounded-lg">
                      {quizError}
                    </p>
                  )}
                </div>
              ) : (
                /* Finished step */
                <div className="text-center py-8 relative">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#4E3629] mb-1.5 leading-tight">PERFECT WISDOM ACCOMPLISHED!</h4>
                  <p className="font-mono text-[9px] tracking-widest text-[#A07855] uppercase font-bold mb-3">🏅 Verified Mrs Junior 🏅</p>
                  
                  <blockquote className="font-serif italic text-sm text-[#4E3629]/90 max-w-xs mx-auto mb-6 bg-[#FAF6F0] p-4 rounded-xl border border-luxury-gold/20 leading-relaxed">
                    "I scored perfectly on our ledger. My love for Bishnu started beautifully on Jan 27, 2025 and only expands every single moment!"
                  </blockquote>

                  <button 
                    onClick={resetQuiz}
                    className="w-full py-3 bg-[#5C4033] hover:bg-[#4E3629] text-white font-mono text-xs tracking-widest rounded-xl shadow-md transition-all text-center hover:scale-[1.02]"
                  >
                    RESET &amp; TEST AGAIN ↺
                  </button>
                </div>
              )}
            </div>

            {quizStep > 0 && (
              <div className="mt-6 text-center border-t border-luxury-brown/5 pt-4">
                <button 
                  onClick={resetQuiz}
                  className="text-[10px] font-mono tracking-widest text-luxury-brown/50 hover:text-luxury-brown transition-colors"
                >
                  START ORIGINAL QUIZ FROM NODE ↺
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 4. THE GLOBAL CONFESSIONS GRID */}
      <section id="global-confessions-grid" className="max-w-5xl mx-auto w-full px-6 py-12 z-10">
        <div className="text-center mb-12">
          <p className="font-serif italic text-luxury-gold text-sm tracking-widest font-semibold uppercase">The Global Language Array</p>
          <h2 className="font-serif text-3xl md:text-4xl font-extralight text-[#4E3629] mt-1 tracking-tight">I Love You Babita in Every Language</h2>
          <p className="text-[10px] tracking-widest font-sans uppercase text-luxury-brown/50 mt-1 max-w-md mx-auto">
            Click on any dialect container to trigger floating ribbon 🎀 sparks around your point of touch.
          </p>
          <div className="h-[1px] w-12 bg-luxury-gold/50 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {loveMatrix.map((item, idx) => (
            <div
              key={idx}
              onClick={handleConfessionClick}
              className="bg-white/55 hover:bg-white border border-[#E8DCCB] hover:border-luxury-gold/50 rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-2xs hover:shadow-md relative overflow-hidden group select-none flex flex-col justify-between min-h-[145px]"
            >
              <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-3 h-3 text-luxury-gold" />
              </div>

              <div className="text-left">
                <span className="inline-block py-0.5 px-2 bg-cream-base border border-luxury-gold/15 rounded-full text-[9px] font-sans font-medium uppercase tracking-widest text-[#A07855] group-hover:bg-white transition-all">
                  {item.lang}
                </span>
              </div>

              <div className="my-3">
                <p className="font-serif text-[16px] md:text-[17px] font-bold text-[#4E3629] tracking-normal leading-snug">
                  {item.text}
                </p>
              </div>

              <div className="text-center border-t border-[#FAF6F0] pt-2">
                <p className="text-[10px] font-serif italic text-luxury-brown/50 leading-none">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. THE SEALED LETTER FROM YOUR HUSBAND */}
      <section id="sealed-envelope-block" className="max-w-4xl mx-auto w-full px-6 py-16 z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <p className="font-serif italic text-luxury-gold text-sm tracking-widest font-semibold uppercase">The Sacred Sanctuary Note</p>
          <h2 className="font-serif text-3xl md:text-4xl font-extralight text-[#4E3629] mt-1 tracking-tight">The Sealed Letter</h2>
          <p className="text-[10px] tracking-widest font-sans uppercase text-luxury-brown/50 mt-1">Written with pure raw devotion by Bishnu</p>
          <div className="h-[1px] w-12 bg-luxury-gold/50 mx-auto mt-4"></div>
        </div>

        {/* Outer Sealed Envelope / Unfolding letter layout */}
        <div className="w-full max-w-[550px] relative">
          
          {!envelopeOpen ? (
            /* CLOSED WAXY SEALED ENVELOPE */
            <div 
              onClick={() => {
                setEnvelopeOpen(true);
                setTimeout(() => setLetterRevealed(true), 350);
              }}
              className="bg-[#F3EAE0] p-6 md:p-8 rounded-3xl shadow-2xl border border-luxury-brown/15 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 flex flex-col justify-between aspect-[16/11] relative overflow-hidden group select-none"
            >
              {/* Internal subtle paper background textures */}
              <div className="absolute inset-0 bg-[#E8DDD0] opacity-40 [background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px)] [background-size:100%_18px]"></div>

              {/* Gold wax seal centerpiece */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center animate-pulse">
                <div className="w-18 h-18 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-[0_8px_25px_rgba(212,175,55,0.45)] border-2 border-[#C29D29] group-hover:scale-115 transition-transform duration-300 relative">
                  <Heart className="w-7 h-7 text-white fill-white" />
                  <div className="absolute inset-1.5 border border-dashed border-white/20 rounded-full animate-spin-slow"></div>
                </div>
                <span className="mt-3.5 text-[8.5px] tracking-[0.22em] font-bold text-luxury-brown bg-[#FAF6F0] py-1.5 px-3.5 rounded-full border border-[#D4AF37]/35 shadow-xs uppercase">
                  TAP SEVENTH FLAP SECURELY
                </span>
              </div>

              {/* Envelope headers */}
              <div className="flex justify-between items-start z-0 relative">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#A07855] block">SENDER CREDENTIAL</span>
                  <span className="font-serif italic font-semibold text-xs text-luxury-brown">Bishnu, Hubby 🎀</span>
                </div>
                <div>
                  <span className="inline-block py-1 px-2.5 bg-white/60 border border-luxury-brown/10 rounded-md text-[9px] tracking-wider uppercase font-semibold font-mono text-luxury-brown/75">
                    GOLD SECTOR 01
                  </span>
                </div>
              </div>

              {/* Envelope delivery address details */}
              <div className="text-center mb-2 z-0 relative">
                <span className="text-[9px] uppercase tracking-wider text-luxury-brown/40 block">EXCLUSIVELY DESIGNED FOR</span>
                <span className="font-serif text-xl font-light text-luxury-brown">Mrs. Babita (My Beautiful Gudiya)</span>
                <span className="block text-[10px] italic font-serif text-[#A07855] mt-1">"Celebrating 1 Year &amp; 5 Month Milestone"</span>
              </div>
            </div>
          ) : (
            /* OPENED DETAILED LOVE LETTER CONTENT GRID WITH FADE IN */
            <div 
              className={`bg-white border border-[#E8DCCB] rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden transition-all duration-700 ${letterRevealed ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}
            >
              <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent"></div>
              
              {/* Back button to let users re-seal waxy envelope */}
              <button 
                onClick={() => {
                  setLetterRevealed(false);
                  setTimeout(() => setEnvelopeOpen(false), 300);
                }}
                className="absolute top-5 right-5 text-luxury-brown/40 hover:text-luxury-brown transition-colors p-2 rounded-full hover:bg-cream-base/60"
                title="Seal Envelope"
              >
                <ArrowRight className="w-4 h-4 transform rotate-180" />
              </button>

              <div className="prose prose-stone text-luxury-brown">
                
                {/* Header title */}
                <div className="border-b border-cream-base pb-6 mb-6">
                  <div className="inline-flex items-center gap-2 py-1 px-3 bg-[#FAF6F0] rounded-full border border-luxury-gold/20 text-[9px] uppercase tracking-widest font-mono font-bold text-luxury-gold">
                    <Star className="w-3 h-3 fill-current animate-pulse" /> ETERNAL MEMOIR FROM BISHNU
                  </div>
                  <p className="text-[11px] font-mono tracking-wide text-luxury-brown/50 mt-2.5 uppercase text-left">
                    TIMELINE CODE: Jan 27, 2025 – PRESENT Golden ERA
                  </p>
                </div>

                {/* Extended, Deeply Poetic Love Letter content */}
                <div className="space-y-6 font-serif text-[15px] leading-relaxed text-justify font-light max-h-[380px] overflow-y-auto pr-3 custom-scrollbar text-[#4E3629]">
                  <p className="italic font-medium text-lg text-left text-luxury-gold">
                    My Beautiful Gudiya, My Absolute Pasandida Aurat,
                  </p>
                  
                  <p>
                    From the exact cosmic alignments of January 27, 2025, my entire existence became a beautiful poem. Today, as we commemorate this deep and sacred 1 Year and 5 Months milestone, I find myself looking back with profound gratitude and looking forward with boundless hope.
                  </p>

                  <p>
                    You are my Princess November, my Mrs. Junior, the one whose gentle voice has the absolute power to calm the rowdiest waves within my chest. Every morning message from you remains my favorite ritual, and every soft chuckle we share over our ridiculous inside jokes is a memory I treasure like pure gold.
                  </p>

                  <p>
                    Thank you for teaching me how beautiful it is to be understood without words. Thank you for your unwavering loyalty, your impeccable patience, and the boundless grace you bring into my world. In a universe governed by chaotic shifts, you are my singular constant.
                  </p>

                  <p>
                    As your hubby, I want to reiterate the quiet promise I made to you on our very first day: to protect you with everything that I am, to always honor your kind spirit, and to build a peaceful haven for us where your 🎀 ribbons can dance freely to the song of our endless futures.
                  </p>

                  <p className="italic font-semibold text-center text-luxury-gold/90 mt-4">
                    Happy 1 Year and 5 Months of Us, My Beautiful Wife.
                  </p>
                </div>

                {/* Sign-off element block */}
                <div className="mt-8 border-t border-[#FAF6F0] pt-6 flex flex-col items-end">
                  <p className="font-serif text-[11px] uppercase tracking-wider text-luxury-brown/40">Yours Devotedly &amp; Everlasting,</p>
                  <p className="font-serif text-lg font-bold text-[#4E3629] mt-1.5 flex items-center gap-1.5">
                    Bishnu <span className="text-[#D4AF37] text-md">🎀</span>
                  </p>
                  <p className="text-[10px] tracking-widest font-sans uppercase text-luxury-brown/50 mt-0.5">Your Hubby &amp; Boundless Partner</p>
                </div>

              </div>
            </div>
          )}
        </div>
      </section>

      {/* FLOATING MOUSE MOVEMENT INTERACTION RIBBON EMITTER */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {ribbons.map((rib) => (
          <span
            key={rib.id}
            className="absolute text-2xl filter drop-shadow opacity-100 select-none animate-[float-particle_1.2s_ease-out_forwards]"
            style={{
              left: `${rib.x}px`,
              top: `${rib.y}px`,
              "--x-offset": `${(Math.random() - 0.5) * 160}px`,
              "--rot-offset": `${(Math.random() - 0.5) * 360}deg`
            } as React.CSSProperties}
          >
            {rib.label}
          </span>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-[#FAF6F0] border-t border-luxury-brown/5 py-12 text-center z-10 px-6 mt-12 relative">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-2.5 mb-3.5">
            <Heart className="w-4 h-4 text-luxury-gold fill-luxury-gold animate-pulse" />
            <span className="font-serif text-xs tracking-[0.2em] text-[#8B6E59] uppercase font-bold">BISHNU &amp; BABITA ETERNAL MEMOIR CLAN</span>
            <Heart className="w-4 h-4 text-luxury-gold fill-luxury-gold animate-pulse" />
          </div>
          <p className="font-serif italic text-sm text-[#8B6E59]/80 leading-relaxed max-w-lg mb-2">
            "In the garden of boundless infinity, you are my serene blossom."
          </p>
          <p className="text-[10px] tracking-[0.22em] uppercase font-sans text-luxury-brown/40 mt-3.5">
            © 2025 - 2026. Designed with extreme devotion &amp; flawless grace by Bishnu. All Heavens Witnessed.
          </p>
        </div>
      </footer>

      {/* CUSTOM LUXE HIGH-END STYLES FOR MARQUEES AND SCROLLS */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes float-particle {
          0% {
            transform: translate3d(0, 0, 0) scale(0.65) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--x-offset, 0px), -150px, 0) scale(1.15) rotate(var(--rot-offset, 180deg));
            opacity: 0;
          }
        }
        .animate-spin-slow {
          animation: spin 16s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(92, 64, 51, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.4);
          border-radius: 9px;
        }

        /* 3D memory card flip styles */
        .card-perspective {
          perspective: 800px;
        }
        .card-inner {
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  );
}
