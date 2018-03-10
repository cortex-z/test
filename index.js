// ==UserScript==
// @name         自用视频解析
// @match        *://v.youku.com/v_show/*
// @match        *://*.iqiyi.com/v_*
// @match        *://*.iqiyi.com/dianying/*
// @match        *://*.le.com/ptv/vplay/*
// @match        *://v.qq.com/x/cover/*
// @match        *://v.qq.com/x/page/*
// @match        *://*.tudou.com/listplay/*
// @match        *://*.tudou.com/albumplay/*
// @match        *://*.tudou.com/programs/view/*
// @match        *://*.mgtv.com/b/*
// @match        *://film.sohu.com/album/*
// @match        *://*.acfun.cn/v/*
// @match        *://*.bilibili.com/video/*
// @match        *://*.bilibili.com/anime/*
// @match        *://vip.pptv.com/show/*
// @match        *://v.yinyuetai.com/video/*
// @match        *://v.yinyuetai.com/playlist/*
// @match        *://*.wasu.cn/Play/show/*
// @match        *://*.tv.sohu.com/*
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    var curPlaySite = '';
    var curWords = '';
    var videoSite = window.location.href;
    var reYk = /youku/i;
    var reAqy = /iqiyi/i;
    var reLS = /le/i;
    var reTX = /qq/i;
    var reTD = /tudou/i;
    var reMG = /mgtv/i;
    var reSH = /sohu/i;
    var reAF = /acfun/i;
    var reBL = /bilibili/i;
    var reYJ = /1905/i;
    var rePP = /pptv/i;
    var reYYT = /yinyuetai/i;
    var vipBtn = '<a id="goudidiaoVipBtn" style="cursor:pointer;text-decoration:none;color:red;padding:0 5px;border:1px solid red;">解析</a>';
    var mSearchBtn = '';
    var currentPage = window.location.href;
    var isHttps = window.location.href.indexOf('https');
    var redirectTo = isHttps ? 'https://1717ty.duapp.com/ty.php?url=' + currentPage : 'http://www.1717yun.com/jx/ty.php?url=' + currentPage;
    // 优酷
    if(reYk.test(videoSite)){
        var youkuTitle = $('#subtitle');
        if(youkuTitle.length !== 0){
        	youkuTitle.after(mSearchBtn).after(vipBtn);
	        $('#goudidiaoVipBtn').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 5px','vertical-align':'bottom'});
	        $('#goudidiaoSearchBtn').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 5px','vertical-align':'bottom'});
	        if($('.tvinfo').length !== 0){
	        	curWords = $('.tvinfo').find('h2').eq(0).find('a').text();
	        }else{
	        	curWords = $('.title').attr('title');
	        }
	        $('#goudidiaoSearchBtn').attr('href',redirectTo);
        }else{
        	$('.title').after(mSearchBtn).after(vipBtn);
        	$('#goudidiaoVipBtn').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 5px','vertical-align':'bottom'});
	        $('#goudidiaoSearchBtn').css({'font-size':'17px','display':'inline-block','height':'22px','line-height':'22px','margin':'0 5px','vertical-align':'bottom'});
	       	if($('.tvinfo').length !== 0){
	        	curWords = $('.tvinfo').find('h3').eq(0).text();
	        }else{
	        	curWords = $('.title').attr('title');
	        }
	        $('#goudidiaoSearchBtn').attr('href',redirectTo);
        }
    }
    // 爱奇艺
    if(reAqy.test(videoSite)){
        var iqiyiTitle = $('#widget-videotitle');
        iqiyiTitle.parent('.mod-play-tit').append(vipBtn).append(mSearchBtn);
        $('#goudidiaoVipBtn').css({'font-size':'17px','display':'inline-block','height':'24px','line-height':'24px','margin':'0 5px'});
        $('#goudidiaoSearchBtn').css({'font-size':'17px','display':'inline-block','height':'24px','line-height':'24px','margin':'0 5px'});
        if($('#drama-series-title').length !== 0){
        	curWords = $('#drama-series-title').find('a').text();
        }else{
        	curWords = iqiyiTitle.text();
        }
        $('#goudidiaoSearchBtn').attr('href',redirectTo);
    }
    // 乐视
    if(reLS.test(videoSite)){
        var lsTitle = $('.j-video-name');
        lsTitle.after(mSearchBtn).after(vipBtn);
        lsTitle.css('float','left');
        $('#goudidiaoVipBtn').css({'font-size':'16px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 5px'});
        $('#goudidiaoSearchBtn').css({'font-size':'16px','display':'inline-block','height':'20px','line-height':'20px','margin':'0 5px'});
       	if($('.Info').find('.title').find('h3').length !== 0){
        	curWords = $('.Info').find('.title').find('h3').text();
        }else{
        	curWords = lsTitle.text();
        }
        $('#goudidiaoSearchBtn').attr('href',redirectTo);
    }
    // 腾讯
    if(reTX.test(videoSite)){
        var qqTitle = $('.mod_intro').find('.video_title');
        qqTitle.eq(0).after(mSearchBtn).after(vipBtn);
        $('#goudidiaoVipBtn').css({'font-size':'24px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
        $('#goudidiaoSearchBtn').css({'font-size':'24px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
        if($('.player_title').length !== 0 && $('.player_title').find('a').length === 0){
        	curWords = $('.player_title').text();
        }else{
        	curWords = $('._base_title').text();
        }
        if(curWords === ''){
        	curWords = $('.player_title').text();
        }
        $('#goudidiaoSearchBtn').attr('href',redirectTo);
    }
    // 土豆
    if(reTD.test(videoSite)){
        var tdTitle = $('#videoKw');
        tdTitle.parent('.fix').append(vipBtn);
        $('#goudidiaoVipBtn').css({'font-size':'18px','display':'inline-block','height':'22px','line-height':'22px','margin':'14px 5px 0'});
    }
    // 芒果
    if(reMG.test(videoSite)){
        var mgTitle = $('.v-panel-title');
        mgTitle.after(mSearchBtn).after(vipBtn);
        mgTitle.css({'float':'left','margin-right':'0'});
        $('#goudidiaoVipBtn').css({'font-size':'22px','display':'inline-block','height':'40px','line-height':'40px','margin':'0 5px'});
        $('#goudidiaoSearchBtn').css({'font-size':'22px','display':'inline-block','height':'40px','line-height':'40px','margin':'0 5px'});
    	curWords = mgTitle.text();
        $('#goudidiaoSearchBtn').attr('href',redirectTo);
    }
    // 搜狐
    if(reSH.test(videoSite)){
        var shTitle = $($('.crumbs').parent().children()[1]);
        shTitle.append(vipBtn).append(mSearchBtn);
        shTitle.find('h2').css({'float':'left'});
        $('#goudidiaoVipBtn').css({'font-weight':'bold','font-size':'17px','display':'inline-block','height':'18px','margin':'0 5px'});
        $('#goudidiaoSearchBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'20px','line-height':'36px','margin':'0 5px'});
        curWords = shTitle.find('h2').text();
        $('#goudidiaoSearchBtn').attr('href',redirectTo);
    }
    // pptv
    if(rePP.test(videoSite)){
        var pptvTitle = $('.title_video').find('h3');
        pptvTitle.after(mSearchBtn).after(vipBtn);
        $('#goudidiaoVipBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
        $('#goudidiaoSearchBtn').css({'font-weight':'bold','font-size':'16px','display':'inline-block','height':'36px','line-height':'36px','margin':'0 5px'});
        curWords = pptvTitle.text();
        $('#goudidiaoSearchBtn').attr('href',redirectTo);
    }
    // 音悦台
    if(reYYT.test(videoSite)){
        var yytTitle = $('.videoName');
        yytTitle.append(vipBtn);
        $('#goudidiaoVipBtn').css({'font-weight':'bold','font-size':'14px','display':'inline-block','height':'32px','line-height':'32px','margin':'0 5px'});
    }
    $('#goudidiaoVipBtn').on('click',function(){
        curPlaySite = window.location.href;
        window.location.href = redirectTo;
    });
})();