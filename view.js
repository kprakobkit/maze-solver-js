var View = (function() {
  var maze = $("#maze");

  function renderMap(map) {
    maze.empty();

    map.forEach(function(row) {
      var $row = $("<div class='row'></div>");

      row.forEach(function(tile) {
        var $tile = $("<div class='tile'></div>");
        var tileClass;
        switch (tile.tileValue) {
          case "o":
            tileClass = "start";
          break;
          case "*":
            tileClass = "goal";
          break;
          case ".":
            tileClass = "path";
          break;
          case "#":
            tileClass = "wall";
          break;
        }

        $tile.addClass(tileClass);
        $row.append($tile);
      });
      maze.append($row);
    });
  }

  function addToQueue(element) {
    maze.queue('renderQueue', function() {
      renderTile(element);
      $(this).dequeue('renderQueue');
    }).delay(10, 'renderQueue');
  }

  function renderTile(tile) {
    var $tile = $($('#maze .row')[tile.y]).find($('.tile'))[tile.x];
    $tile.className = $tile.className + " explored";
  }

  function render() {
    maze.dequeue('renderQueue');
  }

  return {
    renderMap: renderMap,
    addToQueue: addToQueue,
    render: render
  };
})();
