/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

const sections = document.getElementsByTagName("section");
const navbarList = document.getElementById("navbar__list");
const navItems = document.querySelectorAll("#navbar__list li");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function isSectionNearTop(element) {
  // provides the element’s position and its relative position to the viewport
  const rect = element.getBoundingClientRect();
  // true if the element is near the top
  return (
    rect.top >= 0 &&
    rect.top <=
      0.4 * (window.innerHeight || document.documentElement.clientHeight)
  );
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the navbar

for (let i = 1; i <= sections.length; i++) {
  //Create anchor element
  const navItem = document.createElement("a");
  //Add the text to the a elements
  navItem.textContent = `Section ${i}`;
  //Add class to every a element
  navItem.className = "menu__link";
  //Set href attribute so everytime we click an a element on our navbar we will be directed to the section selected on the site
  navItem.setAttribute("href", `#section${i}`);
  //Append the a elements creted withnthe for loop to the navbarList
  navbarList.appendChild(navItem);
}

// Add class 'active' to section when near top of viewport

function addActiveClassToSection(sections) {
  for (const section of sections) {
    // define activeSection in order to to be able to see which section is active in our navbar
    const activeSection = document.querySelector(
      `a[href="#${section.getAttribute("id")}"]`
    );
    // if the section is near the top the class active will be added to that section and
    if (isSectionNearTop(section)) {
      section.classList.add("active");
      activeSection.classList.add("menu__link--active");
    }
    // if the section is not near the top the class active will be removed
    else {
      section.classList.remove("active");
      activeSection.classList.remove("menu__link--active");
    }
  }
}

// Scroll to anchor ID using scrollTO event

// Create button up

function createButtonUp() {
  const buttonUp = `<a href="#" class="button hide">🔝</a>`;
  document.body.insertAdjacentHTML("afterbegin", buttonUp);
}

function showButtonUp() {
  // Create button
  const button = document.querySelector(".button");
  // Hide button
  if (window.pageYOffset <= 0.6 * window.innerHeight) {
    button.classList.add("hide");
  } else {
    button.classList.remove("hide");
    // If the class hide has been removed (button visible)
    button.addEventListener("click", function (event) {
      event.preventDefault();
      // Scroll to top of page when click the button
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  }
}

/**
 * End Main Functions
 * Begin Events
 *
 */

document.addEventListener("DOMContentLoaded", function () {
  createButtonUp();

  // Build menu

  // Scroll to section on link click

  document
    .getElementById("navbar__list")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const target = event.target;
      if (target.classList.contains("menu__link")) {
        const id = target.getAttribute("href").slice(1);
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
      }
    });

  // Set sections as active and show button up after 1st screen
  setTimeout(
    window.addEventListener("scroll", function () {
      addActiveClassToSection(sections);
      showButtonUp();
    })
  );
});
