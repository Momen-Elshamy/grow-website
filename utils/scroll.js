const SERVICES_HEADER_OFFSET = 140; // main header (80px) + services sub-nav (~60px)

export const scrollToSection = (sectionId, headerOffset = 80) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    const finalPosition = Math.max(0, offsetPosition);

    window.scrollTo({
      top: finalPosition,
      behavior: "smooth",
    });
  }
};

export const scrollToSectionAfterNavigate = (sectionId) => {
  const offset =
    typeof window !== "undefined" && window.location?.pathname === "/services"
      ? SERVICES_HEADER_OFFSET
      : 80;
  const scroll = () => scrollToSection(sectionId, offset);
  [400, 700, 1200].forEach((delay) => setTimeout(scroll, delay));
};