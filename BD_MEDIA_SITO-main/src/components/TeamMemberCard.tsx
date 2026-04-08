import { useState } from "react";
import { X } from "lucide-react";

interface TeamMemberCardProps {
  photo: string;
  name: string;
  role: string;
  bio: string;
}

const TeamMemberCard = ({ photo, name, role, bio }: TeamMemberCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-card transition-colors hover:border-primary/30"
      style={{ aspectRatio: "3/4" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
    >
      {/* Photo */}
      <img
        src={photo}
        alt={name}
        loading="lazy"
        width={400}
        height={533}
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Name & role (always visible at bottom) */}
      <div className={`absolute inset-x-0 bottom-0 px-4 py-4 text-center transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}>
        <h3 className="text-sm font-bold leading-tight">{name}</h3>
        <p className="mt-1 text-xs text-primary">{role}</p>
      </div>

      {/* Hover / tap overlay */}
      <div
        className={`absolute inset-0 flex flex-col bg-black/90 backdrop-blur-sm transition-all duration-300 ease-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Close button (mobile) */}
        <button
          className="absolute right-3 top-3 z-10 text-primary md:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
          aria-label="Chiudi"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-1 flex-col items-start justify-start overflow-y-auto px-5 pt-6 pb-4">
          <h3
            className={`text-xl font-extrabold text-primary transition-all duration-300 delay-75 ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {name}
          </h3>
          <p
            className={`mt-1 text-sm font-medium text-foreground transition-all duration-300 delay-100 ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {role}
          </p>

          <div
            className={`mt-4 h-0.5 w-12 bg-primary transition-all duration-300 delay-150 ${
              open ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            } origin-left`}
          />

          <div
            className={`mt-4 space-y-3 text-[13px] leading-relaxed text-muted-foreground transition-all duration-300 delay-200 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {bio.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
