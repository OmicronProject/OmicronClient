/**
 * Created by Michal on 2016-02-11.
 */
// recursive function to clone an object. If a non object parameter
// is passed in, that parameter is returned and no recursion occurs.

function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object' || obj === undefined) {
        return obj;
    }

    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }

    return temp;
}

export default cloneObject;