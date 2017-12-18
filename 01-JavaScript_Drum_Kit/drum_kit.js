(function drum(window) {
  // Toggle the element. After the event's firing, the element's going to be
  // in its previous state. In this case, adding class attribute and
  // then removing it after certain action occured.
  function oneTimeEventHandlerOnToggle(classAttribute) {
    let element = this;
    return function addHandler(eventName) {
      element.classList.add(classAttribute);
      element.addEventListener(eventName, function removeHandler(event) {
        // It's superb information by Joe!
        // http://joequery.me/code/event-target-vs-event-currenttarget-30-seconds/
        event.currentTarget.classList.remove(classAttribute);
        event.currentTarget.removeEventListener(event.type, removeHandler);
      });
    };
  }

  function syncTheDrum(event) {
    // certain character on keyboard when typed
    let key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
    // the sound of the drum
    let audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    // image (part of the drum's image)
    let drum = document.querySelector(`g[data-key="${event.keyCode}"]`);

    if (!key) return;
    if (!audio) return;
    if (!drum) return;

    audio.currentTime = 0; // restart audio
    audio.play();

    oneTimeEventHandlerOnToggle.call(key, 'playing')('transitionend');
    oneTimeEventHandlerOnToggle.call(drum, 'animation')('animationend');
  }

  window.addEventListener('keydown', syncTheDrum);
})(window);