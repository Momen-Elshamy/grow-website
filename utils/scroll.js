export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 80; // Adjust based on your header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    // Ensure we don't scroll to a negative position
    const finalPosition = Math.max(0, offsetPosition);

    window.scrollTo({
      top: finalPosition,
      behavior: "smooth",
    });
  }
};