var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: 'REMOVED',
        privateKey: 'REMOVED'
    });

client.customer.find("4TR6Bc", function(errData, data){

    if(errData){
        console.error("Error Message: " + errData.data.error.message);
        // handle the error
        return;
    }

    console.log("Success Response: " + JSON.stringify(data));
});
