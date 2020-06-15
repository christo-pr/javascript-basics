/**
 * Handy function that kinda mimics JQuery
 * @param {String} selector String that match a js element selector
 * @param {Boolean} multiple Search all element if true otherwise just first match.
 */
function $(selector, multiple) {
  if (multiple) return document.querySelectorAll(selector)

  return document.querySelector(selector)
}

/**
 * Get the button, and on click
 * will trigger a function that will run each
 * 200 miliseconds
 */
function progressBar() {
  var progressBtn = $('#progress-bar-container #progress-btn')
  var progressInput = $('#progress-bar-container progress')
  var interval;

  progressBtn.addEventListener('click', function(e) {
    e.preventDefault() // Prevent any default action

    interval = setInterval(function() {
      // Check if is done
      if (progressInput.value == progressInput.max) {
        clearInterval(interval)
        alert('Done')
        progressInput.value = 0
      } else {
        progressInput.value += 10;
      }
    }, 200)

  })
}


// Call the functions
progressBar()
