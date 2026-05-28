const Booking = require('../models/bid.model');

exports.createBooking = async (req, res) => {
    try {
         const {userId,carId, date,time} = req.body;
    const existingBooking = await Booking.findOne({carId, date, time });
    if(existingBooking) return res.status(400).json({message: 'Запись на это время уже существует'});
    const booking = await Booking.create({
       userId,
       carId,
        date,
        time
    });
    console.log(booking);
    res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Ошибка сервера"})
    }
   
}