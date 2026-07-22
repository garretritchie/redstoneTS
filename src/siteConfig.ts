import settings from "../content/site/settings.json";

export const siteContent = settings;

export const siteConfig = {
  name: settings.site.name,
  url: settings.site.url,
  phone: {
    display: settings.contact.phoneDisplay,
    localDisplay: settings.contact.phoneLocalDisplay,
    href: settings.contact.phoneHref,
    schema: settings.contact.phoneSchema,
  },
  email: {
    display: settings.contact.emailDisplay,
    href: settings.contact.emailHref,
  },
  address: {
    street: settings.address.street,
    short: settings.address.short,
    locality: settings.address.locality,
    region: settings.address.region,
    country: settings.address.country,
    countryCode: settings.address.countryCode,
    mapHref: settings.address.mapHref,
  },
  social: {
    linkedin: settings.contact.linkedin,
  },
};
