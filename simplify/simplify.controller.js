const express = require('express');
const router = express.Router();
var Simplify = require("simplify-commerce"),
client = Simplify.getClient({
    publicKey: 'sbpb_OGI3MjliOTUtYWMyZS00ZTE4LWFmYTgtNTdkZDQ1NTBhZGFm',
    privateKey: '6IpmiveAFIhKuVmp6CONqGsVnJKfuPc4C2q1endRa2l5YFFQL0ODSXAOkNtXTToq'
});


router.post('/recent', function(req, res) {
  client.customer.find(req.body.customerID, function(errData, data){

    if(errData){
        console.error("Error Message: " + errData.data.error.message);
        // handle the error
        return;
    }

    console.log("Success Response: " + JSON.stringify(data));
    res.send(data);
});

});


router.post('/cardToken', async (req,res)=>{

    client.cardtoken.create({
      card : req.body.card
      // {
      //    addressState : "MO",
      //    expMonth : "11",
      //    expYear : "35",
      //    addressCity : "OFallon",
      //    cvc : "123",
      //    number : "5105105105105100"
      // }
    }, function(errData, data){

      if(errData){
          console.error("Error Message: " + errData.data.error.message);
          // handle the error
          return;
      }

      console.log("Success Response: " + JSON.stringify(data));
      res.send(data);
    });
});

router.post('/addCard', async (req,res)=>{

    client.customer.update({
        id: req.body.customerID,
        email: req.body.email,
        name: req.body.firstName + " " + req.body.lastName,
        card: req.body.card,
        // card : {
        //    id : "",
        //    expMonth : "5",
        //    expYear : "35",
        //    cvc : "456",
        //    number : "5120790000000083"
        // },
        reference : "Ref1"
    }, function(errData, data){

        if(errData){
            console.error("Error Message: " + errData.data.error.message);
            // handle the error
            return;
        }

        console.log("Success Response: " + JSON.stringify(data));
        res.send(data);
    });

});

router.post('/transaction', async (req,res)=>{


      client.cardtoken.create({
        card : req.body.card
        // email : req.body.email
    }, function(errData, data){

        if(errData){
            console.error("Error Message: " + errData.data.error.message);
            // handle the error
            return;
        }

        // console.log("Success Response: " + JSON.stringify(data));
        console.log("Success Response: " + JSON.stringify(data.id));
        //Success Response

        client.payment.create({
              amount : req.body.amount,
              token : data.id,
              currency : "USD",
              customer : req.body.customerID
          }, function(errData, data){

              if(errData){
                  console.error("Error Message: " + errData.data.error.message);
                  return;
              }
              console.log("Payment Status: " + data.paymentStatus);
              res.send(data);
            });

    });

});



module.exports = router;
