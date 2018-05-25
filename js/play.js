var NebPay = require("nebpay");
var nebPay = new NebPay();

var dappAddress = "n22xpbB9NzxtuCUNBBEJCoPfz1xWJTMMvqo";


function updateRecord(score) {
    var to = dappAddress;
    var value = "0.0001";
    var callFuncation = "updateRecord";
    var callArgs = "["+score+"]";
    nebPay.call(to, value, callFuncation, callArgs,{
        listener: function (resp) {
            try{
                console.log(resp)
                if(resp.txhash.toString().length>0){
                    alert("上链成功")
                    return;
                }
                if(resp.startsWith("Error")){
                    alert("支付失败");
                    return;
                }
            }catch (e){
                alert("支付失败")
            }

        }
    })
};


//获取玩家记录
function getPersonalMaxRecord() {
    nebPay.simulateCall(dappAddress, 0, "getPersonalMaxRecord", "[]",{
        listener: getPersonalMaxRecordCallBack
    });
};
//获取世界纪录
function getWorldMaxRecord() {
    nebPay.simulateCall(dappAddress, 0, "getWorldMaxRecord","[]",{
        listener: getWorldMaxRecordCallBack
    });
}

function getPersonalMaxRecordCallBack(resp) {
    console.log(resp);
	if(resp.result.indexOf("score") > 0){
		  var record = JSON.parse(resp.result);
		if(record.score !== 'null'){
			personalMaxRecord = record.score;
		}else {
			personalMaxRecord = 0;
		}				
	}else{
		personalMaxRecord = 0;
	}
  
    document.getElementById("personalMaxRecord").innerHTML = ""+personalMaxRecord;

}

function getWorldMaxRecordCallBack(resp) {
    console.log(resp);
	if(resp.result.indexOf("score") > 0){
		var record = JSON.parse(resp.result);
		if(record.score !== 'null'){
			worldMaxRecord = record.score;
		}else {
			worldMaxRecord = 0;
		}				
	}else{
		worldMaxRecord = 0;
	}
    document.getElementById("worldMaxRecord").innerHTML = ""+worldMaxRecord;
}
