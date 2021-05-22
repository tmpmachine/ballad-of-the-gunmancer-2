const app = (function() {

  let components = [
    {
      urls: [
        'js/controlpad.js',
        'js/display.js',
        'js/mouse-control.js',
        'js/control.js',
        'js/state.js',
        'js/helper.js',
      ],
    },
    {
      urls: [
        'js/box.js',
        'js/player.js',
        'js/enemy.js',
        'js/bullet.js',
      ],
    },
    {
      urls: [
        'js/game.js',
      ],
      callback: function() {
        game.start();
      },
    },
  ];

  function loadComponents() {
    if (index >= 0 && components[index].callback)
      components[index].callback();
    index++;
    if (index < components.length)
      loadExternalFiles(components[index].urls).then(loadComponents);
  }

  let index = -1;
  loadComponents();
  
  function requireExternalFiles(url) {
    return new Promise((resolve, reject) => {
      let el;
      if (url.includes('.css')) {
        el = document.createElement('link');
        el.setAttribute('href', url);
        el.setAttribute('rel', 'stylesheet');
      } else {
        el = document.createElement('script');
        el.setAttribute('src', url);
      }
      el.onload = () => resolve(url);
      el.onerror = () => reject(url);
      document.head.appendChild(el);
    });
  };
  
  function loadExternalFiles(URLs) {
    return new Promise(resolve => {
      let bundleURL = [];
      for (let URL of URLs)
        bundleURL.push(requireExternalFiles(URL));
      Promise.all(bundleURL).then(() => {
        resolve();
      }).catch(error => {
        console.log(error);
        console.log('Could not load one or more required file(s).');
      });
    });
  }

  return {
    loadExternalFiles,
    requireExternalFiles,
  };
  
})();