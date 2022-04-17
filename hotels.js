class Hotel {
    constructor(name,price,availability,description){
        this.name = name;
        this.price = price;
        this.availability = availability;
        this.description = description;
    }
}
let firstHotel = new Hotel('Mushroom', 99, {
    may: 10,
    june: 12,
    july:3,
    august:18
},
"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati modi soluta maiores, dolore laudantium eos maxime quaerat esse repudiandae aut!")

let secondHotel = new Hotel('Flower', 199, {
    may: 22,
    june: 8,
    july:22,
    august:11
},
"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea enim pariatur laudantium beatae nam itaque illum sint id voluptatum error?")

let thirdHotel = new Hotel('Sand', 149, {
    may: 25,
    june: 17,
    july:30,
    august:13
},
"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga praesentium natus non quae numquam quibusdam atque et? Harum, dicta repellendus?")

let fourthHotel = new Hotel('Rock', 349, {
    may: 7,
    june: 3,
    july:7,
    august:12
},
" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto aperiam, distinctio aliquam voluptates vel obcaecati impedit amet praesentium a illum.")