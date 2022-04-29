const selectors = {
    firstHotel: document.querySelector('#firstHotel'),
    secondHotel: document.querySelector('#secondHotel'),
    thirdHotel: document.querySelector('#thirdHotel'),
    fourthHotel: document.querySelector('#fourthHotel'),
    bookings: document.querySelectorAll('.cards__overlay'),
    modal: document.querySelector('#modal'),
    modalDisplay: document.querySelector('.modal__display'),
    clickedHotel: null,
    clicked: null,
    exitBtn: document.querySelector('.modal__exit'),
    hotelNr: null,
}
//Displaying clicked hotel modal
selectors.bookings.forEach(hotel => {
    hotel.addEventListener('click', function () {
        selectors.clickedHotel = hotel.parentNode.id;
        selectors.hotelNr = hotel.id
        toggleModal(selectors.clickedHotel);
    })
});

// Displaying modal with reservation
let displayInfo = () => {
    selectors.modalDisplay.innerHTML = `<div class="modal__display__hotels">
    <h1>Hotel ${selectors.clicked.name}</h1>
    <p>${selectors.clicked.description}</p>
    <p>Price: €${selectors.clicked.price} pp</p>
    <h2>Availability:</h2>
    <div>
        <ul>
            <li>May: ${selectors.clicked.availability.may}</li>
            <li>June: ${selectors.clicked.availability.june}</li>
            <li>July: ${selectors.clicked.availability.july}</li>
            <li>August: ${selectors.clicked.availability.august}</li>
        </ul>
        <ul class="input_list">
            <li>
                <label for="May availability"></label>
                <output>0</output>
                <input class="valToShowMay" value="0" type="range" min="0" max="${selectors.clicked.availability.may}" name="May" id="reservationMay" oninput="this.previousElementSibling.value = this.value">
                <span>${selectors.clicked.availability.may}</span>
            </li>
            <li>
                <label for="June availability"></label>
                <output>0</output>
                <input value="0" type="range" min="0" max="${selectors.clicked.availability.june}" name="June" id="reservationJune" oninput="this.previousElementSibling.value = this.value">
                <span>${selectors.clicked.availability.june}</span>
            </li>
            <li>
                <label for="July availability"></label>
                <output>0</output>
                <input value="0" type="range" min="0" max="${selectors.clicked.availability.july}" name="July" id="reservationJuly" oninput="this.previousElementSibling.value = this.value">
                <span>${selectors.clicked.availability.july}</span>
             </li>
             <li>
                <label for="August availability"></label>
                <output>0</output>
                <input value="0" type="range" min="0" max="${selectors.clicked.availability.august}" name="August" id="reservationAugust" oninput="this.previousElementSibling.value = this.value">
                <span>${selectors.clicked.availability.august}</span>
            </li>
        </ul>
    </div>
    <button class="reserveBtn" onclick="reserveBtn()">Reserve</button>
</div>
<img class="modal__display__image" src="../src/${selectors.clickedHotel}.jpeg"></img>`
}

//toggling Modal of selected hotel
let toggleModal = (hotelName) => {
    selectors.modal.classList.toggle('none');
    if (hotelName == 'firstHotel') {
        selectors.clicked = firstHotel;
    } else if (hotelName == 'secondHotel') {
        selectors.clicked = secondHotel;
    } else if (hotelName == 'thirdHotel') {
        selectors.clicked = thirdHotel;
    } else if((hotelName == 'fourthHotel')) {
        selectors.clicked = fourthHotel;
    } else{
    }
    displayInfo()
    return selectors.clicked
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
                    selectors.clicked.availability.may -= month.value;
                    break;
                case "June":
                    selectors.clicked.availability.june -= month.value;
                    break;
                case "July":
                    selectors.clicked.availability.july -= month.value;
                    break;
                case "August":
                    selectors.clicked.availability.august -= month.value;
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
    updateDataBaseValues(selectors.hotelNr)
}
//to never runout of 'available days' you can reset database to oryginal
let restoreDataBaseValues = () =>{
    let promiseToRestore = new Promise ((resolve, reject) =>{
        let allDB = [1,2,3,4]
            allDB.forEach(val =>{
                db.collection("hotels").doc(`${val}`).update({
            "availability.may": 31,
            "availability.june": 30,
            "availability.july": 31,
            "availability.august": 31
        });
    })
    })
    promiseToRestore
    .then(getHotels())
    .catch(err => console.log(err))
}
let updateDataBaseValues = (hotelNumber) =>{
    let valToConvert = hotelNumber;
    valToConvert++
    db.collection("hotels").doc(`${valToConvert}`).update({
            "availability.may": selectors.clicked.availability.may,
            "availability.june": selectors.clicked.availability.june,
            "availability.july": selectors.clicked.availability.july,
            "availability.august": selectors.clicked.availability.august
    })
}