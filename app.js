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

/**
 * Add a listener on add button to get the input value
 * and append it to the list
 * Add listner to sort button to get all the list elements
 * sort them and replace the list with the new items
 */
function sortingList() {
  var addBtn = $('#sorting-list-container #add-item')
  var sortBtn = $('#sorting-list-container #sort-items')
  var newItemInput = $('#sorting-list-container #new-item-input')
  var itemList = $('#sorting-list-container .lists > ul')

  // Handler for new item
  addBtn.addEventListener('click', function () {
    var newItem = newItemInput.value
    var listItem = document.createElement('li') // Create the list item element

    listItem.textContent = newItem // Assign the correct text from the input
    itemList.appendChild(listItem) // Append it to the list

    newItemInput.value = '' // Clear the input
  })

  // Handler to sort elements

  sortBtn.addEventListener('click', function () {
    var listElements = itemList.querySelectorAll('li') // Query all li elements
    var items = [] // Array to store only the text from the li elements

    for (i = 0; i < listElements.length; ++i) {
      items[i] = listElements[i].textContent; // Store the textContent
    }

    itemList.innerHTML = "" // Remove all the elements inside the list

    items.sort().forEach(function (item) { // Sort it and iterate
      var newListItem = document.createElement('li')

      newListItem.textContent = item
      itemList.appendChild(newListItem)
    })
  })
}

/**
 * Get the future date
 * inside an interval running each second
 * calculate the today date
 * and start making the calculations
 */
function countDown() {
  var newYear = new Date(2021, 0, 1, 0, 0, 0)

  setInterval(function () {
    var now = new Date()
    var difference = newYear.getTime() - now.getTime()

    // milis
    var milis = difference / 1000;

    // seconds
    var seconds = Math.floor(milis % 60)
    milis /= 60 // Update the time for next calculation

    // minutes
    var minutes = Math.floor(milis % 60)
    milis /= 60 // Update the time for next calculation

    // hours
    var hours = Math.floor(milis % 24)
    // days
    var days = Math.floor(milis / 24)

    // Get the elements
    var daysSpan = $('.coundown-clock .days > span')
    var hoursSpan = $('.coundown-clock .hours > span')
    var minSpan = $('.coundown-clock .min > span')
    var secSpan = $('.coundown-clock .sec > span')

    daysSpan.textContent = days
    hoursSpan.textContent = hours
    minSpan.textContent = minutes
    secSpan.textContent = seconds

  }, 1000)
}

/**
 * Listen the input keyup event
 * Validate the current value
 * against the 3 rules (we use RegExp)
 * show validations
 */
function formValidation() {
  var input = $("#form-validation-container input")
  var stars = $('#form-validation-container ul > li > i', true)

  input.addEventListener('keyup', function(e) {
    var value = e.target.value

    if (value.length === 0) {
      input.classList.add('is-error')
      stars.forEach(function(st) {
        st.classList.add('is-empty')
      })
    } else {
      input.classList.remove('is-error')

      // Validate letter
      var isFirstLetter = /[A-Za-z]/.test(value[0])
      // at least one number
      var hasOneNumber = /[0-9]/.test(value)
      // 10 chars min length
      var minLength = value.length >= 10

      // Indivual checks
      if (isFirstLetter) {
        stars[0].classList.remove('is-empty')
      } else {
        stars[0].classList.add('is-empty')
      }

      if (hasOneNumber) {
        stars[1].classList.remove('is-empty')
      } else {
        stars[1].classList.add('is-empty')
      }

      if (minLength) {
        stars[2].classList.remove('is-empty')
      } else {
        stars[2].classList.add('is-empty')
      }

      // Mark input as valid if everything is ok
      if (isFirstLetter && hasOneNumber && minLength) {
        input.classList.add('is-success')
      } else {
        input.classList.remove('is-success')
      }

    }

  })
}


// Call the functions
progressBar()
sortingList()
countDown()
formValidation()
