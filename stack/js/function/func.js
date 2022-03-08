
* Filter + uniq
shopIds = [1,2, null]
shopIds = _.uniq(_.filter(shopIds , function (item) { return item != null }));
==> [1,2]

* Map
shopIds = _.map(offShopProduct.rows, function(item) { return item.key });


* Map array to Object-key-value
const rows = "rows": [
    {
      "key": 1,
      "doc_count": 7
    }
]

const xxx = _.chain(rowss).keyBy("key").mapValues("doc_count").value();
console.log({ xxx }) // { '1': 7 }

const xxx = _.chain(rowss).keyBy("key").value();
console.log({ xxx }) // { '1': { 'key': 1, 'doc_count': 7 } }

* Map array_object to array item 
const data = [{"productId":111090330,"shopId":1}];
const shopIds = _.uniqBy( offshopProductList.rows , 'shopId').map((item: any, _) => {
    return item.shopId
});
==>> shopIds = [1]
















