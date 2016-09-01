//used for resize debouncing
var resizeTimer;
var chapters;
var chapter

var viewModel = {
  animationTime: 500,
  menuVisible: false,
  menuWidth: $('#collapsed-menu').width(),
  modalVisible: false,
  roundingOffset: 5,
  menuOffset: 50
}

$(window).load(function(){
  /* Tabs init*/
  $('[data-tab-target]').tabbed('tabToggle')
  /* accordion init*/
  $('[data-accordion="accordion"]').jaccordion(indexChapters)
  /* Menu Behavior */

  $('#collapsed-menu li, #collapsed-icon').click(function(){
    toggleMenu()
  })

  $('.modal .close, #overlay').click(function(){
      if(viewModel.modalVisible){
        toggleModal()
      }
      if(viewModel.menuVisible){
        toggleMenu()
      }
  })

  /* Scroll Behavior  */

  //grabs current scroll position after page rerender
  setTimeout(indexChapters, 10)
  //gets scroll position and updates menu accordingly
  $(document).on('scroll', getScrollChapter)
  //only reindex chapter locations on window resize
  //for performance
  $(window).resize(function(){ debounce(resizeCB) })
  //listener for when the chapter changes.
  //add interactions on chapterchange here
  $(document).on('chapter-changed', chapterChanged )


  $('[data-chapter-target]').on('click', function(){
    var cl = $(this).data('chapter-target')
    //grabs parentElement if a tag doesn't have chapter-target
    if(!cl){
      cl = $(this.parentElement).data('chapter-target')
    }
    var obj = getChapterOnString(cl)
    scrollToChapter(obj)
  })

  /* ~~~~~~~~~~~~~~~
     FORM SUBMISSION
     ~~~~~~~~~~~~~ */
  $('form.proposal').submit(function(event){
    event.preventDefault();
    var formData = new FormData()

    //ADD INPUTS HERE
    //grabs values from form
    formData.append('name', event.target[0].value)
    formData.append('unit', event.target[1].value)
    formData.append('sender', event.target[2].value)
    formData.append('sponsor', event.target[3].value)
    formData.append('problem', event.target[4].value)
    formData.append('user', event.target[5].value)
    formData.append('impact', event.target[6].value)

    //sends ajax request to bluemail
    $.ajax({
      url: "/upload",
      type:"POST",
      data: formData,
      contentType: false, //!important
      processData:false //!important
    }).done(function(a){
      console.log(a)
      if(!a.error){
        //runs when request is successful
        toggleModal('#success')
      } else {
        //runs on failure
        toggleModal('#error')
      }
    })
  })//end form proposal
})

/* ~~~~~~~~~~
   HELPERS
~~~~~~~~~~~ */
/* Menu Behavior */
function toggleMenu(){
  if(viewModel.modalVisible){
    toggleModal();
  }
  if(viewModel.menuVisible){
    $('#collapsed-menu').css('left', window.innerWidth + viewModel.menuWidth)
  } else {
    $('#collapsed-menu').css('left', window.innerWidth - viewModel.menuWidth)
  }
  viewModel.menuVisible = !viewModel.menuVisible
  toggleOverlay()
}
function toggleModal(type){
  if(!type){
    $('.modal').fadeOut();
  } else {
    $(type).fadeToggle();
  }
  viewModel.modalVisible = !viewModel.modalVisible
  toggleOverlay();
}
function toggleOverlay(){
  $('#overlay').fadeToggle();
}
/* Scoll behavior */
//debounces function calls on window resize
//all arguments are functions that will be run after debounce time
function debounce(){
  //debouces window resizing
  var args = Array.prototype.slice.call(arguments);
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function(args){
    args.forEach(function(el){
      el()
    })
  }, 250, args)//end setTimeout
}
//grabs chapter locations and puts them in objects
/* chapters = {
      {
        index: 0,
        key:'classname',
        top: 190px // height from top
      }, .....
  }
*/
function indexChapters(){
  var results = [];
  //gets all elements with the class starting with 'chapter-'
  var $chapters = $("[data-chapter]")
  var l = $chapters.length
  for(var i = 0; i < l; i++){
    var $el = $($chapters[i])
    var temp = {}

    //get what the chapter is set to
    var cl = $el.data('chapter')
    temp.key = cl
    temp.top = $el.offset().top
    temp.index = i

    results.push(temp)
  }
  chapters = results
  getScrollChapter()
}
//calculates which chapter you're looking at.
//i.e if you're below the jump point of the chapter
//jump point looks like this in html
//<div class="jump" data-chapter="team"></div>
function getScrollChapter(){
  var sp = window.scrollY + viewModel.menuOffset
  var maxIndex = 0
  for(var i=0; i < chapters.length; i++){
    var el = chapters[i]
    if(sp >= el.top){ maxIndex = i }
  }

  if(!chapter || maxIndex != chapter.index){
    chapter = chapters[maxIndex]
    $(document).trigger('chapter-changed')
  }
}
function chapterChanged(){
  var ch = chapter
  updateMenu(ch)
}
function updateMenu(ch){
  $('#menu').find('.active').removeClass('active')
  $('#menu').find('[data-chapter-target$='+ch.key+']').addClass('active')
}
function scrollToChapter(ch){
  chapter = ch
  $('html, body').stop().animate({
     scrollTop: ch.top - viewModel.menuOffset + viewModel.roundingOffset
   }, viewModel.animationTime);
}
//returns chapter object based on the title of the chapter
function getChapterOnString(target){
  if(target == '') target = 'root'
  return chapters.filter(function(v){return v.key == target})[0]
}

function resizeCB(){
    indexChapters()
    getScrollChapter()
    $(document).trigger('chapter-changed')
}