/******* Access Obj From For NodeJS Version >= V14  ********/
const obj = undefined;
const res = obj?.b?.c?.name;
console.log('>>>>>>>>> res:', res); // => undefined

const obj2: any = {
  x1: {
    x2: {
      name: 'Tuan Nguyen'
    }
  }
};
const res2 = obj2?.zzzzz?.ssssss?.name;
console.log('>>>>>>>>> res2:', res2); // => undefined

const res3 = obj2?.x1?.x2?.name;
console.log('>>>>>>>>> res2:', res3); // => Tuan Nguyen


// EX
const example = {a: ['first', {b: 3}, false]};
example?.c ?? 'c';  // "c"
example?.c || 'c';  // "c"

example?.a?.[2] ?? 2;  // false
example?.a?.[2] || 2;  // 2







// =>> OLD Note 
var a = undefined;
// Option 1 (Recommand)
var t = (a && a.abc && a.abc.def && a.abc.def.ghi) ? "Full access" : "No access";
console.log({ t })

// Option 2
if(a && a.abc && a.abc.def && a.abc.def.ghi){
  a = { mess : "Full accescc to wifi" }
}else {
  a = { mess : "No accesss" }
}
console.log({ a })
