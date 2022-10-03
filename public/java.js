// Socket Enable
var socket = io();

socket.on("transmit", msg=>{
    console.log(msg);
})
// Socket Enable End
var portNum;
var brandNum;
var portNames =['A', 'B', 'C']
var nfcStr;

var popn = 0;

const ip = 'http://192.168.1.100:5000';
var happytimeout;
var phonetimeout;
var nfctimeout;

function SocketSend(message)
{
    // Socket Mode
    socket.emit("transmit", message);
    // Console Mode
    console.log(message);
}

const timer = setInterval(function (){
        for (var i = 0; i <= 2; i++) {
            if(count[i]!= 0) {
                var str;
                str=String(Math.floor(count[i]/60)).padStart(2, '0')+":"+String(Math.floor(count[i]%60)).padStart(2, '0');
                document.getElementById("timer-"+i).innerText = str;
            }
        }
        if(count[0]!= 0){
            count[0]--;
            if(count[0] == 0){
                document.getElementById('timer-0').style.background = "none";
                document.getElementById("timer-0").innerText = "00:00";
                document.getElementById('PortEdit').innerHTML=`<button class="${(count[0]== 0)?'port-but':'port-dis" disabled="'}" onclick="brand(1)">1</button>\n          <button class="${(count[1]== 0)?'port-but':'port-dis" disabled="'}" onclick="brand(2)">2</button>\n          <button class="${(count[2]== 0)?'port-but':'port-dis" disabled="'}" onclick="brand(3)">3</button>`;
                popup();
            }
        }
        if(count[1]!= 0){
            count[1]--;
            if(count[1] == 0){
                document.getElementById('timer-1').style.background = "none";
                document.getElementById("timer-1").innerText = "00:00";
                document.getElementById('PortEdit').innerHTML=`<button class="${(count[0]== 0)?'port-but':'port-dis" disabled="'}" onclick="brand(1)">1</button>\n          <button class="${(count[1]== 0)?'port-but':'port-dis" disabled="'}" onclick="brand(2)">2</button>\n          <button class="${(count[2]== 0)?'port-but':'port-dis" disabled="'}" onclick="brand(3)">3</button>`;
                popup();
            }
        }
        if(count[2]!= 0){
            count[2]--;
            if(count[2] == 0){
                document.getElementById('timer-2').style.background = "none";
                document.getElementById("timer-2").innerText = "00:00";
                document.getElementById('PortEdit').innerHTML=`<button class="${(count[0]== 0)?'port-but':'port-dis" disabled="'}" onclick="brand(1)">1</button>\n          <button class="${(count[1]== 0)?'port-but':'port-dis" disabled="'}" onclick="brand(2)">2</button>\n          <button class="${(count[2]== 0)?'port-but':'port-dis" disabled="'}" onclick="brand(3)">3</button>`;
                popup();
            }
        }
    }, 16);

var count = [0, 0, 0];

function port(){
    document.getElementById("popup").style.display = "none";
    document.getElementById('MainPage').style.display='none';
    document.getElementById('PortSelection').style.display='block';
    document.getElementById('PortEdit').innerHTML=`<button class="${(count[0]== 0)?'port-but':'port-dis" disabled="'}" onclick="brand(1)">1</button>\n          <button class="${(count[1]== 0)?'port-but':'port-dis" disabled="'}" onclick="brand(2)">2</button>\n          <button class="${(count[2]== 0)?'port-but':'port-dis" disabled="'}" onclick="brand(3)">3</button>`;
    document.getElementById('BrandSelection').style.display='none';
    document.getElementById('LeavePhoneDownInstruction').style.display='none';
    document.getElementById('HappyChargingMessage').style.display='none';
    document.getElementById('NFCTapInstruction').style.display='none';
    document.getElementById('CableDropWaitInstruction').style.display='none';
    console.log("port");
}

