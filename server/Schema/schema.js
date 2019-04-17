module.exports = {
    user: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        provider: {
            type: String
        },
        googleId: {
            type: String
        },
        googleData: {
            type: Object
        },
        date: {
            type: Date,
            default: Date.now
        },
    }
};
