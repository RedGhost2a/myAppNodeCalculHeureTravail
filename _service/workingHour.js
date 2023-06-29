const db = require('../db');
const { Op } = require('sequelize');

async function getAll() {
    return await db.Hour.findAll();
}

async function getById(id) {
    return await db.Hour.findByPk(id);
}

async function create(params) {
    return await db.Hour.create(params);
}

async function update(id, params) {
    const Hour = await db.Hour.findByPk(id);

    // valider
    if (!Hour) throw 'Calendar not found';

    // copier params à calendar et sauvegarder
    Object.assign(Hour, params);
    await Hour.save();

    return Hour.get();
}

async function remove(id) {
    const Hour = await db.Hour.findByPk(id);
    if (!Hour) throw 'Calendar not found';
    await Hour.destroy();
}


async function getTotalHoursBetweenDates(startDate, endDate){
    try {
        const calendars = await db.Calendar.findAll({
            attributes: ['id', 'date'],
            where: {
                date: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        const calendarIds = calendars.map(calendar => calendar.id);

        console.log(`Retrieved calendar IDs for dates between ${startDate} and ${endDate}:`, calendarIds);

        // Obtain total extra hours and total hours
        const totalExtraHoursPromise = db.Hour.sum('extra_hours', { where: { calendarId: calendarIds }});
        const totalHoursPromise = db.Total.sum('total_hours', { where: { calendarId: calendarIds }});

        // Get all records from Hours and Total for the selected date range
        const hoursPromise = db.Hour.findAll({ where: { calendarId: calendarIds }});
        const totalPromise = db.Total.findAll({ where: { calendarId: calendarIds }});

        const [totalExtraHours, totalHours, hours, total] = await Promise.all([totalExtraHoursPromise, totalHoursPromise, hoursPromise, totalPromise]);

        console.log(`Total extra hours for dates between ${startDate} and ${endDate}:`, totalExtraHours);
        console.log(`Total hours for dates between ${startDate} and ${endDate}:`, totalHours);
        console.log(`Hours for dates between ${startDate} and ${endDate}:`, hours);
        console.log(`Total records for dates between ${startDate} and ${endDate}:`, total);

        return { totalExtraHours, totalHours, hours, total };

    } catch (error) {
        console.error(`Failed to retrieve total hours for dates between ${startDate} and ${endDate}:`, error);
        throw error;
    }
};

async function getTotalHoursForMonth(month){
    try {
        month = month < 10 ? `0${month}` : `${month}`;

        const calendars = await db.Calendar.findAll({
            attributes: ['id'],
            where: db.sequelize.where(db.sequelize.fn('strftime', '%m', db.sequelize.col('date')), month)
        });

        const calendarIds = calendars.map(calendar => calendar.id);

        console.log(`Retrieved calendar IDs for month ${month}:`, calendarIds);

        // Obtain total extra hours and total hours
        const totalExtraHoursPromise = db.Hour.sum('extra_hours', { where: { calendarId: calendarIds }});
        const totalHoursPromise = db.Total.sum('total_hours', { where: { calendarId: calendarIds }});

        // Get all records from Hours and Total for the selected month
        const hoursPromise = db.Hour.findAll({ where: { calendarId: calendarIds }});
        const totalPromise = db.Total.findAll({ where: { calendarId: calendarIds }});

        const [totalExtraHours, totalHours, hours, total] = await Promise.all([totalExtraHoursPromise, totalHoursPromise, hoursPromise, totalPromise]);

        console.log(`Total extra hours for month ${month}:`, totalExtraHours);
        console.log(`Total hours for month ${month}:`, totalHours);
        console.log(`Hours for month ${month}:`, hours);
        console.log(`Total records for month ${month}:`, total);

        return { totalExtraHours, totalHours, hours, total };

    } catch (error) {
        console.error(`Failed to retrieve total hours for month ${month}:`, error);
        throw error;
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getTotalHoursForMonth,
    getTotalHoursBetweenDates

};
