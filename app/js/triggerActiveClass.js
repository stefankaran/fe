//----- Trigger active class
// trigger == button
// el      == elements where active class will be added
triggerActive = function(trigger, el) {
  var $active = ('active');
  var $trigger = $(trigger);

  // Store all el in array
  var $elements = [];
  for (var i = 0; i < el.length; i++) {
    $elements[i] = (el[i]);
  }

  // On trigger, all elements from array toggle class
  $trigger.click(function() {
    $.each($elements, function(i, elem) {
      $(elem).toggleClass($active);
    });
  });
};
