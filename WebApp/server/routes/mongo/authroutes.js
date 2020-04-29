var routes = function(User) {
    var checkLogin = function(req, res) {
        var email = req.body.email;
        var password = req.body.password;

        User.find({email: email}, function(err, response) {
            if (err) {
                console.log(err);
            } else {
                if (response.length != 0) {
                    if (response[0].password === password) {
                        console.log("Successful login");
                        res.send("success");
                    } else {
                        console.log("error");
                        res.send("error");
                    }
                } else {
                    console.log("error");
                    res.send("error");
                }
            }
        })
    }

    var signup = function(req, res) {
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
        var password = req.body.password;
        var favcity = req.body.favcity;

        var newUser = new User({
            email: email,
            password: password,
            firstName: firstname,
            lastName: lastname,
            favcity: favcity
        });

        User.find({email: email}, function(err, response) {
            if (err) {
                console.log(err);
            } else {
                if (response.length != 0) {
                    res.send("user exists");
                } else {
                    newUser.save(function (err, response) {
                        if (err) {
                            console.log(err);
                            res.send("error");
                        } else {
                            console.log(response);
                            res.send("success");
                        }
                    });
                }
            }
        })
    }

    var deleteProfile = function(req, res) {
        var email = req.body.email;
        
        User.deleteOne({email: email}, function(err, response) {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                console.log('deleting ' + email);
                req.session.user = "";
                res.send("success");
            }
        })
    }

    return {
        check_login: checkLogin,
        signup: signup,
        delete_profile: deleteProfile
    }
}

module.exports = routes;