# Farewell TOM

A little game as farewell gift to the team

## Creating your own levels

Put a level json file into the `data/levels` folder in the following structure:

```js
{
    "next" : "the name of the level that would come after",
    "dimensions" : [3,3], // the dimension of the map in [x,y]
    "fields" : [ // the rows for the map
        ["road corner up-left", "road horizontal", "road corner up-right"], // a row with fields.
        ["road vertical", "meadows blocked", "road vertical"], // see tiles section for information which exist
        ["road corner down-left", "road horizontal", "road corner down-right"]
    ],
    "player" : [2,2], // the player starting position index in [x,y]
    "customers" : [ // an array of customers
        [0, 0, 4] // a single customer with the position index and wait time [x,y,wait_time_in_turns]
    ],
    "obstacles" : { // the keyed list of obstacles
        "car" : { 
            "type" : "driving-car", // the sprite of the obstacle
            "position" : [0, 2] // the starting position for the obstacle
            "directions" : ["RIGHT", "LEFT"] // the movement pattern for the obstacle
            "speed" : 500 // the speed of the obstacle in ms
        }
    }
}
```

### Tiles

Named tiles will take care of sprite as well as collision. 
Sprites are named by the name on **how they are entered!** - this is handling the collision. So if you put two `up-right` next to each other and put your player on the left one, the player will be able to go right.
The following tiles are available:

* *meadows* - well, meadows...
* *road (vertical | horizontal)* - straight roads
* *road corner (up-left | up-right | down-left | down-right)* - available corners
* *road crossing (horizontal-up | horizontal-down | vertical-left | vertical-right | horizontal-vertical)* - crossings
* *blocked* - you can add that to any field and it will be blocked

### Obstacles

Obstacles can be either static or moving. To make them move add the directions, otherwise leave them out.

Currently there are two sprites:

* *broken-car* - a broken car
* *driving-car* - a car that moves

If you want to add your own sprites add them to the sprite folder and your css to `Obstacles.css`