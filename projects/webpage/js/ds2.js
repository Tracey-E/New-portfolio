function Mode(e) {
  let main = document.getElementById("main");
  if (main.classList.length > 0) {
    main.classList = "";
    main.classList.add(e);
  } else {
    main.classList.add(e);
  }
}

