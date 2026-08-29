export const studioContact = {
  email: "ahpixel.studio@gmail.com",
  phone: "51930978999",
  phoneDisplay: "+51 930 978 999",
  whatsappMessage: {
    es: "Hola AHPixel Studio, quisiera conversar sobre un proyecto web.",
    en: "Hello AHPixel Studio, I would like to discuss a website project.",
  },
} as const;

export function createWhatsAppUrl(
  message: string = studioContact.whatsappMessage.es,
  phone: string = studioContact.phone,
) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
