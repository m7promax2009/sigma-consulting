import { X, Volume2, VolumeX, ExternalLink } from "lucide-react";
import { InstagramIcon } from "./Icons";
import { useLanguage } from "../contexts/LanguageContext";

export default function VideoModal({ video, onClose }) {
  const { t } = useLanguage();
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in-down">
      <div className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-[#236B70]/60 bg-[#072126] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#0B343B] bg-[#041316] px-4 py-3">
          <div className="flex items-center gap-2">
            <InstagramIcon className="h-4 w-4 text-[#D5A45B]" />
            <span className="text-xs font-semibold text-[#E2ECE8]">
              @sigmaconsulting.uz
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#9EB3AD] hover:bg-[#0B343B] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-[9/16] w-full bg-black">
          <video
            src={video.src}
            autoPlay
            controls
            playsInline
            className="h-full w-full object-cover"
          />
        </div>

        {/* Caption Info */}
        <div className="border-t border-[#0B343B] bg-[#051B1F] p-4 text-left">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-[#E2ECE8]">{video.studentName}</h4>
            <span className="rounded-full border border-[#D5A45B]/40 bg-[#D5A45B]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#D5A45B]">
              {video.country}
            </span>
          </div>
          <p className="mt-1 text-xs text-[#9EB3AD]">{video.university}</p>
          <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#0B343B]/60 text-xs">
            <span className="text-[#D5A45B] font-semibold">{video.achievement}</span>
            <a
              href="https://instagram.com/sigmaconsulting.uz"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[#9EB3AD] hover:text-white"
            >
              <span>{t("reels_view_instagram_modal")}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
