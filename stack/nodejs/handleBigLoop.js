
===== 
NodeJS handle Big Task Blocking:


===============================================================================================

// Kĩ Thuật Off-loading
// Kĩ Thuật Partitioning

// Off-Loading:
// Chúng ta vẫn chưa giảm được độ phức tạp thuật toán (O(n)), nhưng nó giúp Chúng ta có thể sử dụng các Worker
// xử lý các tác vụ phức tạp cao / nặng thay thế cho Main - Thread.Điều này cũng có thể hình dung đơn giản,
// Với những tiền tạo có Tốc Độ cao, thay vì dốc bóng từ sân nhà, Họ có thể chuyền cho các Hậu Vệ cánh, và ghi bàn sau pha tạt cánh từ Hậu Vệ 😜.

// Nhưng số lượng Worker là Hữu Hạn, và chắc chắn sẽ có thời điểm số lượng Request lớn hơn
// số lượng Worker sẵn sàng nhận job(tham khảo code Off - Loading trong NodeJS: https://nodesource.com/blog/worker-threads-nodejs/). Và rồi chúng ta phải nhắc thêm về Kĩ Thuật thứ 2: Partitioning.


// Thường thì mình hay áp dụng với rule như sau:
// Offloading: cho các tác vụ nặng + tính toán nặng 📝
// Partitioning: Tác vụ duyệt mảng 🔁


router.get('/slow', async (req, res) => {
    await Slow()
    res.json(`done, total ;)))`);
});
// => Slow is Non-Block => /check will oke ;)

router.get('/big', async (req, res) => { // 💚 Healthy Route
    // const t = await cal(10)
    // res.json(`done, total: ${t}`);

    let times = 10
    function calculateTotal (n, cbRunHugeArrWithRonaldo) { 
        let total = 0;
        const FIRST_ITEM_FOR_LOOP = 1;
        
        function helpSplit(i, cbHelpSplit) {
            console.log(">>>>>>>> i: ", i)
            total += i;

            if (i == times) {
                return cbHelpSplit(total);
            }
                
            setImmediate(helpSplit.bind(null, i + 1, cbHelpSplit));
        }
        // => setImmediate giúp chuyển sang tick tiếp theo và đợi đến phase tiếp theo với 
        // giá trị i+1 và sẵn sàng  nhận các external event(request) để xử lý
        // (tham khảo: https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

                
        helpSplit(FIRST_ITEM_FOR_LOOP, totalResult => {
            return cbRunHugeArrWithRonaldo(totalResult);
        })
    }

    
    return calculateTotal(times, totalReuslt => {
        res.json(`done, total: ${totalReuslt}`);
    })
});
// OKE :)


router.get('/', async (req, res) => {
    let times = 10000 // 10000000;
    let total = 0;
    
    for (let i=1; i<=times; i++) {
        total += +i;
    }
    res.json(`done, total: ${total}`);
});
// => Block => /check will pending :((

router.get('/check', (req, res) => {
    res.json(`i'm fine`);
});


async function Slow() {
    return new Promise((resolve, reject) => {
        return setTimeout(function () {
            resolve(true)
        }, 10000)
    })
}




=====
* setImmediate() vs setTimeout()
 - setImmediate() is designed to execute a script once the current poll phase completes.
 - setTimeout() schedules a script to be run after a minimum threshold in ms has elapsed.

EX: Result depend performance of the process:
//>>> timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});

====> 
$ node timeout_vs_immediate.js
timeout
immediate

$ node timeout_vs_immediate.js
immediate
timeout


-------------------------------------------------
However, if you move the two calls within an I/O cycle, the immediate callback is always executed first:
// timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});

=>
$ node timeout_vs_immediate.js
timeout
immediate

$ node timeout_vs_immediate.js
immediate
timeout
-------------------------------------------------

process.nextTick()