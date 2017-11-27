;(function($){
/*
 (function () {
 var originalAddClassMethod = jQuery.fn.addClass;
 jQuery.fn.addClass = function () {
 var result = originalAddClassMethod.apply(this, arguments);
 jQuery(this).trigger('classAdded');
 return result;
 };
 })();
 */

// STICKY PROTOTYPE
$.fn.dwSticky = function (settings) {
  var toReturn = {};
  var $stElement = $(this).eq(0);
  if (!$stElement || $stElement.length < 1) {
    //console.log("dwSticky :: no element");
    return false;
  }
  settings = settings || {};
  toReturn.settings = settings;
  settings.offsetTop = settings.offsetTop || 0;
  settings.offsetBot = settings.offsetBot || 0;
  settings.offsetAppear = settings.offsetAppear || 0; // start sticky when element is beyond top viewport edge (in PX)
  var $stEnd = settings.$stEnd || $();
  if ($stEnd.length < 1) {
    //console.log("dwSticky :: parameters mismach");
    return false;
  }
  var $stStart = $stElement.parent();
  var calculateAndSet = function () {
    setTimeout(function () {
      var posStart = $stStart.offset()['top'];
      var posEnd = $stEnd.offset()['top'] - $stElement.outerHeight(true);
      var posScooll = $(window).scrollTop() + settings.offsetTop;
      $stElement.css({position: 'fixed'});
      if (posScooll < posStart + settings.offsetAppear) { // scroled above
        $stElement.removeClass('dw-sticked');
        $stElement.removeClass('dw-sticked-basement');
        $stElement.css({
          position: 'relative',
          top: 'auto'
        });
      } else if (posScooll > posEnd - settings.offsetBot) { // scroll below
        $stElement.addClass('dw-sticked');
        $stElement.addClass('dw-sticked-basement');
        $stElement.css({
          position: 'fixed',
          top: posEnd - posScooll + settings.offsetTop - settings.offsetBot
        });
      } else { // sticky area
        $stElement.addClass('dw-sticked');
        $stElement.removeClass('dw-sticked-basement');
        $stElement.css({
          position: 'fixed',
          top: settings.offsetTop
        });
      }
    }, 0);
  };
  // event bindings
  $(window).on('scroll', calculateAndSet);
  $(window).on('resize', calculateAndSet);
  $(document).on('ready', calculateAndSet);
  $(window).on('load', calculateAndSet);
  $stElement.addClass('dw-sticky');
  calculateAndSet();
  //$stElement.one('classAdded', calculateAndSet);
  toReturn.destroy = function () {
    $(window).off('scroll', calculateAndSet);
    $(window).off('resize', calculateAndSet);
    $(document).off('ready', calculateAndSet);
    $(window).off('load', calculateAndSet);
    //$stElement.off('classAdded', calculateAndSet);
    $stElement.removeClass('dw-sticky');
    $stElement.css({
      position: '',
      top: ''
    });
    $stElement.removeClass('dw-sticked');
  };
  toReturn.calculateAndSet = calculateAndSet;
  $stElement.data('dwSticky', toReturn);
  return toReturn;
};
// eof sticky  prototype

window.observeDOM = function (obj, callback) {
  if (typeof (obj) === "undefined") {
    return false;
  }
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver, eventListenerSupported = window.addEventListener;
  if (MutationObserver) {
    var obs = new MutationObserver(function (mutations, observer) {
      if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
        callback();
    });
    obs.observe(obj, {childList: true, subtree: true});
  }
  else if (eventListenerSupported) {
    obj.addEventListener('DOMNodeInserted', callback, false);
    //obj.addEventListener('DOMNodeRemoved', callback, false);
  }
};
})(jQuery);
