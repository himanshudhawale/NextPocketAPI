var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: process.env.SIMPLIFY_PUBLIC_KEY,
        privateKey: process.env.SIMPLIFY_PRIVATE_KEY
    });

client.customer.update({
    id: "4TR6Bc",
    email : "customer111@mastercard.com",
    name : "Customer Cust",
    card : {
       id : "",
       expMonth : "5",
       expYear : "35",
       cvc : "456",
       number : "5120790000000083"
    },
    reference : "Ref11"
}, function(errData, data){

    if(errData){
        console.error("Error Message: " + errData.data.error.message);
        // handle the error
        return;
    }

    console.log("Success Response: " + JSON.stringify(data));
});
