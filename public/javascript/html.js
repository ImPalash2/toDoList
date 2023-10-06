// Add a "checked" symbol when clicking on a list item
let checkBoxes = document.getElementsByClassName("checkbox");
for (let i = 0; i < checkBoxes.length; i++){  
  checkBoxes[i].onclick = function() {
    if(checkBoxes[i].checked){
      console.log(this.parentElement);
      this.parentElement.style.textDecoration = "line-through";
      this.parentElement.style.textDecorationColor = "#a683e3";
      this.parentElement.style.textDecorationThickness = "3px";
    }else{
      console.log('unChecked');
      this.parentElement.style.textDecoration = "none";
    }
  }
}

