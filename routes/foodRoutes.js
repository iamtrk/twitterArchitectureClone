var util = require('util')
var foodModel = require('../model/foodModel')

    exports.userSignup= function(req,res){
    foodModel.userSignup(req, function(err,name){
        if(err){
            console.log(err)
            res.json({isSuccess:false});
        }
        else
        //res.render('food', { firstName: req.param('first_name'), lastName: req.param('last_name')});
            res.json({isSuccess:true})
    });
}

    exports.userLogin= function(req,res){
    foodModel.userLogin(req, function(err,pwdMatched){
        if(err){
            res.send("Error in Extracting the data from DB");
        }
        console.log("Nutrient is is "+pwdMatched);
        //res.render('food', { title: pwdMatched, nutrient: pwdMatched});
        res.json({isAuthorized:pwdMatched})
    });
}

    exports.userById = function(req,res){
    foodModel.userById(req, function(err,user){
        console.log(user)
        if(err){
            res.json({isSuccess:false});
        }
        else res.json({User:user});
        //console.log("Nutrient is is "+y.id);
        //res.render('food', { title: req.params.manufacturer, nutrient: y.description});
    });
}

    exports.post= function(req,res){
    foodModel.post(req, function(err,name){
        if(err){
            res.json({isSuccess:false});
        }
        else
            res.json({isSuccess:true})
    });
}

    exports.comment= function(req,res){
    foodModel.comment(req, function(err,name){
        if(err){
            res.json({isSuccess:false});
        }
        else
            res.json({isSuccess:name})
    });
     }

    exports.myHome = function(req,res){
    foodModel.myHome(req, function(err,wallComments){
        if(err){
            res.json({isSuccess:false})
        }
        else {
            res.json({myWall:wallComments})
        }
    })
    }

    exports.commentsByAnUser = function(req,res){
    foodModel.commentsByAnUser(req, function(err,comments){
        console.log(comments)
        if(err){
            res.json({isSuccess:false});
        }
        else res.json({Comments:comments});
        //console.log("Nutrient is is "+y.id);
        //res.render('food', { title: req.params.manufacturer, nutrient: y.description});
    });
}

    exports.likeComment= function(req,res){
    foodModel.likeComment(req, function(err,name){
        if(err){
            res.json({isSuccess:false});
        }
        else
            res.json({isSuccess:true})
    });
}

    exports.unlikeComment= function(req,res){
    foodModel.unlikeComment(req, function(err,name){
        if(err){
            res.json({isSuccess:false});
        }
        else
            res.json({isSuccess:true})
    });
}

    exports.follow= function(req,res){
    foodModel.follow(req, function(err,name){
        if(err){
            console.log(err)
            res.json({isSuccess:false});
        }
        else
            res.json({isSuccess:true})
    });
}