// ==UserScript==
// @name               论坛自动签到
// @name:en            Auto Sign
// @description        论坛自动签到
// @description:en     Automatically Sign in on each BBS.
// @namespace          https://github.com/HaleShaw
// @version            1.2.8
// @author             HaleShaw
// @copyright          2020+, HaleShaw (https://github.com/HaleShaw)
// @license            AGPL-3.0-or-later
// @homepage           https://github.com/HaleShaw/TM-AutoSign
// @supportURL         https://github.com/HaleShaw/TM-AutoSign/issues
// @downloadURL        https://github.com/HaleShaw/TM-AutoSign/raw/master/AutoSign.user.js
// @updateURL          https://github.com/HaleShaw/TM-AutoSign/raw/master/AutoSign.user.js
// @contributionURL    https://www.jianwudao.com/
// @icon               https://www.itsk.com/favicon.ico
// @require            https://greasyfork.org/scripts/398010-commonutils/code/CommonUtils.js?version=781197
// @match              http*://*/plugin.php?id=*sign*
// @match              https://www.itsk.com/dsu_paulsign-sign.html
// @match              http*://www.52pojie.cn/*
// @match              https://mpyit.com/*
// @match              https://www.mpyit.com/*
// @match              https://pan.baidu.com/disk/home*
// @match              https://pan.xunlei.com/*
// @match              https://account.teambition.com/login*
// @compatible         Chrome
// @grant              unsafeWindow
// @grant              GM_setValue
// @grant              GM_getValue
// @grant              GM_registerMenuCommand
// ==/UserScript==

// ==OpenUserJS==
// @author             HaleShaw
// @collaborator       HaleShaw
// ==/OpenUserJS==

(function () {
  // IT天空
  const urlSk = "https://www.itsk.com/dsu_paulsign-sign.html";

  // 52破解
  const url52PoJie = "52pojie.cn";

  // 老殁
  const urlMpy = "mpyit.com";
  const author = "Hale";
  const email = "HaleShaw@163.com";
  let cipher = GM_getValue("cipher");

  // 百度
  const baidu = "https://pan.baidu.com/disk/home";

  // 迅雷
  const thunder = "https://pan.xunlei.com/";

  // Teambition
  const teambition = "https://account.teambition.com/login";

  // 签到内容
  const signText = "剑无道，自动签到！";

  // IT天空
  if (isURL(urlSk)) {
    if (isSignPage()) {
      sign();
      return;
    }
    return;
  }

  // 52破解
  else if (isURL(url52PoJie)) {
    document.getElementsByClassName("qq_bind")[0].click();
    return;
  }

  // 老殁
  else if (isURL(urlMpy)) {
    registerMenuCommand();
    removeADDialog();
    if (isValidByClassName("reply-to-read")) {
      const comment = document.querySelector('ol.commentlist>li:first-child>div');
      if (comment && comment.innerText.indexOf("您的评论正在等待审核中") == -1) {
        if (isValidById("author")) {
          document.getElementById("author").value = author;
        }
        if (isValidById("email")) {
          document.getElementById("email").value = email;
        }

        if (isValidById("comment")) {
          document.getElementById("comment").value = "谢谢分享！";

          if (isValidById("submit")) {
            document.getElementById("submit").click();
            setTimeout("window.location.reload()", 3000);
          }
        }
      }
    }

    let verify = document.getElementById("verifycode");
    if (verify) {
      verify.value = cipher;
      document.getElementById("verifybtn").click();
    }
    return;
  }

  // 百度
  else if (isURL(baidu)) {
    window.location.href = "https://pan.baidu.com/disk/main";
  }

  // 迅雷
  else if (isURL(thunder)) {
    const btns = document.querySelectorAll("p.login-btns > a");
    if (btns && btns.length > 0 && btns[0].textContent == "登录") {
      btns[0].click();
    }
  }

  // Teambition
  else if (isURL(teambition)) {
    let button = document.querySelector('button');
    if (!button) {
      return;
    }
    if (button.textContent == '登录') {
      button.click();
    }
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
   * Remove the dialog which reminding to close AD block plugin.
   */
  function removeADDialog() {
    let titles = document.querySelectorAll('h2');
    for (let i = 0; i < titles.length; i++) {
      if (titles[i].textContent.indexOf('广告拦截') != -1) {
        titles[i].parentElement.parentElement.remove();
        break;
      }
    }
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
      kxImg1.setAttribute("checked", true);
    }
    if (kxImg2 != null) {
      kxImg2.setAttribute("checked", true);
    }
    todaySayTextArea.value = signText;
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
      todaySayTextArea.value = signText;
    }
    try {
      unsafeWindow.showWindow("qwindow", "qiandao", "post", "0");
    } catch (err) {
      console.warn("AutoSign show window error!\n" + err);
    }
    return;
  }

  function isSignPage() {
    return window.find("今天签到了吗") && window.find("写下今天最想说的话");
  }

  function registerMenuCommand() {
    GM_registerMenuCommand("设置", () => {
      let cipherInput = prompt("请输入验证码", "");
      GM_setValue("cipher", cipherInput);
      cipher = cipherInput;
    });
  }
})();
