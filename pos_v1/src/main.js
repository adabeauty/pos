//TODO: Please write code in this file.



function printInventory(inputs)
{
var    allItems=loadAllItems();
var item_sum=[];
//item_sum=0;

for (var i=0;i<inputs.length;i++)
  {
    for (var j=0;j<allItems.length;j++)
      {
        if(inputs[i].substring(0,10)===allItems[j])
          if(inputs[i].length>10)
            item_sum[j]=inputs[i].substring(11,inputs[i].length);
          else
            ++item_sum[j];
      }
  }


var str_num_1=1;
var str_num_2=2;
var string_1=[];
var string_2=[];

string_1[0]='***<没钱赚商店>购物清单***\n';
string_2[0]='挥泪赠送商品：\n' ;
var promotion=loadPromotions();
var pro_num=promotion[0].barcodes.length;

for(i=0;i<allItems.length;i++)
  {
    if(item_sum[i]!=0)
    {
      string_1[str_num_1]='名称：'+allItems[i].name +'数量:'+item_sum+
                        '单价:'+allItems[i].price+'(元)'+'小计：'+
                        item_sum[i]*allItems[i].price;
      judge_promotion();

    }

  }
function  judge_promotion(){
  for(j=0;j<pro_num;j++)
    {
      if(inputs[i]===promotion[0].barcodes[j])
        {

        }
    }
}
}
/*

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
}*/
