var Solver = (function() {
  function solve(map) {
    var parsedMap = parseMap(map);
    var unexplored = parsedMap[0][0].neighbors;
    var explored = [];

    View.renderMap(parsedMap);
    while (unexplored.length !== 0) {
      var currentTile = unexplored.pop();
      explored.push(currentTile);

      if (currentTile.tileValue === "*") { return true; }
      if (currentTile.neighbors.length > 0) {
        currentTile.neighbors.forEach(function(tile) {
          if (!(unexplored.indexOf(tile) > -1 || explored.indexOf(tile) > -1)) {
            unexplored.push(tile);
          }
        });
      }

      currentTile.tileValue = "x";
      View.addToQueue(currentTile);
    }

    return false;
  }

  function parseMap(map) {
    var mapTiles = [];
    var parsedMap;

    map.split("\n").forEach(function(line) { mapTiles.push(line.split("")); });

    mapTiles = mapTiles.map(function(row, rIndex) {
      return row.map(function(tile, cIndex) { return new Tile(tile, cIndex, rIndex); });
    });

    parsedMap = populateNeighbors(mapTiles);

    return parsedMap;
  }

  function populateNeighbors(mapTiles) {
    mapTiles.forEach(function(row) {
      row.forEach(function(tile) {
        [-1,1].forEach(function(diff) {
          var potential_x = tile.x + diff;
          var potential_y = tile.y + diff;
          if (potential_x >= 0 && potential_x < row.length) {
            if (mapTiles[tile.y][potential_x].tileValue != "#") { tile.neighbors.push(mapTiles[tile.y][potential_x]); }
          }
          if (potential_y >= 0 && potential_y < mapTiles.length) {
            if (mapTiles[potential_y][tile.x].tileValue != "#") { tile.neighbors.push(mapTiles[potential_y][tile.x]); }
          }
        });
      });

    });
    return mapTiles;
  }

  return {
    solve: solve
  };
})();