function nfc(brandN){
    brandNum = brandN;
    document.getElementById('MainPage').style.display='none';
    document.getElementById('PortSelection').style.display='none';
    document.getElementById('LeavePhoneDownInstruction').style.display='none';
    document.getElementById('NFCTapInstruction').style.display='block';
    document.getElementById('BrandSelection').style.display='none';
    document.getElementById('HappyChargingMessage').style.display='none';
    document.getElementById('CableDropWaitInstruction').style.display='none';
    console.log("nfc");
    SocketSend(`NFC1`);
    // Wait NFC
    nfctimeout = setTimeout(cable, 2000);
}

function brand(portN){
    portNum = portN-1;
    document.getElementById('BrandSelection').style.display='block';
    document.getElementById('LeavePhoneDownInstruction').style.display='none';
    document.getElementById('PortSelection').style.display='none';
    document.getElementById('MainPage').style.display='none';
    document.getElementById('HappyChargingMessage').style.display='none';
    document.getElementById('NFCTapInstruction').style.display='none';
    document.getElementById('CableDropWaitInstruction').style.display='none';
    console.log("brand");
    console.log(portNum);
}

function phone(){
    document.getElementById('LeavePhoneDownInstruction').style.display='block';
    document.getElementById('BrandSelection').style.display='none';
    document.getElementById('PortSelection').style.display='none';
    document.getElementById('MainPage').style.display='none';
    document.getElementById('NFCTapInstruction').style.display='none';
    document.getElementById('HappyChargingMessage').style.display='none';
    document.getElementById('CableDropWaitInstruction').style.display='none';
    console.log("phone");
    // setTimeout(happy, 500);
    happytimeout = setTimeout(happy, 4000);
}

function happy(){
    document.getElementById('HappyChargingMessage').style.display='block';
    document.getElementById('LeavePhoneDownInstruction').style.display='none';
    document.getElementById('BrandSelection').style.display='none';
    document.getElementById('PortSelection').style.display='none';
    document.getElementById('MainPage').style.display='none';
    document.getElementById('NFCTapInstruction').style.display='none';
    document.getElementById('CableDropWaitInstruction').style.display='none';
    console.log("happy");
    // setTimeout(chargeit, 500);
    setTimeout(chargeit, 1000);
}

function cable(){
    SocketSend(`NFC0`);
    document.getElementById('MainPage').style.display='none';
    document.getElementById('PortSelection').style.display='none';
    document.getElementById('NFCTapInstruction').style.display='none';
    document.getElementById('LeavePhoneDownInstruction').style.display='none';
    document.getElementById('BrandSelection').style.display='none';
    document.getElementById('CableDropWaitInstruction').style.display='block';
    document.getElementById('HappyChargingMessage').style.display='none';
    console.log("cable");
    console.log(brandNum);
    // setTimeout(phone, 500);
    SocketSend(`${portNames[portNum]}1D`);
    phonetimeout = setTimeout(phone, 4000);
}

function home(){
    document.getElementById('MainPage').style.display='block';
    document.getElementById('PortSelection').style.display='none';
    document.getElementById('NFCTapInstruction').style.display='none';
    document.getElementById('LeavePhoneDownInstruction').style.display='none';
    document.getElementById('CableDropWaitInstruction').style.display='none';
    document.getElementById('HappyChargingMessage').style.display='none';
    console.log("home");
}

function chargeit(){
    home();
    document.getElementById("timer-"+portNum).style.background = "green";
    document.getElementById("timer-"+portNum).innerText = "10:00";
    count[portNum] = 599;
}
function popup(){
    SocketSend(`${portNames[portNum]}1U`);
    var pop = setInterval(function () {
        if(document.getElementById('MainPage').style.display == 'block'){
          if(popn==0) SocketSend(`BUZZ1`);
          if(popn % 3 == 0){
              document.getElementById("popup").style.display = "none";
              popn++;
          }else{
              document.getElementById("popup").style.display = "block";
              popn++;
          }
          if(popn==10){ clearInterval(pop); popn=0;}
        }else{
            document.getElementById("popup").style.display = "none";
            SocketSend(`BUZZ0`);
            clearInterval(pop); popn=0;
        }
    },1000)
}