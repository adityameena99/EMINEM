window.addEventListener('scroll', function() {
    var foreground = document.querySelector('#t');
    var scrollPosition = window.scrollY;
  
    if (scrollPosition > 500) { /* Change 500 to the height of the foreground div */
      foreground.classList.add('fixed');
      setTimeout(function() {
        foreground.classList.remove('fixed');
      }, 3000); /* Change 3000 to the number of milliseconds you want the foreground div to be fixed */
    } else {
      foreground.classList.remove('fixed');
    }
  });
  