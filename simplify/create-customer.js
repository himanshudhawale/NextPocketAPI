var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: 'sbpb_OGI3MjliOTUtYWMyZS00ZTE4LWFmYTgtNTdkZDQ1NTBhZGFm',
        privateKey: '6IpmiveAFIhKuVmp6CONqGsVnJKfuPc4C2q1endRa2l5YFFQL0ODSXAOkNtXTToq'
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
