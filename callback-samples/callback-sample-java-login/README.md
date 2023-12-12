download 
https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/callback-samples

cd into the directory callback-samples/callback-sample-java-login

edit:

1)

/callback-sample-java-login/src/main/resources/application.yaml

update
* client-id:  
* client-secret:  

2)

edit /callback-sample-java-login/src/main/java/com/cisco/wxcc/api/router/RequestRouter.java

modify the JSON in these two methods:

* makeOutdialCall
* makeExecuteFlowCall


open terminal
cd into the directory callback-samples/callback-sample-java-login

execute
>./gradlew bootrun

then go to http://localhost:8080

Video
[https://app.vidcast.io - detail](https://app.vidcast.io/share/270b29cb-7169-495f-8449-e0483b9f1393)
[https://app.vidcast.io - generic](https://app.vidcast.io/share/7a1224ef-e86c-44bf-b3ce-ca119d0a23f3)
