				

var closeAccordion = function(){
    this.parentElement.style.height = '0px';
    this.parentElement.classList.remove("active");
}

//Accordion logic
var openAccordion = function () {
    //check if correct button was clicked

    if(this.parentElement.getElementsByClassName("active")[0]){
        this.parentElement.getElementsByClassName("active")[0].classList.remove("active")
}

    this.classList.add("active");
    this.parentElement.classList.add("voted");

    //get index of button clicked and show same answer
    //let ansIdx = Array.from(this.parentNode.children).indexOf(this);

    let ansIdx = [].slice.call(this.parentNode.children, 0).indexOf(this);
    

    let answer = this.parentElement.nextSibling.nextSibling.querySelectorAll('.answer');
    let ht = 0;
    for (let index = 0; index < answer.length; index++) {
        if(index == ansIdx){
            answer[index].classList.remove("hidden");
            ht = answer[index].scrollHeight + 40;
        }
        else{
            answer[index].classList.add("hidden")
        }   
    }

    //expand accordion
    var ua = window.navigator.userAgent;
    var isIE = /MSIE|Trident/.test(ua);
    //check for IE for compatibility
    if ( isIE ) {
        this.parentElement.nextSibling.nextSibling.style.height = "auto";
    }
    else{
        //let ht = this.parentElement.nextSibling.nextSibling.scrollHeight;
        this.parentElement.nextSibling.nextSibling.style.height = ht + "px";
    }

    this.parentElement.nextSibling.nextSibling.classList.add("active");
					
    //if button is close to the fold, then the answer will open below the fold.  So scroll to the answer if that happens
	var rect = this.getBoundingClientRect();
					

	if (window.innerHeight - rect.bottom < 120) {
        this.parentElement.nextSibling.nextSibling.scrollIntoView();
    }
					
}


// add accordion functionality to each accordion on page
var accordion = document.querySelectorAll('accordion-container');
if (accordion) {
    let accordionBtn = document.querySelectorAll('.accordion-container .accordion-trigger');

    for (let index1 = 0; index1 < accordionBtn.length; index1++) {
        accordionBtn[index1].addEventListener("click", openAccordion);
    }

    var closeBtn = document.querySelectorAll('.q-close');

    for (let index2 = 0; index2 < closeBtn.length; index2++) {
        closeBtn[index2].addEventListener("click", closeAccordion);
    }

};

            
