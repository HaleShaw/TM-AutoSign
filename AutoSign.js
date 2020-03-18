// ==UserScript==
// @name                论坛自动签到
// @name:zh-CN          论坛自动签到
// @name:en             Auto Sign
// @description         论坛自动签到。
// @description:zh-CN   论坛自动签到。
// @description:en      Automatically Sign in on each BBS.
// @namespace           https://greasyfork.org/zh-CN/users/331591
// @version             1.0.0
// @author              Hale Shaw
// @homepage            https://greasyfork.org/zh-CN/scripts/389668
// @supportURL          https://greasyfork.org/zh-CN/scripts/389668/feedback
// @icon                https://www.itsk.com/favicon.ico
// @require             https://greasyfork.org/scripts/398010-commonutils/code/CommonUtils.js?version=781197
// @match               http*://*/plugin.php?id=*sign*
// @match               http*://bbs.gfan.com/*
// @match               https://www.itsk.com/dsu_paulsign-sign.html
// @match               http*://www.52pojie.cn/*
// @license             AGPL-3.0-or-later
// @compatible	        Chrome
// @run-at              document-idle
// @grant 		          unsafeWindow
// ==/UserScript==

(function () {

  // IT天空
  const urlSk = "https://www.itsk.com/dsu_paulsign-sign.html";

  // 机锋论坛
  const urlGfan = "http://bbs.gfan.com";
  const urlGfanSign = "http://bbs.gfan.com/plugin.php?id=dsu_paulsign:sign";

  // 52破解
  const url52PoJie = "52pojie.cn";

  // 签到内容
  const sginText = "剑无道，自动签到！";

  // IT天空
  if (isURL(urlSk)) {
    if (isSignPage()) {
      sign();
      return;
    }
    return;
  }

  // 机锋
  else if (isURL(urlGfan)) {
    if (isSignPage()) {
      sign();
      return;
    }
    if (window.find("签到领奖!")) {
      const currentUrl = window.location.href;
      window.location.href = urlGfanSign;
      sign(currentUrl);
      return;
    }
    return;
  }

  // 52破解
  else if (isURL(url52PoJie)) {
    document.getElementsByClassName('qq_bind')[0].click();
    return;
  }

  // 其他论坛
  else {
    if (isSignPage()) {
      sign();
      return;
    }
    sign2();
    return;
  }


  /**
   * check url.
   * @param {String} url
   */
  function isURL(url) {
    return window.location.href.indexOf(url) != -1;
  }

  function sign(url) {
    let kxImg1 = document.getElementById("ch_s");
    let kxImg2 = document.getElementById("6ch_s");
    let todaySayTextArea = document.getElementById("todaysay");
    if (kxImg1 == null && kxImg2 == null) {
      return;
    }
    if (kxImg1 != null) {
      kxImg1.setAttribute('checked', true);
    }
    if (kxImg2 != null) {
      kxImg2.setAttribute('checked', true);
    }
    todaySayTextArea.value = sginText;
    const button = document.getElementById("qiandao");
    button.submit();
    if (url != null) {
      window.location.href = url;
    }
    return;
  }

  function sign2() {
    if (document.getElementById("kx")) {
      document.getElementById("kx").click();
    }
    var todaySayTextArea = document.getElementById("todaysay");
    if (todaySayTextArea != null) {
      todaySayTextArea.value = sginText;
    }
    try {
      unsafeWindow.showWindow('qwindow', 'qiandao', 'post', '0');
    }
    catch (err) {
      console.warn("AutoSign show window error!\n" + err);
    }
    return;
  }

  function isSignPage() {
    return (window.find("今天签到了吗") && window.find("写下今天最想说的话"));
  }
})();
