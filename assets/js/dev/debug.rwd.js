(function (debug, $) {
 // 'use strict';

  debug.config = {
    baselineAdjust: 0,
    gridColumns: 16,
    lineHeight: function () {
      var value = $('body').css('line-height');
      return (value.indexOf('px') > -1) ? value.replace('px', '') : value * sb.rwd.fontSize;
    }
  };
  debug.buildPanel = function () {
    $('<div id="debug-panel">' +
      '<button class="debug-view" data-close="&times;">&curren;</button>' +
      '<ul>' +
      '<li><button data-option="background">Background</button></li>' +
      '<li><button data-option="baseline">Baseline</button></li>' +
      '<li><button data-option="boxes">Boxes</button></li>' +
      '<li><button data-option="grid">Grid</button></li>' +
      '<li><button data-option="windowSize">Window Size</button></li>' +
      '</ul>' +
      '</div>').appendTo('body');

    var $panel = $('#debug-panel');

    debug.buildButtons.options($panel);
    debug.buildButtons.view($panel);
  };

  debug.buildButtons = {
    options: function ($panel) {
      var $optionButtons = $panel.find('[data-option]'),
        optionsArray = [];

      $.each($optionButtons, function (index, value) {
        optionsArray.push($(value).attr('data-option'));
      });

      /* ---- option buttons ---- */
      $optionButtons.on('click', function () {
        var $input = $(this),
          $option = $input.attr('data-option');

        if ($input.hasClass('on')) {
          debug[$option].off();
          $input.removeClass('on');

          if (Modernizr.localstorage) {
            localStorage.removeItem('debug-' + $option);
          }
        } else {
          debug[$option].on();
          $input.addClass('on');

          if (Modernizr.localstorage) {
            localStorage.setItem('debug-' + $option, true);
          }
        }
      });

      if (Modernizr.localstorage) {
        $.each(optionsArray, function (index, value) {
          if (localStorage.getItem('debug-' + value) === 'true') {
            $optionButtons.filter('[data-option="' + value + '"]').trigger('click');
          }
        });
      }
    },
    view: function ($panel) {
      var $viewButton = $panel.find('button.debug-view'),
        closePanel = function () {
          $panel.removeClass('open');
          $viewButton.html($viewButton.attr('data-open'));
          $(document).off('click.debugPanel');
        },
        openPanel = function () {
          $panel.addClass('open');
          $viewButton.html($viewButton.attr('data-close'));

          $(document).on('click.debugPanel', function (e) {
            if ($(e.target).parents().filter($panel).length !== 1) {
              closePanel();
            }
          });
        };

      $viewButton.attr('data-open', $viewButton.html());

      $viewButton.on('click', function () {
        if ($panel.hasClass('open')) {
          closePanel();
        } else {
          openPanel();
        }

        return false;
      });
    }
  };

  debug.background = {
    off: function () {
      $('html').removeClass('debug');
    },

    on: function () {
      $('html').addClass('debug');
    }
  };

  debug.baseline = {
    off: function () {
      $('#debug-baseline').remove();
    },

    on: function () {
      var config = debug.config,
        baselineHeight = 0.375,
        baselineLength = $(document).height() / 6,
        i,
        output = [];
      console.log($(document).height());
      for (i = 0; i <= baselineLength; i++) {
        output.push('<li style="height:' + baselineHeight + 'em"></li>');
      }

      $('body').append('<ol id="debug-baseline" style="top:' + config.baselineAdjust + 'px">' + output.join('') + '</ol>');
    }
  };

  debug.boxes = {
    off: function () {
      $('.debug-number').remove();

      $.each($('.debug-box'), function (index, value) {
        var $debugBox = $(value);
        $debugBox.contents().appendTo($debugBox.parent());
        $debugBox.remove();
      });
    },

    on: function () {
      $.each($('.block').not('#debug-grid .block, .block .block'), function (index, value) {
        $(value).wrapInner('<div class="debug-box"></div>');
        $(value).find('.debug-box').append('<div class="debug-number">' + (index + 1) + '</div>');
      });
    }
  };

  debug.grid = {
    off: function () {
      var gw = document.getElementById('gridsetoverlaywrap');
      gs.remove(gw);
      console.log("hide");
    },

    on: function () {
      gs.show();
    }
  };

  debug.windowSize = {
    off: function () {
      $('#debug-size').remove();
    },

    on: function () {
      $('body').append('<div id="debug-size"></div>');

      var $debugSize = $('#debug-size'),
        content = [],
        rwd = sb.rwd,
        mediaQueries = rwd.mediaQueries,
        updateSize = function () {
          $debugSize.find('span').html(rwd.viewportWidth() + ' &times; ' + rwd.viewportHeight());

          $.each(mediaQueries, function (index, value) {
            var result = rwd.matchViewport(index);
            $debugSize.find('.' + index).removeClass('' + !result).addClass('' + result);
          });
        };

      content.push('<span>?</span>');
      content.push('<table>');
      if (window.matchMedia('only all').matches === false) content.push('<tr class="polyfill true"><td colspan="3">polyfilled</td></tr>');
      content.push('<tr class="none true"><td colspan="3">no active media queries</td></tr>');

      $.each(mediaQueries, function (index, value) {
        var query = value.query,
          pixelWidth,
          tr;

        if (query.indexOf('min-width') > 0 && query.indexOf('em') > 0) {
          var newStr = query.replace('(min-width:', '').replace('em)', '');
          pixelWidth = Math.round(query.replace('(min-width:', '').replace('em)', '') * sb.rwd.fontSize * 100000) / 100000;
        }

        tr = '<tr class="' + index + '">' +
            '<th>' + index + '</th>' +
            '<td>' + query + '</td>' +
            '<td>' + ((pixelWidth) ? pixelWidth + 'px' : '') + '</td>' +
          '</tr>';

        content.push(tr);
      });

      content.push('</table>');

      content.push('<button class="close">&times;</button>');

      $debugSize.html(content.join(''));

      $debugSize.find('.close').on('click', function () {
        $('#debug-panel').find('button[data-option="windowSize"]').trigger('click');
      });

      updateSize();

      $(window).resize(function () {
        updateSize();
      });
    }
  };

  $(debug.buildPanel);
}(window.sb.debug = window.sb.debug || {}, jQuery));