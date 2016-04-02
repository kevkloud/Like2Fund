var tab = null;

$(function() {

  var BG = chrome.extension.getBackgroundPage();

  // We need to reload popover in Safari, so that we could
  // update popover according to the status of AdBlock.
  // We don't need to reload popup in Chrome,
  // because Chrome reloads every time the popup for us.
  function closeAndReloadPopup() {
      if (SAFARI) {
          safari.self.hide();
          setTimeout(function() {
              window.location.reload();
          }, 200);
      } else {
          window.close();
      }
  }

  $("#account_menu_item").click(function() {
      BG.openTab("../account/index.html");
      closeAndReloadPopup();
  });
});