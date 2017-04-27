/**
 * @author whis admin@wwhis.com
 * @Created 4/27/17
 */
const Log       = require('./logger');

function containsKey(object, keys){
    if (!object)
    {
        return false;
    }

    if (!(keys instanceof Array))
    {
        keys = ['' + keys];
    }

    for (var i in keys)
    {
        var key = keys[i];
        if (object[key] === undefined)
        {
            Log.e(object);
            Log.e(keys);
            Log.e(`invalid option, key ${key} undefined`);
            return false;
        }
    }

    return true;
}

module.exports.containsKey = containsKey;