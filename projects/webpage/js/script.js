/**MENU JS */

/**setting event listeners for menu select buttons */
let horizontal = document.getElementById("horizontal");
let vertical = document.getElementById("vertical");
let slider = document.getElementById("slideout");
let menu = document.getElementById("menu");
let toggle = document.getElementById("toggle");
/*changing menu styles*/
horizontal.addEventListener("click", () => {
  console.log("horizontal");
  toggle.style.display = "none";
  menu.classList.remove("slideout");
  menu.classList.remove("vertical");
  menu.classList.add("horizontal");
});
vertical.addEventListener("click", () => {
  console.log("vertical");
  toggle.style.display = "none";
  menu.classList.remove("horizontal");
  menu.classList.remove("slideout");
  menu.className = "vertical";
});
slider.addEventListener("click", () => {
  console.log("slider");
  toggle.style.display = "block";
  menu.classList.remove("horizontal");
  menu.classList.remove("vertical");
  menu.classList.add("slideout");
});
toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

/**background JS*/

/**getting background elements  need to change */

let background = document.getElementById("backgroundSelector");

background.addEventListener("change", () => {
  /**get user selected color from radio buttons */
  let color = document.querySelector('input[name="background"]:checked').value;

  /**change background color */
  document.body.style.backgroundColor = color;
});

/**font JS */

/**getting font choices to change */
let font = document.getElementById("fontSelector");
let title = document.getElementById("fontChange");

font.addEventListener("change", () => {
  /**get user selected font from font option select */

  let fontChoice = document.querySelector('select[name="font"]').value;
  /**change font */
  title.style.fontFamily = fontChoice;
});


