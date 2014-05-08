(function($) {
  $.fn.tips = function(opts) {
    var settings = $.extend({
      speed: 150,
      position: 'bottom'
    }, opts);

    return this.each(function() {
      var $this = $(this);

      var tip = $this.attr('data-tip') || $this.attr('title');
      var pos = $this.attr('data-position');

      if (!pos) {
        pos = settings.position;
      }

      $this.hover(function() {
        var $container = $("<div class='tips-container tips-container-" + pos + "'>");
        $container.append($("<div class='tips-caret-" + pos + "'>"));
        $container.append($("<div class='tips-content'>").append(tip));

        $this.removeAttr('title');

        $container.appendTo($('body'));

        var tipWidth = $container.outerWidth();
        var elWidth  = $this.width();

        var elX = $this.offset().left;

        var elBottom = $this.position().top + $this.outerHeight();

        if (pos === "top") {
          elBottom -= $this.outerHeight() + $container.outerHeight() + 13;
        }

        $container.css('left', elX - (tipWidth - elWidth) / 2)
                  .css('top', elBottom)
                  .fadeIn(settings.speed);
      }, function() {
        $(".tips-container").fadeOut(settings.speed).delay().remove();
      });
    });
  }
})(jQuery);