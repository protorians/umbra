export var MouseUtility;
(function (MouseUtility) {
    function coordinate(e) {
        if (e instanceof TouchEvent) {
            return {
                x: e.touches[0].clientX, y: e.touches[0].clientY
            };
        }
        else {
            return {
                x: e.clientX, y: e.clientY
            };
        }
    }
    MouseUtility.coordinate = coordinate;
    function coordinates(e) {
        if (e instanceof TouchEvent) {
            return Object.values(e.touches).map(touch => {
                return { x: touch.clientX, y: touch.clientY };
            });
        }
        else {
            return [{ x: e.clientX, y: e.clientY }];
        }
    }
    MouseUtility.coordinates = coordinates;
})(MouseUtility || (MouseUtility = {}));
