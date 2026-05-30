var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: process.env.SIMPLIFY_PUBLIC_KEY,
        privateKey: process.env.SIMPLIFY_PRIVATE_KEY
    });

client.customer.find("4TR6Bc", function(errData, data){

    if(errData){
        console.error("Error Message: " + errData.data.error.message);
        // handle the error
        return;
    }

    console.log("Success Response: " + JSON.stringify(data));
});
