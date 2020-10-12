/* ===== Zeste de Savoir ====================================================
   Toggle message content for staff
   ---------------------------------
   Author: Alex-D / Alexandre Demode
   ========================================================================== */

(function($) {
  'use strict'

  // Remove hash in URL when clicking outside :target hidden message
  $(document).click(function(event) {
    const hash = location.hash.substr(1)
    if (!hash) {
      return
    }

    const target = event.target
    const anchor = document.querySelector('.topic-message.hidden:target')

    if (!anchor) {
      return
    }
    if (anchor === target || anchor.contains(target)) {
      return
    }

    history.pushState('', document.title, location.pathname + location.search)
  })

  function hidemsg() {
    let $msg = $(this).next()
    do {
      $msg.toggleClass('hidden')
      $msg = $msg.next()
    } while ($msg[0] && $msg.hasClass('hidden-by-someone'))
  }

  $('div.msg-are-hidden.hidden').each(function() {
    const $div = $(this)
    $div.removeClass('hidden')
    hidemsg.apply(this)
    $div.children('a').click(function() {
      hidemsg.apply(this.parentNode)
      return false
    })
  })

  $("#content [href^='#show-message-hidden']").on('click', function(e) {
    $(this).parents('.message:first').find('.message-hidden-content').toggle()
    e.preventDefault()
  })
})(jQuery)
