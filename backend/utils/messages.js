const generateMessage = (text) => {
    return {
        text,
        createdAt: new Date().getTime()
    }
};

const generateLocationMessage = (url) => {
    return {
        url,
        locationCreatedAt: new Date().getTime()
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
};