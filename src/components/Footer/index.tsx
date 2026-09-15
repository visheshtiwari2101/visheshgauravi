import { weddingConfig } from "@/config/config";
import { RangoliDivider } from "@/components/DecorativeElements";
import CharacterScene from "@/components/CharacterScene";

export default function Footer() {
  return (
    <footer className="relative border-t border-wedding-border/70 bg-wedding-surface/70 px-4 py-12 text-center">
      <div className="mx-auto max-w-3xl">
        <img
          src={weddingConfig.logo}
          alt={`${weddingConfig.brideName} and ${weddingConfig.groomName} monogram`}
          loading="lazy"
          className="mx-auto h-28 w-28 rounded-full border border-wedding-border object-cover"
        />
        <h2 className="mt-4 font-display text-2xl text-wedding-primary">
          {weddingConfig.groomName} <span className="text-wedding-secondary">&</span>{" "}
          {weddingConfig.brideName}
        </h2>
        <p className="mt-1 text-sm text-wedding-text/75">{weddingConfig.weddingDate} · Jhansi</p>
        <p className="script-note mt-2">{weddingConfig.hashtag}</p>

        <p className="script-note mt-6">Thank you for celebrating with us</p>

        <RangoliDivider className="mt-4" />

        <CharacterScene type="finale" className="mx-auto mt-6 h-36 w-auto sm:h-44" />
      </div>
    </footer>
  );
}
