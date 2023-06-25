const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${minutes}:${remainingSeconds}`;
};

const isWithin24Hours = (givenTime) => {
    const givenTimestamp = new Date(givenTime).getTime();
    const currentTimestamp = Date.now();
    const timeDifferenceInHours = (currentTimestamp - givenTimestamp) / (1000 * 60 * 60);

    return timeDifferenceInHours <= 24;
};

module.exports = { formatTime, isWithin24Hours };