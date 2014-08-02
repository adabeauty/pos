function printInventory(inputs)
{
  var allItems=loadAllItems();
  var item_sum=new Array();
  for(var i=0;i<allItems.length;i++)
      item_sum[i]=0;
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
  // var str_num_1=1;
  // var str_num_2=1;
  var string_1=[];
  var string_2=[];
  string_1[0]='***<没钱赚商店>购物清单***\n';
  string_1='***<没钱赚商店>购物清单***\n';
  // console.log(string_1[0]);
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
            if(inputs[i]==promotion[0].barcodes[j])
            {
                num_1=Math.floor(item_sum[i]/3|0);
                num_2=item_sum[i]%3;
                num=num_1*2+num_2;
                item_sum[i]=num;
                if(num_1>=1)
                {
                  string_2+='名称：'+allItems[i].name +', 数量 : '+num_1+allItems[i].unit+'\n';
                  // ++str_num_2;
                  sum_2+=allItems[i].price * num_1;
                  // console.log(string_2[str_num_2]);
                }
              }
          }
          string_1+='名称：'+allItems[i].name +', 数量 : '+item_sum[i]+
                              allItems[i].unit+', 单价:'+allItems[i].price+'(元)'+
                             '， 小计：'+item_sum[i]*allItems[i].price+'(元)\n';
          // string_1[str_num_1]='名称：'+allItems[i].name +', 数量 : '+item_sum[i]+
          //                     allItems[i].unit+', 单价:'+allItems[i].price+'(元)'+
          //                    '， 小计：'+item_sum[i]*allItems[i].price+'(元)\n';
          // console.log(string_1[str_num_1]);
          //  ++str_num_1;
          sum_1+=allItems[i].price * item_sum[i];
        }
      }
     console.log(string_1+'----------------------\n' +string_2+'----------------------\n'+
                 '总计：'+ sum_1 +'(元)\n' +'节省：'+sum_2+'(元)\n'+'**********************');
}
var inputs = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2',
        'ITEM000005',
        'ITEM000005',
        'ITEM000005'
    ];
printInventory(inputs);





function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}

function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ]
}
