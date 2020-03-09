
module.exports.display = function(x, y, message1, message2=' ', message3=' ', message4=' ') {
    var font = '1 Lucida Console';
    Game.spawns['Spawn1'].room.visual.text( message1, x,  y + 2,  {align: 'left', opacity: 0.8, font: font} );
    Game.spawns['Spawn1'].room.visual.text( message2, x,  y + 3,  {align: 'left', opacity: 0.8, font: font} );
    Game.spawns['Spawn1'].room.visual.text( message3, x,  y + 4,  {align: 'left', opacity: 0.8, font: font} );
    Game.spawns['Spawn1'].room.visual.text( message4, x,  y + 5,  {align: 'left', opacity: 0.8, font: font} );
};

module.exports.mark = function(creep, text, settings) {
    var font = '0.3 Lucida Console';
    if (settings)
        Game.spawns['Spawn1'].room.visual.text( text, creep.pos.x,  creep.pos.y+0.22,  {opacity: settings.opacity||1, font: font, color: settings.text||"white", backgroundColor: settings.background||null} );
    else
        Game.spawns['Spawn1'].room.visual.text( text, creep.pos.x,  creep.pos.y+0.22,  {opacity: 1, font: font, color: "white"} );
};

module.exports.circle = function(creep, radius, colour) {
    creep.room.visual.circle( creep.pos, {opacity: 1, fill: 'transparent', radius: radius, stroke: colour} );
}