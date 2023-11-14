const container = document.querySelector(".container");
const count = document.querySelector("#count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserved)")


getFromLocalStorage();
calculatePrice();



container.addEventListener("click",function(e){
   if(e.target.classList.contains("seat")&& !e.target.classList.contains("reserved")){
    e.target.classList.toggle("selected"); //toggle();


calculatePrice();


   };
})


select.addEventListener("change", function(e){

    calculatePrice();

    
})

function calculatePrice(){
    const selectedSeats = container.querySelectorAll(".seat.selected")
    let selectedSeatCount = selectedSeats.length;
   
    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat)   //spread 
    })
 

    seats.forEach(function (seat){
        seatsArr.push(seat);
    })


    let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    })
    


    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;


  saveToLocalStorage(selectedSeatIndexs);
};



function saveToLocalStorage(indexs){  //local storage a bilgi gönderme
    localStorage.setItem("selectedSeats", JSON.stringify(indexs));
    localStorage.setItem("selectedMovieIndex", select.selectedIndex);   
}


function getFromLocalStorage(){
const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
const selectedMovieIndexs = JSON.parse(localStorage.getItem("selectedMovieIndex"))


if(selectedMovieIndexs!=null){
    select.selectedIndex= selectedMovieIndexs;
}


if (selectedSeats != null && selectedSeats.length>0){
seats.forEach(function(seat,index){
    if(selectedSeats.indexOf(index)> -1){
        seat.classList.add("selected");
    }
} )
}

};