/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var telephone_number; // 전화번호 전역 함수 
 var app_version="1.1.5";
 var version_check="n";
 var token="";
 var ref_app="";

var app = {
  
    // Application Constructor
    initialize: function() {

         this.bindEvents();

    },
    bindEvents: function() {

        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
      console.log("ready");
       receivedEvent('deviceready');
   
    }
    
  }

 function receivedEvent(id) {
     var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
document.addEventListener("offline", function(){  
  // navigator.notification.confirm(" Connect and try again. ", onConfirm, "No Internet", "EXIT"); 
  // navigator.notification.activityStop();
  //   alert("접속오류");      
  mode="error";
  
   gopage("error.html");
   ref.close();

   }, false);    
 
      //start_web();
       onmain();
    };




function onmain() {
document.addEventListener("backbutton", exit_app, false); 

         var reg_id=device.uuid;
       // 기기 번호 검출 
       
          console.log('Received Event: ' + reg_id);

          push = PushNotification.init({
    android: {
        senderID: "528703994079",
        sound: true,
             icon: 'phonegap',
    iconColor: 'blue'
    },

    browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    },
    ios: {
        alert: "true",
        badge: "true",
        sound: "true"
    },
    windows: {}
});
          PushNotification.hasPermission(function(data) {
    if (data.isEnabled) {
        console.log('isEnabled');
    }
});


push.on('registration', function(data) {
    console.log(data.registrationId);
    var reg_id=data.registrationId;
    if (reg_id=="BLACKLISTED") {
     navigator.app.exitApp();// 블랙 리스트인경우 실행중지
    }
 //  alert(data.registrationId);
 //  reg_id_save(data.registrationId);
    save_reg_id(data.registrationId);
   
  
    
  
});

push.on('notification', function(data) {
//  alert(data.message);
 // display_call_info(data.message);
// alert_msg("NOTICE",data.message);

  //
 
 
    
   
});

push.on('error', function(e) {
    // e.message
    alert_msg("ERROR",e.message);
});


  

        
    }



     function save_reg_id(reg_id) {
    var reg_id=reg_id;
    var cordova=device.cordova;
    var model=device.model;
    var platform=device.platform;
    var uuid=device.uuid;
    var version=device.version;
    var manufacturer=device.manufacturer;
    var isVirtual=device.isVirtual;
    var serial=device.serial;
    var uuid_json="{\"cordova\" : \"'+cordova+'\",\"model\" : \"'+model+'\",\"platform\" : \"'+platform+'\",\"uuid\" : \"'+uuid+'\",\"version\" : \"1.0\",\"manufacturer\" : \"'+manufacturer+'\",\"isVirtual\" : \"'+isVirtual+'\",\"serial\" : \"'+serial+'\",\"registration_id\":\"'+reg_id+'\"}";
    var data_json="{ \"app_data\":"+uuid_json+"}";
  


    console.log(data_json);

var xhr = new XMLHttpRequest();

xhr.open('POST', 'https://api.cloudbric.com/v2/mobile/device/');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('X-Cloudbric-Key', 'zzg0cockog4g0sk4kgcc44ow0go40sw88wkkg8ks');
xhr.onload = function(){
            var response = this.responseText;
            console.log(response);
     var token_data = JSON.parse(response);
     var app_token=token_data.result_info.device_token;

            console.log("token : "+app_token);

            app_version_check(app_token);

};

xhr.send(JSON.stringify({"app_data": {"uuid": uuid ,"registration_id": reg_id , "reg_id": reg_id , "cordova" : cordova , "model" : model , "platform" : platform , "version" : version , "manufacturer" : manufacturer , "isVirtual" : isVirtual , "serial" : serial  }}));

   }


   function app_version_check(token) {
  app_token=token;
   var uuid=device.uuid;
 $.ajax({
    url: "https://api.cloudbric.com/v2/mobile/version?platform=ios&app_id=com.cloudbric.console&current_version="+app_version,
    beforeSend: function(xhr) { 
      xhr.setRequestHeader("X-Cloudbric-Key", "zzg0cockog4g0sk4kgcc44ow0go40sw88wkkg8ks"); 
    },
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    processData: false,
    data: '{"current_version": "'+app_version+'"}',
    success: function (data) {
      var data = JSON.stringify(data);
      console.log(data);
      var version_data = JSON.parse(data);
     var last_version=version_data.result_info.device_app_info.latest_version;
     console.log("last : "+app_version);
      if (last_version!=app_version) {
 
       navigator.notification.alert(
    'An update for the application is available.',  // message
    onConfirm_update,         // callback
    'New update available!',            // title
    'update'                  // buttonName
);

      //var ref = cordova.InAppBrowser.open('market://details?id=com.nhn.android.search', '_system', 'location=no');

       

      //alert("버전이 다릅니다. 업데이트 후 이용해주세요.");
      return;
      
     } else {
   
start_web(app_token)

     }
    },
    error: function(data){
      var data = JSON.stringify(data);
      console.log(data);
      
    }
});
}


    function start_web(token) {
  var app_token=token;
   var uuid=device.uuid;
   ref = cordova.InAppBrowser.open('https://console-mobile.cloudbric.com?uuid='+uuid+'&token='+app_token+'&version='+app_version, '_blank', 'toolbar=no,location=no,enableViewportScale=yes');
   console.log('https://console-mobile.cloudbric.com?uuid='+uuid+'&token='+app_token);
   //ref.addEventListener('loadstart', inAppBrowserbLoadStart);
   //ref.addEventListener('loadstop', inAppBrowserbLoadStop);
   ref.addEventListener('loaderror', inAppBrowserbLoadError);
   //ref.addEventListener("backbutton", exit_show);
   //ref.addEventListener("backbutton", function () { alert("asd"); exit;})
   //ref.addEventListener('exit', exit_show);

   
}

function inAppBrowserbLoadError(event) {
   navigator.notification.activityStop();
   mode="error";
  
   gopage("error.html");
   ref.close();
}

function gopage (page) {
    var page=page;
    location.href=page;
}