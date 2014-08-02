function printInventory(inputs)
{
  var allItems=loadAllItems();
  var item_sum=new Array();
  var discount_goods_num=new Array();
  for(var i=0;i<allItems.length;i++)
      {
        discount_goods_num[i]=0;
        item_sum[i]=0;
      }
  for (var i=0;i<inputs.length;i++)
    {
      for (var j=0;j<allItems.length;j++)
        {
          if(inputs[i].substring(0,10)==allItems[j].barcode)
          {
            if(inputs[i].length>10)
              item_sum[j]=inputs[i].substring(11,inputs[i].length);
            else
              ++item_sum[j];
          }
        }
    }
  var string_1=[];
  var string_2=[];
  string_1[0]='***<没钱赚商店>购物清单***\n';
  string_1='***<没钱赚商店>购物清单***\n';
  string_2='挥泪赠送商品：\n' ;
  var promotion=loadPromotions();
  var num_1,num_2,num;
  var sum_1=0;
  var sum_2=0;
  for(i=0;i<allItems.length;i++)
    {
      if(item_sum[i]!=0)
      {
        for(j=0;j<promotion[0].barcodes.length;j++)
          {
            if(allItems[i].barcode==promotion[0].barcodes[j])
            {
                num_1=Math.floor(item_sum[i]/3|0);
                discount_goods_num[i]=num_1;
                if(num_1>=1)
                {
                  string_2+='名称：'+allItems[i].name +'，数量：'+num_1+allItems[i].unit+'\n';
                  sum_2+=allItems[i].price * num_1;
                }
              }
          }
          string_1+='名称：'+allItems[i].name +'，数量：'+item_sum[i]+allItems[i].unit+
                     '，单价：'+allItems[i].price.toFixed(2)+'(元)，小计：'+
                      ((item_sum[i]-discount_goods_num[i])*allItems[i].price).toFixed(2)+'(元)\n';
          sum_1+=allItems[i].price * (item_sum[i]-discount_goods_num[i]);
        }
      }
     console.log(string_1+'----------------------\n' +string_2+'----------------------\n'+
                 '总计：'+ sum_1.toFixed(2) +'(元)\n' +'节省：'+sum_2.toFixed(2)+'(元)\n'+'**********************');
}
