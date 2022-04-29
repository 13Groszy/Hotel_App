"use strict";

var selectors = {
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
  hotelNr: null
}; //Displaying clicked hotel modal

selectors.bookings.forEach(function (hotel) {
  hotel.addEventListener('click', function () {
    selectors.clickedHotel = hotel.parentNode.id;
    selectors.hotelNr = hotel.id;
    toggleModal(selectors.clickedHotel);
  });
}); // Displaying modal with reservation

var displayInfo = function displayInfo() {
  selectors.modalDisplay.innerHTML = "<div class=\"modal__display__hotels\">\n    <h1>Hotel ".concat(selectors.clicked.name, "</h1>\n    <p>").concat(selectors.clicked.description, "</p>\n    <p>Price: \u20AC").concat(selectors.clicked.price, " pp</p>\n    <h2>Availability:</h2>\n    <div>\n        <ul>\n            <li>May: ").concat(selectors.clicked.availability.may, "</li>\n            <li>June: ").concat(selectors.clicked.availability.june, "</li>\n            <li>July: ").concat(selectors.clicked.availability.july, "</li>\n            <li>August: ").concat(selectors.clicked.availability.august, "</li>\n        </ul>\n        <ul class=\"input_list\">\n            <li>\n                <label for=\"May availability\"></label>\n                <output>0</output>\n                <input class=\"valToShowMay\" value=\"0\" type=\"range\" min=\"0\" max=\"").concat(selectors.clicked.availability.may, "\" name=\"May\" id=\"reservationMay\" oninput=\"this.previousElementSibling.value = this.value\">\n                <span>").concat(selectors.clicked.availability.may, "</span>\n            </li>\n            <li>\n                <label for=\"June availability\"></label>\n                <output>0</output>\n                <input value=\"0\" type=\"range\" min=\"0\" max=\"").concat(selectors.clicked.availability.june, "\" name=\"June\" id=\"reservationJune\" oninput=\"this.previousElementSibling.value = this.value\">\n                <span>").concat(selectors.clicked.availability.june, "</span>\n            </li>\n            <li>\n                <label for=\"July availability\"></label>\n                <output>0</output>\n                <input value=\"0\" type=\"range\" min=\"0\" max=\"").concat(selectors.clicked.availability.july, "\" name=\"July\" id=\"reservationJuly\" oninput=\"this.previousElementSibling.value = this.value\">\n                <span>").concat(selectors.clicked.availability.july, "</span>\n             </li>\n             <li>\n                <label for=\"August availability\"></label>\n                <output>0</output>\n                <input value=\"0\" type=\"range\" min=\"0\" max=\"").concat(selectors.clicked.availability.august, "\" name=\"August\" id=\"reservationAugust\" oninput=\"this.previousElementSibling.value = this.value\">\n                <span>").concat(selectors.clicked.availability.august, "</span>\n            </li>\n        </ul>\n    </div>\n    <button class=\"reserveBtn\" onclick=\"reserveBtn()\">Reserve</button>\n</div>\n<img class=\"modal__display__image\" src=\"../src/").concat(selectors.clickedHotel, ".jpeg\"></img>");
}; //toggling Modal of selected hotel


var toggleModal = function toggleModal(hotelName) {
  selectors.modal.classList.toggle('none');

  if (hotelName == 'firstHotel') {
    selectors.clicked = firstHotel;
  } else if (hotelName == 'secondHotel') {
    selectors.clicked = secondHotel;
  } else if (hotelName == 'thirdHotel') {
    selectors.clicked = thirdHotel;
  } else if (hotelName == 'fourthHotel') {
    selectors.clicked = fourthHotel;
  } else {}

  displayInfo();
  return selectors.clicked;
}; //Reservation on click


var reserveBtn = function reserveBtn() {
  var reservationValues = document.querySelectorAll('input');
  var emptyReserve = 0;
  reservationValues.forEach(function (month) {
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
          alert("You've found a bug!");
          break;
      }
    } else {
      emptyReserve++;

      if (emptyReserve == 4) {
        alert("Select for how many days you want to reserve the hotel");
        emptyReserve = 0;
      }
    }
  }); //Update on every reservation click

  displayInfo();
  updateDataBaseValues(selectors.hotelNr);
}; //to never runout of 'available days' you can reset database to oryginal


var restoreDataBaseValues = function restoreDataBaseValues() {
  var promiseToRestore = new Promise(function (resolve, reject) {
    var allDB = [1, 2, 3, 4];
    allDB.forEach(function (val) {
      db.collection("hotels").doc("".concat(val)).update({
        "availability.may": 31,
        "availability.june": 30,
        "availability.july": 31,
        "availability.august": 31
      });
    });
  });
  promiseToRestore.then(getHotels()).catch(function (err) {
    return console.log(err);
  });
};

var updateDataBaseValues = function updateDataBaseValues(hotelNumber) {
  var valToConvert = hotelNumber;
  valToConvert++;
  db.collection("hotels").doc("".concat(valToConvert)).update({
    "availability.may": selectors.clicked.availability.may,
    "availability.june": selectors.clicked.availability.june,
    "availability.july": selectors.clicked.availability.july,
    "availability.august": selectors.clicked.availability.august
  });
};
