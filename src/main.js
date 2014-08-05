function printInventory(inputs)
{

  var goodsList = getGoodsList(inputs);

  var goodsListPrint = getgoodsListPrint(goodsList);   //goodList = goodQuantity

  console.log (goodsListPrint);

}

function getGoodsList(inputs){
  // console.log(inputs[0].barcode);
   var barcodes = splitBarcode(inputs);
   var goodsQuantity = getgoodsQuantity(barcodes);
   getPromotionGoodsQuantity(goodsQuantity);
    //  console.log(goodsQuantity);
   return goodsQuantity;

}

function splitBarcode(inputs){

  var barcodes = [];
  for(var i=0; i<inputs.length; i++){

    if(inputs[i].length>10)
      for(var j=0; j<inputs[i].substring(11,inputs[i].length); j++)
        barcodes.push(inputs[i].substring(0,10));

    else
      barcodes.push(inputs[i]);
  }
  return barcodes;
}
//
//
function getgoodsQuantity(barcodes)
{
  var goodsQuantity = [];                    //可以抽象为类

  for (var i=0;i<barcodes.length;i++){

    var barcode = barcodes[i];
    var barcodeHasExsited = judgeBarcodeHasExsited(barcode, goodsQuantity);
    if(barcodeHasExsited){
      barcodeHasExsited.quantity++;
    } else
      goodsQuantity.push({Barcode:barcode,
                         quantity:1,
                         promotionQuantity:0});
  }

  return goodsQuantity;
}
//
function judgeBarcodeHasExsited(barcode, goodsQuantity){

  var judgeValue;

  for(var i=0; i<goodsQuantity.length; i++){
    if(barcode === goodsQuantity[i].Barcode){

      judgeValue = goodsQuantity[i] ;
      break;
    }

  }
  return judgeValue;
}
// //
function getPromotionGoodsQuantity(goodsQuantity){
  // var promotions=loadPromotions();
  // var PromotionGoodsQuantity = [];
  var judgePromotion;

  for(var i=0; i<goodsQuantity.length; i++){
    judgePromotion = getJudgePromotion(goodsQuantity[i].Barcode);
    if(judgePromotion){
      goodsQuantity[i].promotionQuantity = Math.floor(goodsQuantity[i].quantity / 3);
    }
  }
}
//
function getJudgePromotion(barcode){

  var judgeValue;
  var promotions=loadPromotions();
  // console.log(barcode);
  for(var i=0; i<promotions[0].barcodes.length; i++){
    // console.log(promotions[0].barcodes);
    if(barcode === promotions[0].barcodes[i])
      judgeValue = true;
  }

  return judgeValue;
}
//
function getgoodsListPrint(goodsList){
  var itemText = '',
      promotionText = '',
      totalMoney = 0,
      saveMoney = 0;

  var goodsDetail = [];
  for(var i=0; i<goodsList.length; i++){
    goodsDetail.push(prepareGoodsListPrint(goodsList[i]));
// console.log(goodsDetail);
     totalMoney += goodsDetail[i].everyTotalMoney;
    // console.log(goodsDetail[i].everyTotalMoney);
     saveMoney += goodsDetail[i].everySaveMoney;
  }

   console.log(goodsDetail);
//
//
  itemText = printItemText(goodsDetail,itemText);
  promotionText = printPromotionText(goodsDetail ,promotionText);

  return   '***<没钱赚商店>购物清单***\n' +
           itemText +
           '----------------------\n' +
           '挥泪赠送商品：\n' +
           promotionText +
           '----------------------\n' +
           '总计：' + totalMoney.toFixed(2) + '(元)\n' +
           '节省：' + saveMoney.toFixed(2) + '(元)\n' +
           '**********************';


}
//
function printItemText(goodsDetail,itemText){

  for(var i=0; i<goodsDetail.length; i++){
    itemText += '名称：' + goodsDetail[i].name + '，数量：' + goodsDetail[i].quantity +
                goodsDetail[i].unit + '，单价：' + goodsDetail[i].price.toFixed(2) + '(元)，小计：' +
                goodsDetail[i].everyTotalMoney.toFixed(2) + '(元)\n';
  }
  return itemText;

}
//
//
function printPromotionText(goodsDetail ,promotionText){

  for(var i=0; i<goodsDetail.length; i++){
    if(goodsDetail[i].promotionQuantity >0 ){
      promotionText += '名称：' + goodsDetail[i].name +'，数量：' + goodsDetail[i].promotionQuantity +
                      goodsDetail[i].unit + '\n';

    }
  }
  return promotionText;
}
//
//
function prepareGoodsListPrint(goodsList){

  var allItems=loadAllItems();

  var goodsDetail ;
  for(var i=1; i<allItems.length; i++){
    if(goodsList.Barcode === allItems[i].barcode){

      goodsDetail = {name:allItems[i].name,
                        unit:allItems[i].unit,
                        price:allItems[i].price,
                        quantity:goodsList.quantity,
                        promotionQuantity:goodsList.promotionQuantity,
                        everyTotalMoney:allItems[i].price*(goodsList.quantity - goodsList.promotionQuantity),
                        everySaveMoney:allItems[i].price*goodsList.promotionQuantity
                      };
      break;
    }
  }
  return goodsDetail;

}
