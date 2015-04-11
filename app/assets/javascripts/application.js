// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

window.running = false;
// Select the final box
function select_random() {
  var success = false;
  var name = $('input[name=name]').val();
  do {
    var select = Math.floor(Math.random() * 100)
    if(!$('.output .option[data-number=' + select + ']').hasClass('selected')) {
      success = true;
    }
  } while(!success);
  $('.output .option[data-number=' + select + ']').addClass('selected');
  $('.output .option[data-number=' + select + '] .name').html(name);
  $.ajax({
    url: "/boards/" + $('.output').data('board-id'),
    method: "PUT",
    data: {
      order: select,
      person: name
    },
    error: function() {
      alert('An issue updating occured.  Check your internet connection or contact Matt Drewitt.');
    }
  });

  $('input[name=name]').val('');
  window.running = false;
}

function flare_random(delay, increment, count) {
  var success = false;
  do {
    var select = Math.floor(Math.random() * 100);
    if(!$('.output .option[data-number=' + select + ']').hasClass('selected')) {
      success = true;
    }
  } while(!success);
  $('.option.flare').removeClass('flare');
  $('.output .option[data-number=' + select + ']').addClass('flare');

  count -= 1;
  if(count > 0) {
    delay += increment;
    setTimeout(function() {
      flare_random(delay, increment, count);
    }, delay);
  } else {
    $('.option.flare').removeClass('flare');
    select_random();
  }
}

$(document).on('click', '.run', function() {
  if($('input[name=name]').val() != '' && window.running != true) {
    var flare_count = 15;
    var flare_delay = 500;
    window.running = true;
    flare_random(100,flare_delay/flare_count, flare_count);
  }
});
