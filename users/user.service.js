const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/judgedb');
const Judge = db.Judge;


module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete

};

async function authenticate({ email, password }) {
    const user = await Judge.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}




async function getAll() {
    return await Judge.find().select('-hash');
}

async function getById(id) {
    return await Judge.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await Judge.findOne({ email: userParam.email})) {
        throw 'Email "' + userParam.email  + '" is already taken';
    }

         // user.customerID=result.id;
         const user =  new Judge(userParam);

         //
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

              // user.save(function(err, res){
              //           if (err){throw err;}
              //            console.log('user is: ', res)
              //          });

          //   } else {
          //     console.error(result.message);
          //   }
          // }).catch(function (err) {
          //   console.error(err);
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
          await user.save();
          // // hash password
          //


          // firstName: userParam.firstName,
          // lastName: userParam.lastName,
          // email: userParam.email,
          //
          // user.save(function(err, res){
          //                         if (err){throw err;}
          //                          console.log('user is: ', res)
          //                        });
}

async function update(id, userParam) {
    const user = await Judge.findById(id);

    // validate
    if (!user) throw 'Judge not found';
    if (user.email !== userParam.email && await Judge.findOne({ email: userParam.email })) {
        throw 'Email"' + userParam.email + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();



}

async function _delete(id) {
    await Judge.findByIdAndRemove(id);
}
