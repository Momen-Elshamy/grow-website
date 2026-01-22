/**
 * Scrolls to a section by ID or navigates to a page
 * @param {string} sectionId - The ID of the section to scroll to, or page name to navigate to
 */
export const scrollToSection = (sectionId) => {
  if (typeof window === "undefined") return;

  // First, try to find an element with the given ID on the current page
  const element = document.getElementById(sectionId);
  
  if (element) {
    // Element found, scroll to it smoothly
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    // Element not found, navigate to the page
    // For "contact", navigate to /contact
    if (sectionId === "contact") {
      window.location.href = "/contact";
    } else {
      // For other sections, try to navigate to the page
      window.location.href = `/${sectionId}`;
    }
  }
};
