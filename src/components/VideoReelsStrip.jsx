import { useState, useRef } from "react";
import { Volume2, VolumeX, Sparkles, Maximize2 } from "lucide-react";
import { InstagramIcon } from "./Icons";
import VideoModal from "./VideoModal";
import { otzivReels } from "../data/reels";
import { useLanguage } from "../contexts/LanguageContext";


export default function VideoReelsStrip({ title = "Talabalarimizning Real Video Otzivlari", subtitle = "Instagram @sigmaconsulting.uz sahifamizdan saralangan jonli natijalar va vizalar" }) {
  const { t } = useLanguage();
  const [activeModalVideo, setActiveModalVideo] = useState(null);
  const [mutedStates, setMutedStates] = useState({});
  const videoRefs = useRef({});

  const toggleSound = (key, e) => {
    e.stopPropagation();
    const vid = videoRefs.current[key];
    if (vid) {
      vid.muted = !vid.muted;
      setMutedStates((prev) => ({ ...prev, [key]: vid.muted }));
    }
  };

  // Cheksiz aylanish uchun ro'yxatni 2 martta takrorlaymiz
  const loopItems = [...otzivReels, ...otzivReels];

  return (
    <section className="relative w-full min-w-0">
      <div className="relative w-full min-w-0 overflow-hidden rounded-3xl bg-[#0B343B] border border-[#236B70]/40 py-8 sm:py-10 px-4 sm:px-8 text-white shadow-xl">
        {/* Glow accent */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#104F5A]/20 blur-3xl" />

        {/* Section Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#236B70]/50 bg-[#104F5A]/40 px-3.5 py-1 text-xs font-bold text-[#D9E2DE]">
            <InstagramIcon className="h-3.5 w-3.5" />
            <span>@SIGMACONSULTING.UZ REELS</span>
          </div>
          <h2 className="mt-3 text-2xl font-black text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-300">
            {subtitle}
          </p>
        </div>

        {/* Infinite Marquee Carousel (Otziv Reels) */}
        <div className="group/marquee relative w-full min-w-0 overflow-hidden">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0B343B] to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0B343B] to-transparent sm:w-20" />

          <div className="flex w-max marquee-track group-hover/marquee:[animation-play-state:paused]">
            {loopItems.map((item, idx) => {
              const key = `${item.id}-${idx}`;
              return (
                <div key={key} className="shrink-0 pr-4">
                <div
                  onClick={() => setActiveModalVideo(item)}
                  className="group relative w-[180px] cursor-pointer overflow-hidden rounded-2xl border border-[#236B70]/40 bg-black shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-2 hover:border-[#D9E2DE] hover:shadow-[0_15px_40px_rgba(217,226,222,0.15)] sm:w-[210px] lg:w-[230px]"
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
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B343B] via-transparent to-black/50" />

                    {/* Top Badges */}
                    <div className="absolute left-2.5 top-2.5 right-2.5 flex items-center justify-between">
                      <span className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-[#D9E2DE] backdrop-blur-md border border-[#236B70]/50">
                        <InstagramIcon className="h-3 w-3" />
                        <span>Reels</span>
                      </span>

                      {/* Sound & Expand controls */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => toggleSound(key, e)}
                          className="rounded-full bg-black/70 p-1.5 text-white backdrop-blur-md transition-colors hover:bg-[#D9E2DE] hover:text-[#071F22]"
                          title={mutedStates[key] === false ? t("reels_sound_off") : t("reels_sound_on")}
                        >
                          {mutedStates[key] === false ? (
                            <Volume2 className="h-3.5 w-3.5 text-[#D9E2DE]" />
                          ) : (
                            <VolumeX className="h-3.5 w-3.5 text-[#D9E2DE]" />
                          )}
                        </button>
                        <div className="rounded-full bg-black/70 p-1.5 text-[#E2ECE8] backdrop-blur-md group-hover:bg-[#D9E2DE] group-hover:text-[#071F22]">
                          <Maximize2 className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Student Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#E2ECE8] line-clamp-1">
                          {item.studentName}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-[#D9E2DE] block mt-0.5">
                        {item.country}
                      </span>
                      <p className="mt-0.5 text-[10px] text-[#9EB3AD] line-clamp-1">
                        {item.university}
                      </p>
                      <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-[#104F5A]/70 px-2 py-0.5 text-[10px] font-bold text-[#D9E2DE] border border-[#236B70]/50">
                        <Sparkles className="h-2.5 w-2.5 text-[#D9E2DE]" />
                        <span className="line-clamp-1">{item.achievement}</span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA to Instagram */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <p className="text-xs text-[#9EB3AD]">
            {t("reels_all_videos")}
          </p>
          <a
            href="https://instagram.com/sigmaconsulting.uz"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#236B70]/60 bg-[#104F5A] px-4 py-2 text-xs font-bold text-[#D9E2DE] transition-all hover:bg-[#D9E2DE] hover:text-[#071F22]"
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
