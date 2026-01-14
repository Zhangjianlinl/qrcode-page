// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 防止页面被缩放
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });

    // 优化二维码长按识别体验
    const qrcode = document.querySelector('#qrcodeImg');
    if (qrcode) {
        // 禁用默认的长按菜单，让微信/支付宝能识别
        qrcode.addEventListener('contextmenu', function(e) {
            // 在微信/支付宝中不阻止，让它们能识别二维码
            if (!isWechat() && !isAlipay()) {
                e.preventDefault();
            }
        });
        
        // 添加触摸反馈
        qrcode.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        
        qrcode.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    }

    // 微信环境检测
    function isWechat() {
        return /MicroMessenger/i.test(navigator.userAgent);
    }

    // 支付宝环境检测
    function isAlipay() {
        return /AlipayClient/i.test(navigator.userAgent);
    }

    // 企业微信环境检测
    function isWorkWechat() {
        return /wxwork/i.test(navigator.userAgent);
    }

    // 根据环境显示不同提示
    if (isWorkWechat()) {
        console.log('当前在企业微信环境');
    } else if (isWechat()) {
        console.log('当前在微信环境');
    } else if (isAlipay()) {
        console.log('当前在支付宝环境');
    }
});
