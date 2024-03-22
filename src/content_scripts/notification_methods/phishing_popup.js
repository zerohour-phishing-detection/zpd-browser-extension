class PhishingPopup {
  static display() {
    if (document.getElementById("antiphishingpopup") == null) {
      // TODO: extract to separate HTML file
      let popup = document.createElement("div");
      popup.setAttribute("id", "antiphishingpopup");
      popup.innerHTML +=
        '<div style="padding: 10%;"><div style="width: 150px; float: left; margin-right: 20px;"><img style="width:100%;" src="https://upload.wikimedia.org/wikipedia/commons/8/81/Stop_sign.png" /></div><div style="float:left;"><h1 style="color:#fff; border-bottom: 1px solid white; font-size: xxx-large; margin:10px;padding:20px 10px; text-align:left;">Phishing Detected!</h1><p style="color:#fff;font-weight: bold;font-size: large;margin:10px;padding:20px 10px;text-align:left;">The website you are trying to visit has been reported a phishing site by your Anti-Phishing browser plugin.</p><p style="color:#fff;font-weight: bold;font-size: large;margin:10px;padding:20px 10px;text-align:left;">Phishing websites are designed to trick you into revealing personal or financial information by imitating sources your may trust.</p><p style="color:#fff;font-weight: bold;font-size: large;margin:10px;padding:20px 10px;text-align:left;">Entering any information on this web page may result in identity theft or other fraud.<br><br><br><br>Please close this window now.</p><br/><br/><button style="cursor:pointer;float:right;text-decoration:underline;background:none;color:#000;border:none;" onClick="document.getElementById(&quot;antiphishingpopup&quot;).style.display = &quot;none&quot;;">Ignore this warning</button><br/><button id="whitelistwarning" style="cursor:pointer;float:right;text-decoration:underline;background:none;color:#000;border:none;" onClick="document.getElementById(&quot;antiphishingpopup&quot;).style.display = &quot;none&quot;;">Whitelist this page</button></div></div>';
      popup.style.cssText =
        "position:fixed;top:0;left:0;width:100%;height:100%;z-index:2147483647;background:#772222;";
      document.body.appendChild(popup);
      
      document
        .getElementById("whitelistwarning")
        .addEventListener("click", PhishingPopup.addPageToWhitelist);
    }
  }

  /**
 * Adds current page to whitelist.
 */
static addPageToWhitelist() {
  chrome.storage.local.get(
    {
      urlCacheIds: [],
    },
    function (result) {
      for (let i = 0; i < result.urlCacheIds.length; i++) {
        // Check if this is the current page
        if (result.urlCacheIds[i].urlId == location.href) {
          // Set it to legitimate and store the result
          result.urlCacheIds[i].result = "LEGITIMATE";

          chrome.storage.local.set(
            {
              urlCacheIds: result.urlCacheIds,
            },
            function (result) {}
          );
          break;
        }
      }
    }
  );
}
}