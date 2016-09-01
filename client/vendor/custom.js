/*
   Custom jquery plugins
   written by Jamie Skinner
*/
/* Tabbed */
jQuery.fn.extend({
  tabbed : function(type){
    var $that = this
    var timeout;
    $(window).resize(function(){
      //debounces the resize function
      clearTimeout(timeout);
      timeout = setTimeout(function(){
      //reset active class
      $('[data-tab-target].active').toggleClass('active')
      //find project that is active
      var toActivate = $('[data-tab].active').data('tab')
      if(!toActivate){
        toActivate = $($('[data-tab]')[0]).show().toggleClass('active').data('tab')
      }
      //set cooresponding header to active
      $('[data-tab-target='+toActivate+']').addClass('active')
      }, 250, $that)//end setTimeout
    })

    //hide the inactive tabs
    $('[data-tab]:not([class~="active"])').hide()

    return this.each(function(){
      // add click event
      $(this).click(function(){
        if(this.className.indexOf('active')==-1){
          $('[data-tab-target].active').removeClass('active')
          $(this).addClass('active')

          settings[type]($(this))
        }
      })
    })
  }
})


//types of tabbing
var settings = {
  //toggle - no animation
  tabToggle : function(el){
    $('[data-tab].active').hide().removeClass('active')

    var target = $('[data-tab='+el.data('tab-target')+']')
    if(target.length !== 1){
      console.log("You are trying to tab to multiple elements.")
    }
    target.show().addClass('active')
  },
  //slides in
  tabSlide : function(el){
    //TODO
  },
}

/* accordion */
jQuery.fn.extend({
  jaccordion : function(callback){
    var timeout;
    var $that = this
    var count = 0;

    //grabs active story on window resize
    //sets accordion-header to .active
    $(window).resize(function(){
      //debounces the resize function
      clearTimeout(timeout);
      timeout = setTimeout(function(){
      //reset active class
      $that.find('[data-accordion-target].active').removeClass('active')
      //find project that is active
      var toActivate = $that.find('.active').data('accordion')
      //set cooresponding header to active
      $that.find('[data-accordion-target='+toActivate+']').addClass('active')
      }, 250, $that)//end setTimeout
    })

    //returns the targets jquery element
    return this.each(function(i, el){
      //el refers to the parent element that the jaccordion intialize func
      // was originally called on. there should only be one
      el = $(el)
      var headers = el.find('[data-accordion-target]')
      headers.click({el, el}, function(e){
        //you have clicked on a totally new element
        if(!this.classList.contains('active') && !$(this).next().hasClass('active')){
          var el = e.data.el
          //find the one that is open and close it
          var old = el.find('[data-accordion-target].active').toggleClass('active')
          old.next().toggleClass('active').slideToggle()
          //toggle this one open
          var n = $(this).toggleClass('active')
          n.next().slideToggle({complete: callback}).toggleClass('active')
        //you've clicked on the same element you just closed
        }else{
          $(this).toggleClass('active')
          $(this).next().slideToggle({complete: callback}).toggleClass('active')
        }
      },[el])
    })
  }
})

