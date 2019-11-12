var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: 'REMOVED',
        privateKey: 'REMOVED'
    });

client.customer.create({
    email : "customer@mastercard.com",
    name : "Customer Customer",
    card : {
       expMonth : "11",
       expYear : "35",
       cvc : "123",
       number : "5555555555554444"
    },
    reference : "Ref1"
}, function(errData, data){

    if(errData){
        console.error("Error Message: " + errData.data.error.message);
        // handle the error
        return;
    }

    console.log("Success Response: " + JSON.stringify(data));
});
