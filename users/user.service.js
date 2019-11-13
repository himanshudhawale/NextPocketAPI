const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const teamdb = require('_helpers/teamdb')
const Team = teamdb.Team;
const braintree = require('braintree');
// var Simplify = require("simplify-commerce"),
//     client = Simplify.getClient({
//         publicKey: 'sbpb_OGI3MjliOTUtYWMyZS00ZTE4LWFmYTgtNTdkZDQ1NTBhZGFm',
//         privateKey: '6IpmiveAFIhKuVmp6CONqGsVnJKfuPc4C2q1endRa2l5YFFQL0ODSXAOkNtXTToq'
//     });


module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    addResponse,
    getInfo,
    delete: _delete

};

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getInfo(req)
{
  const secret = config.secret;

  var decoded = jwt.verify(req.token, secret);
  console.log(decoded)


  return decoded
}

async function addResponse(req)
{
  mydict={};
  // console.log("Hello");
  // console.log(req);
  const user = await User.findById(req.id)
  // console.log(user);
  const team = await Team.findById(req.tid);
  // const team1 = await Team.findById(req.tid);
  // console.log(team);

  if(team.score)
  {
    mydict=team.score;
  }
  mydict[user._id] = req.score;

  let sum=0;
  for(var k in mydict)
  {
    var v = mydict[k];
    sum+=parseInt(v);
  }

  // console.log(sum);
  var tot = Object.keys(mydict).length;
  sum = sum/tot;
  // team.sum = sum;
  // team.score[user._id]=mydict[user._id];
  // team
  //
  //
  // // team.score = mydict;
  // console.log(sum);
  //
  // const teamTemp = await Team.findById(team.id);
  // Object.assign(teamTemp, team);
  //
  // teamTemp.save(function(err, res){
  //       if (err){throw err;}
  //       console.log('team is: ', res)
  // });
  await Team.findByIdAndUpdate({_id : team._id}, {
    $set:{
        score : mydict,
        sum : sum
    }});

  return team;

}


async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email})) {
        throw 'Email "' + userParam.email  + '" is already taken';
    }

         // user.customerID=result.id;
         const user =  new User(userParam);


         // gateway.customer.create({
         //          firstName: user.firstName,
         //          lastName: user.lastName,
         //          email: user.email,
         //          phone: "8080808080"
         //  }).then(function (result) {
         //    if (result.success) {
         //      console.log('Customer ID: ' + result.customer.id);
         //
         //      user.customerID = result.customer.id;
         //      if (userParam.password) {
         //            user.hash = bcrypt.hashSync(userParam.password, 10);
         //          }
         //
         //      user.save(function(err, res){
         //                if (err){throw err;}
         //                 console.log('user is: ', res)
         //               });
         //
         //    } else {
         //      console.error(result.message);
         //    }
         //  }).catch(function (err) {
         //    console.error(err);
         //  });


          // client.customer.create({
          //     email : userParam.email,
          //     name : userParam.firstName + " " + userParam.lastName,
          //     // card : {
          //     //    expMonth : "11",
          //     //    expYear : "35",
          //     //    cvc : "123",
          //     //    number : "5555555555554444"
          //     // },
          //     reference : "Ref1"
          // }, function(errData, data){
          //     if(errData){
          //         console.error("Error Message: " + errData.data.error.message);
          //         return;
          //     }
          //     console.log("Success Response: " + JSON.stringify(data));
          //     user.customerID = data.id;
              if (userParam.password) {
                    user.hash = bcrypt.hashSync(userParam.password, 10);
              }
          //     user.save(function(err, res){
          //           if (err){throw err;}
          //           console.log('user is: ', res)
          //     });
          //
          //
          // });



         // gateway.customer.create({
         //        firstName: user.firstName,
         //        lastName: user.lastName,
         //        email: user.email,
         //        phone: "8080808080"
         //      }).then(function (result) {
         //        if (result.success) {
         //          console.log('Customer ID: ' + result.id);
         //          userParam.customerID=result.id;
         //
         //          const user1=  new User(userParam);
         //          user=user1;
         //
         //        } else {
         //          console.error(result.message);
         //        }
         //      }).catch(function (err) {
         //        console.error(err);
         //      }).then(user.save())

          //
            // await user.save();
          // // hash password
          //
               user.save(function(err, res){
                         if (err){throw err;}
                          console.log('user is: ', res)
                        });

          // firstName: userParam.firstName,
          // lastName: userParam.lastName,
          // email: userParam.email,
          //




}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'Email"' + userParam.email + '" is already taken';
    }





    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    user.save(function(err, res){
          if (err){throw err;}
          console.log('user is: ', res)



    });
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
