var App = (function() {
  function init() {
    Solver.solve(Maps.map1);
  }

  return {
    init: init
  };
})();

$(function() {
 App.init();
 View.render();
});
