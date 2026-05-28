const express = require('express');

const router = express.Router();
const Car = require('../models/catalog_car.models')
const path =require('path')
const fs = require('fs').promises
const Booking = require('../models/bid.model');
const User = require('../models/user.models')
router.delete('/admin/deleteCar/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // 1. Ищем машину, чтобы проверить её существование и взять путь к картинке
        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({ message: 'Машина не найдена' });
        }

        // 2. Удаляем превью (картинку) с сервера, если она есть
        if (car.preview) {
            const cleanPath = car.preview.replace(/^\/+/, '');
            const filePath = path.join(process.cwd(), cleanPath);
            try {
                await fs.unlink(filePath);
                console.log(`Файл ${filePath} успешно удален`);
            } catch (fsErr) {
                console.error(`Не удалось удалить файл с диска: ${fsErr.message}`);
            }
        }

        // 3. УДАЛЯЕМ ВСЕ ЗАЯВКИ / БРОНИ, СВЯЗАННЫЕ С ЭТОЙ МАШИНОЙ
        // Метод удалит все документы из коллекции Booking, где carId равен id нашей машины
        await Booking.deleteMany({ carId: id });
        console.log(`Все заявки для машины с ID ${id} успешно удалены`);

        // 4. Удаляем саму машину из базы данных
        await Car.findByIdAndDelete(id);

        return res.status(200).json({ message: "Машина и все связанные заявки успешно удалены!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

router.put('/updateCarPrice/:id', async(req,res)=>{
    try {
        const id = req.params.id;
        const {price} = req.body;
        const findCar = await Car.findById(id);
        if(!findCar){
            return res.status(404).json({message:'Машина не найдена!'})
        }
        findCar.price = price;
        await findCar.save();
        return res.status(200).json({message:'Данные успешно обновлены!'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ошибка сервера при обновлении цены' });
    }
})
router.put('/updateCarTitle/:id', async(req,res)=>{
    try {
        const id = req.params.id;
        const {title} = req.body;
        const findCar = await Car.findById(id);
        if(!findCar){
            return res.status(404).json({message:'Машина не найдена!'})
        }
        findCar.name = title;
        await findCar.save();
        return res.status(200).json({message:'Данные успешно обновлены!'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ошибка сервера при обновлении заголовка' });
    }
})
router.get('/users', async(req,res)=>{
    try {
        const users = await User.find();
        if(!users){
            return res.status(404).json({message:'Пользователи не найдены'})
        }
        return res.status(200).json(users)
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:'Ошибка сервера'})
    }
})
router.delete('/users/:id', async(req,res)=>{
    try {
        const id = req.params.id;
        if(!id){
            return res.status(401).json({message:'Нет id'})
        }
        const user = await User.findByIdAndDelete(id);

        return res.status(200).json({message:'Пользователь успешно удалён'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Ошибка сервера'})
    }
})

module.exports = router;