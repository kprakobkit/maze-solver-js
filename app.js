var App = (function() {
  function init() {
    console.log(Solver.solve(Maps.map1));
  }

  return {
    init: init
  };
})();

$(function() {
 App.init();
 View.render();
});
