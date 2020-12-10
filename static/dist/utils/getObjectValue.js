export function getObjectValue(obj, path, defaultValue) {
    if (defaultValue === void 0) { defaultValue = ''; }
    var keys = path.split('.');
    var result = obj;
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        result = result[key];
        if (result === undefined) {
            return defaultValue;
        }
    }
    return result !== null && result !== void 0 ? result : defaultValue;
}
//# sourceMappingURL=getObjectValue.js.map