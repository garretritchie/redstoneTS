import { getContent } from "./contentStore";

export const siteConfig = {
  get name() { return getContent().site.site.name; },
  get url() { return getContent().site.site.url; },
  phone: {
    get display() { return getContent().site.contact.phoneDisplay; },
    get localDisplay() { return getContent().site.contact.phoneLocalDisplay; },
    get href() { return getContent().site.contact.phoneHref; },
    get schema() { return getContent().site.contact.phoneSchema; },
  },
  email: {
    get display() { return getContent().site.contact.emailDisplay; },
    get href() { return getContent().site.contact.emailHref; },
  },
  address: {
    get street() { return getContent().site.address.street; },
    get short() { return getContent().site.address.short; },
    get locality() { return getContent().site.address.locality; },
    get region() { return getContent().site.address.region; },
    get country() { return getContent().site.address.country; },
    get countryCode() { return getContent().site.address.countryCode; },
    get mapHref() { return getContent().site.address.mapHref; },
  },
  social: {
    get linkedin() { return getContent().site.contact.linkedin; },
  },
};

export const siteContent = {
  get homeHero() { return getContent().site.homeHero; },
  get analytics() { return getContent().site.analytics; },
};
