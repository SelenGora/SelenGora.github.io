function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const element = document.getElementById("simpleUsage");
  new TypeIt(element, {
    speed: 100,
    waitUntilVisible: true,
    loop: true,
    afterStep: function (step, queue, instance) {
        element.style.color = getRandomColor();
    }
  })
    .type("javascript")
    .pause(2000)
    .delete()
    .type("sass")
    .pause(2000)
    .delete()
    .type("reactjs")
    .pause(2000)
    .delete()
    .type("vue")
    .pause(2000)
    .delete()
    .type("a11y")
    .pause(2000)
    .delete()
    .pause(500)
    .go();

  document.addEventListener("click", function(e) {
    // If it isn't an anchor element, don't even bother...
    if (e.target.tagName !== "A") return;
    if (
      e.target.href &&
      e.target.href.indexOf("#") != -1 &&
      (e.target.pathname == location.pathname ||
        "/" + e.target.pathname == location.pathname) &&
      e.target.search == location.search
    ) {
      scrollAnchors(e, e.target);
    }
  });

  function scrollAnchors(e, respond = null) {
    // const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);

    function distanceToTop(el) {
      return Math.floor(el.getBoundingClientRect().top);
    }

    e.preventDefault();
    var targetID = respond
      ? respond.getAttribute("href")
      : this.getAttribute("href");
    var targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    var originalTop = distanceToTop(targetAnchor);
    window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });
    var checkIfDone = setInterval(function() {
      var atBottom =
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 2;
      if (distanceToTop(targetAnchor) === 0 || atBottom) {
        targetAnchor.tabIndex = "-1";
        targetAnchor.focus();

        // Let's make sure the History API even exists first..
        if ("history" in window) {
          window.history.pushState("", "", targetID);
        } else {
          // Do it the old-fashioned way!
          window.location = targetID;
        }

        clearInterval(checkIfDone);
      }
    }, 100);
  }


