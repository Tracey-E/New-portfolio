function prev() {
    let current = document.querySelector(".active");
  
    let counter = document.getElementById("count");
  
    let count = counter.innerText;
  
    if (parseInt(count) === 1) {
      current.classList.remove("active");
      current.style.visibility = "hidden";
      current.nextElementSibling.nextElementSibling.nextElementSibling.classList.add(
        "active"
      );
  
      counter.innerText = 4;
    } else {
      current.classList.remove("active");
      current.style.visibility = "hidden";
      current.previousElementSibling.classList.add("active");
      let num = parseInt(count);
  
      num--;
      counter.innerText = num;
    }
  }
  
  /** get active item on click go to next item */
  
  function next() {
    let current = document.querySelector(".active");
    let counter = document.getElementById("count");
    let count = counter.innerText;
  
    if (parseInt(count) === 4) {
      current.classList.remove("active");
      current.style.visibility = "hidden";
      current.previousElementSibling.previousElementSibling.previousElementSibling.classList.add(
        "active"
      );
      console.log(current);
      counter.innerText = 1;
    } else {
      let num = parseInt(count);
      num++;
      counter.innerText = num;
      current.classList.remove("active");
      current.nextElementSibling.classList.add("active");
    }
  }