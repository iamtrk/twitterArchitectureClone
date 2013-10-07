

var mongoose   =  new  require('mongoose');
var bcrypt     =  new  require('bcrypt-nodejs');
var ObjectId   =  require('mongoose').Types.ObjectId;

var userSchema = mongoose.Schema({

        first_name:String,
        last_name:String,
		email_id:String,
		password:String,
        dob:Date,
        sex:Boolean,
        following:[String],
        followers:[String]
      })

var postSchema = mongoose.Schema({
       body : String,
       author: String,
       likes : Number
      })

var commentsSchema = mongoose.Schema({
     body : String,
     author : String,
     likes : Number,
     post  : String,
     replies:[String]
    })

    exports.userSignup = function(req,callback){
       console.log("the incoming param is "+req.param('name'))
       var conn = mongoose.createConnection('mongodb://localhost/local');
       var essage = conn.model('user',userSchema);
       var usr = new essage();
       usr.first_name = req.param('first_name');
       usr.last_name  = req.param('last_name');
       bcrypt.hash(req.param('password'), null, null, function(err, hash) {
           usr.password   = hash;
       });
       usr.email_id   = req.param('email');
       usr.dob        = req.param('dob');
       usr.sex        = req.param('sex');
       usr.save(function(err){
           if(err){
               callback(err);
           }
       });
       callback("",usr.id);
         //mongoose.connection.close();


       mongoose.disconnect()

   }

    exports.userLogin = function(req, callback){
    var conn = mongoose.createConnection('mongodb://localhost/local');
    var essage = conn.model('user',userSchema);
    essage.find({'email_id':req.param('email')}, function (err, user) {
        if(err){
            onErr(err,callback);
        }
        else{
            user = JSON.stringify(user);
            user = JSON.parse(user)[0];
            bcrypt.compare(req.param('password'), user.password, function(err, pwdMatched) {
                if(pwdMatched)  callback("",user._id)
                else callback("",pwdMatched)

            });
            mongoose.disconnect()
        }
    });
}

    exports.userById  = function(req, callback){
       var conn = mongoose.createConnection('mongodb://localhost/local');
       var essage = conn.model('user',userSchema);
       console.log(" Stuff is")
       essage.find({'_id':ObjectId(req.param('_id'))},function(err,user){
           if(err) {
               onErr(err,callback);
           } else {
               mongoose.disconnect()
               callback("",user)}
       });

      }

    exports.post = function(req,callback){
    var conn = mongoose.createConnection('mongodb://localhost/local');
    var posting = conn.model('posts',postSchema);
    var post = new posting();
    post.author = req.param('email');
    post.body   = req.param('body');
    post.likes  = 0;
    usr.save(function(err){
        if(err){
            callback(err);
        }
    });
    callback("",post.id);
    mongoose.disconnect()
}

    exports.comment = function(req,callback){
    var conn = mongoose.createConnection('mongodb://localhost/local');
    var commenting = conn.model('comments',commentsSchema);
    var comment = new commenting();
    comment.body = req.param('body');
    comment.author = req.param('author_id');
    comment.post   = req.param('post_id');
    comment.likes = 0;
    comment.replies = [];
    comment.save(function(err){
        if(err){
            callback(err);
        }

    });
        if(req.param('reply')){
            commenting.update({'_id':ObjectId(req.param('comment_id'))},{$push:{'replies':comment.id}},function(err){
                if(err) callback(err);
            });
        }
    callback("",comment.id);
    mongoose.disconnect()
}

    exports.commentsByAnUser  = function(req, callback){
    var conn = mongoose.createConnection('mongodb://localhost/local');
    var essage = conn.model('comments',commentsSchema);
    console.log(" Stuff is")
    essage.find({'author':req.param('author_id')},function(err,comments){
        if(err) {
            onErr(err,callback);
        } else {
            mongoose.disconnect()
            callback("",comments)}
    });

}

    exports.likeComment = function(req,callback){
    var conn = mongoose.createConnection('mongodb://localhost/local',function(err){
        if(err) callback(err)
    });
    var commenting = conn.model('comments',commentsSchema);
    commenting.update({'_id':ObjectId(req.param('_id'))},{$inc:{'likes':1}},function(err){
        if(err) callback(err);

    });
    mongoose.disconnect()
    callback("",true)

}

    exports.unlikeComment = function(req,callback){
    var conn = mongoose.createConnection('mongodb://localhost/local');
    var commenting = conn.model('comments',commentsSchema);
    commenting.update({'_id':ObjectId(req.param('_id'))},{$inc:{'likes':-1}},function(err){
        if(err) callback(err);

    });
    mongoose.disconnect()
    callback("",true)

}

    exports.follow    = function(req, callback){
    var conn = mongoose.createConnection('mongodb://localhost/local');
    var essage = conn.model('user',userSchema);
    essage.update({'_id':ObjectId(req.param('master_id'))},{$push:{'followers':req.param('slave_id')}},function(err){
        if(err) callback(err);
    });
    essage.update({'_id':ObjectId(req.param('slave_id'))},{$push:{'following':req.param('master_id')}},function(err){
        if(err) callback(err);
    });
    mongoose.disconnect()
    callback("",true)

}




   