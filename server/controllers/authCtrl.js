const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const { DOMAIN, CLIENT_ID, CLIENT_SECRET, REACT_APP_CLIENT} = process.env;

module.exports = app =>{
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new Auth0Strategy({
            domain:DOMAIN,
            clientID:CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            callbackURL:"/login",
            scope:"openid email profile"
            },
            function(accessToken,refreshToken,extraParams,profile,done){
                return done(null,profile)
            }
        )
        
    )
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    app.get(
        "/login",
        passport.authenticate("auth0", {
          successRedirect: "/success",
          failureRedirect: "/login"
        })
    );
    app.get("/success", (req, res) => {
      /** This is where we would connect logged in user to db */
        console.log("Successful")
    });
}