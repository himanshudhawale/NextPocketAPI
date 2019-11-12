var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: 'sbpb_OGI3MjliOTUtYWMyZS00ZTE4LWFmYTgtNTdkZDQ1NTBhZGFm',
        privateKey: '6IpmiveAFIhKuVmp6CONqGsVnJKfuPc4C2q1endRa2l5YFFQL0ODSXAOkNtXTToq'
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
