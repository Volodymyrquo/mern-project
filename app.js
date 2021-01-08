const express = require('express');
const config = require('config');
const mongoose = require('mongoose');



const app = express();

const PORT = config.get('port') || 5000;

async const start = () => {

    try {
        await mongoose.connect(config.get('mongoUri'),{})
    } catch (error) {
        console.log('Server error ', error.message)
        process.exit(1)
    }

}

start();


app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
