import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX, Sparkles, Maximize2, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { InstagramIcon } from "./Icons";
import VideoModal from "./VideoModal";
import { otzivReels } from "../data/reels";
import { useLanguage } from "../contexts/LanguageContext";

export default function VideoReelsStrip({
  title = "Talabalarimizning Real Video Otzivlari",
  subtitle = "Instagram @sigmaconsulting.uz sahifamizdan saralangan jonli natijalar va vizalar"
}) {
  const { t, lang } = useLanguage();
  const [activeModalVideo, setActiveModalVideo] = useState(null);
  const [mutedStates, setMutedStates] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  const carouselRef = useRef(null);
  const videoRefs = useRef({});
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Replicate 3 times for completely seamless infinite loop
  const displayItems = [...otzivReels, ...otzivReels, ...otzivReels];

  // Continuous buttery smooth auto-gliding carousel via requestAnimationFrame
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    // Normal glide speed: 38px/sec, slow down to 12px/sec on hover, pause only when modal is open
    const step = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!activeModalVideo && !isInteracting && el) {
        const speed = isHovered ? 12 : 38;
        el.scrollLeft += speed * deltaTime;

        // One-third width is the exact length of one set of items
        const singleSetWidth = el.scrollWidth / 3;
        if (singleSetWidth > 0 && el.scrollLeft >= singleSetWidth) {
          el.scrollLeft -= singleSetWidth;
        }
      }

      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeModalVideo, isHovered, isInteracting]);

  // Smooth manual skip handler for Left/Right arrows
  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === "left" ? -280 : 280;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const toggleSound = (key, e) => {
    e.stopPropagation();
    const vid = videoRefs.current[key];
    if (vid) {
      vid.muted = !vid.muted;
      setMutedStates((prev) => ({ ...prev, [key]: vid.muted }));
    }
  };

  return (
    <section className="relative w-full min-w-0">
      <div className="relative w-full min-w-0 overflow-hidden rounded-3xl bg-[#0B343B] border border-[#236B70]/40 py-8 sm:py-10 px-4 sm:px-8 text-white shadow-2xl">
        {/* Glow ambient background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#104F5A]/25 blur-3xl -z-10" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[#236B70]/20 blur-3xl -z-10" />

        {/* Section Header & Navigation Controls */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5A45B]/40 bg-[#D5A45B]/10 px-3.5 py-1 text-xs font-bold text-[#D5A45B] shadow-sm">
              <InstagramIcon className="h-3.5 w-3.5 text-[#D5A45B]" />
              <span>@SIGMACONSULTING.UZ REELS</span>
            </div>
            <h2 className="mt-2.5 text-2xl font-black text-white sm:text-3xl 2xl:text-4xl">
              {title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
              {subtitle}
            </p>
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#236B70]/60 bg-[#104F5A]/60 text-white transition-all hover:border-[#D5A45B] hover:bg-[#D5A45B] hover:text-[#071F22] hover:scale-105 active:scale-95 shadow-md"
              title="Oldingi video / Previous"
              aria-label="Previous video"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#236B70]/60 bg-[#104F5A]/60 text-white transition-all hover:border-[#D5A45B] hover:bg-[#D5A45B] hover:text-[#071F22] hover:scale-105 active:scale-95 shadow-md"
              title="Keyingi video / Next"
              aria-label="Next video"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
          className="relative w-full min-w-0"
        >
          {/* Edge shadow fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-16 bg-gradient-to-r from-[#0B343B] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-16 bg-gradient-to-l from-[#0B343B] to-transparent" />

          {/* Smooth Auto-gliding Track */}
          <div
            ref={carouselRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto py-2 px-1 no-scrollbar select-none cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {displayItems.map((item, idx) => {
              const key = `${item.id}-${idx}`;
              const isMuted = mutedStates[key] !== false;
              const countryText = typeof item.country === "object" ? (item.country[lang] || item.country.uz) : item.country;
              const achievementText = typeof item.achievement === "object" ? (item.achievement[lang] || item.achievement.uz) : item.achievement;

              return (
                <div
                  key={key}
                  onClick={() => setActiveModalVideo(item)}
                  className="group relative w-[200px] sm:w-[230px] lg:w-[250px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-[#236B70]/40 bg-black shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-2 hover:border-[#D5A45B] hover:shadow-[0_15px_40px_rgba(213,164,91,0.25)] select-none"
                >
                  {/* Autoplaying Loop Video */}
                  <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
                    <video
                      ref={(el) => (videoRefs.current[key] = el)}
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlays */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B343B] via-transparent to-black/60" />

                    {/* Top Badges */}
                    <div className="absolute left-2.5 top-2.5 right-2.5 flex items-center justify-between z-10">
                      <span className="flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-0.5 text-[10px] font-bold text-[#D5A45B] backdrop-blur-md border border-[#D5A45B]/40 shadow-sm">
                        <InstagramIcon className="h-3 w-3 text-[#D5A45B]" />
                        <span>Reels</span>
                      </span>

                      {/* Sound & Expand controls */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => toggleSound(key, e)}
                          className="rounded-full bg-black/70 p-1.5 text-white backdrop-blur-md transition-all hover:bg-[#D5A45B] hover:text-[#071F22] hover:scale-110"
                          title={isMuted ? t("reels_sound_on") : t("reels_sound_off")}
                        >
                          {isMuted ? (
                            <VolumeX className="h-3.5 w-3.5 text-[#D5A45B]" />
                          ) : (
                            <Volume2 className="h-3.5 w-3.5 text-[#D5A45B]" />
                          )}
                        </button>
                        <div className="rounded-full bg-black/70 p-1.5 text-white backdrop-blur-md group-hover:bg-[#D5A45B] group-hover:text-[#071F22] transition-colors">
                          <Maximize2 className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Center Play Icon Hover Effect */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D5A45B]/90 text-[#071F22] shadow-[0_0_20px_rgba(213,164,91,0.6)] transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Student Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3.5 text-left z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#D5A45B] transition-colors">
                          {item.studentName}
                        </span>
                        {item.views && (
                          <span className="text-[10px] font-bold text-[#D5A45B] bg-[#D5A45B]/15 px-1.5 py-0.5 rounded-full">
                            {item.views}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-[#D5A45B] block mt-0.5">
                        {countryText}
                      </span>
                      <p className="mt-0.5 text-[10px] text-slate-300 line-clamp-1">
                        {item.university}
                      </p>
                      <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-[#104F5A]/85 px-2 py-0.5 text-[10px] font-bold text-white border border-[#236B70]/60 shadow-sm">
                        <Sparkles className="h-2.5 w-2.5 text-[#D5A45B]" />
                        <span className="line-clamp-1">{achievementText}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA to Instagram */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row border-t border-[#236B70]/30 pt-6">
          <p className="text-xs text-slate-300">
            {t("reels_all_videos")}
          </p>
          <a
            href="https://instagram.com/sigmaconsulting.uz"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#D5A45B]/50 bg-[#104F5A]/80 px-5 py-2.5 text-xs font-bold text-[#D5A45B] transition-all hover:bg-[#D5A45B] hover:text-[#071F22] hover:scale-105 shadow-md"
          >
            <InstagramIcon className="h-4 w-4" />
            <span>{t("reels_view_instagram")}</span>
          </a>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      <VideoModal
        video={activeModalVideo}
        onClose={() => setActiveModalVideo(null)}
      />
    </section>
  );
}
