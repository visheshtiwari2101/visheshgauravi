import { weddingConfig } from "@/config/config";
import { RangoliDivider } from "@/components/DecorativeElements";
import CharacterScene from "@/components/CharacterScene";
import { Instagram, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-wedding-border/70 bg-wedding-surface/70 px-4 py-12 text-center">
      <div className="mx-auto max-w-3xl">
        <img
          src={weddingConfig.logo}
          alt={`${weddingConfig.brideName} and ${weddingConfig.groomName} monogram`}
          loading="lazy"
          className="mx-auto h-28 w-28 object-contain"
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
        <section aria-labelledby="contact-heading" className="wedding-contact mx-auto mt-7 max-w-lg border-t border-wedding-accent/40 pt-5">
          <h3 id="contact-heading" className="font-display text-xl text-wedding-primary">Stay Connected / Need Help?</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {[
              { name: weddingConfig.groomName, phone: "+91 99932 32828", tel: "+919993232828", instagram: weddingConfig.socialLinks.instagram[0] },
              { name: weddingConfig.brideName, phone: "+91 79051 95659", tel: "+917905195659", instagram: weddingConfig.socialLinks.instagram[1] },
            ].map(person => <div key={person.name}>
              <p className="mb-2 text-sm font-bold text-wedding-primary">{person.name}</p>
              <div className="flex flex-col items-center gap-2">
                <a className="wedding-contact-link" href={`https://${person.instagram}`} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on Instagram`}>
                  <Instagram aria-hidden="true" size={16} />@{person.instagram!.split("/").pop()}
                </a>
                <a className="wedding-contact-link" href={`tel:${person.tel}`} aria-label={`Call ${person.name} at ${person.phone}`}>
                  <Phone aria-hidden="true" size={15} />{person.phone}
                </a>
              </div>
            </div>)}
          </div>
        </section>
      </div>
    </footer>
  );
}
