const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv = require('dotenv');
dotenv.config();

//Load User Model
const User = require('../../Models/User');

module.exports = function (passport, bcrypt) {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        }, (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            User.findOne({ googleId: profile.id })
                .then(user => {
                    if (!user) {
                        const newUser = new User({
                            name: profile.displayName,
                            email: profile.id + '@google.com',
                            password: profile.id,
                            provider: 'google',
                            googleId: profile.id,
                            googleData: profile._json
                        });

                        //Hash password
                        bcrypt.genSalt(10, (err, salt) =>
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                //Set password hashed
                                newUser.password = hash;
                                //Save the user
                                newUser.save(
                                    err => {
                                        if(err) console.log(err);
                                        console.log(newUser);
                                        return done(null,newUser);
                                    }
                                );
                            })
                        );
                    } else {
                        console.log('dio');
                        return done(null,user);
                    }
                })
                .catch(err => console.log(err));
        })
    );
};
