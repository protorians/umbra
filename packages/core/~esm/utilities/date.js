export var DateUtility;
(function (DateUtility) {
    function compareDateTime(from, to) {
        const _from = Date.parse(from);
        const _to = Date.parse(to);
        return _from < _to ? true : (_from == _to ? null : false);
    }
    DateUtility.compareDateTime = compareDateTime;
})(DateUtility || (DateUtility = {}));
