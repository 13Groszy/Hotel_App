const selectors = {
    firstHotel: document.querySelector('#firstHotel'),
    secondHotel: document.querySelector('#secondHotel'),
    thirdHotel: document.querySelector('#thirdHotel'),
    fourthHotel: document.querySelector('#fourthHotel'),
    bookings: document.querySelectorAll('.cards__overlay__text'),
    modal: document.querySelector('#modal'),
    modalDisplay: document.querySelector('.modal__display'),
    clickedHotel: null,
    clicked: null,
    exitBtn: document.querySelector('.modal__exit')
}
//Displaying clicked hotel modal
selectors.bookings.forEach(hotel => {
    hotel.addEventListener('click', function () {
        clickedHotel = hotel.parentNode.parentNode.id;
        toggleModal(clickedHotel);
        return selectors.clickedHotel;
    })
});

//Displaying modal with reservation
let displayInfo = () => {
    selectors.modalDisplay.innerHTML = `<div class="modal__display__hotels">
    <h1>Hotel ${clicked.name}</h1>
    <p>${clicked.description}</p>
    <p>Price: €${clicked.price} pp</p>
    <h2>Availability:</h2>
    <div>
        <ul>
            <li>May: ${clicked.availability.may}</li>
            <li>June: ${clicked.availability.june}</li>
            <li>July: ${clicked.availability.july}</li>
            <li>August: ${clicked.availability.august}</li>
        </ul>
        <ul>
            <li>
                <span>0</span>
                <label for="May availability"></label>
                <input value="0" type="range" min="0" max="${clicked.availability.may}" name="May" id="reservationMay">
                <span>${clicked.availability.may}</span>
            </li>
            <li>
                <span>0</span>
                <label for="June availability"></label>
                <input value="0" type="range" min="0" max="${clicked.availability.june}" name="June" id="reservationJune">
                <span>${clicked.availability.june}</span>
            </li>
            <li>
                <span>0</span>
                <label for="July availability"></label>
                <input value="0" type="range" min="0" max="${clicked.availability.july}" name="July" id="reservationJuly">
                <span>${clicked.availability.july}</span>
             </li>
             <li>
                <span>0</span>
                <label for="August availability"></label>
                <input value="0" type="range" min="0" max="${clicked.availability.august}" name="August" id="reservationAugust">
                <span>${clicked.availability.august}</span>
            </li>
        </ul>
    </div>
    <button onclick="reserveBtn()">Reserve</button>
</div>
<img class="modal__display__image" src="../src/${clickedHotel}.jpeg"></img>`
}

//toggling Modal of selected hotel
let toggleModal = (hotelName) => {
    selectors.modal.classList.toggle('none');
    if (hotelName == 'firstHotel') {
        clicked = firstHotel;
    } else if (hotelName == 'secondHotel') {
        clicked = secondHotel;
    } else if (hotelName == 'thirdHotel') {
        clicked = thirdHotel;
    } else {
        clicked = fourthHotel;
    }
    displayInfo()
    return clicked
}
//Reservation on click
let reserveBtn = () => {
    let reservationValues = document.querySelectorAll('input');
    let emptyReserve = 0;
    reservationValues.forEach(month => {
        //Checking for empty reservation and returning alert
        //Reservation with value are deducted from available days
        if (month.value != 0) {
            switch (month.name) {
                case "May":
                    clicked.availability.may -= month.value;
                    break;
                case "June":
                    clicked.availability.june -= month.value;
                    break;
                case "July":
                    clicked.availability.july -= month.value;
                    break;
                case "August":
                    clicked.availability.august -= month.value;
                    break;
                default:
                    alert("You've found a bug!")
                    break;
            }
        } else {
            emptyReserve++
            if (emptyReserve == 4) {
                alert("Select for how many days you want to reserve the hotel")
                emptyReserve = 0;
            }
        }
    });
    //Update on every reservation click
    displayInfo()

}
let test = () => {
    if (confirm("Are you sure you want to book in these days?")) {
        console.log("Yes");
    } else {
        console.log("No");
    }
}