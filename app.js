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


// Call the functions
progressBar()
sortingList()
