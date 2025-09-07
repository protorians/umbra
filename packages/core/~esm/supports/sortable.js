export class Sortable {
    stringableObject(rules) {
        var _a, _b, _c;
        const graph = new Map();
        const indegree = new Map();
        const numericWeights = new Map();
        const queue = [];
        for (const rule of Object.keys(rules)) {
            graph.set(rule, new Set());
            indegree.set(rule, 0);
        }
        for (const [rule, order] of Object.entries(rules)) {
            if (typeof order === "number") {
                numericWeights.set(rule, order);
                continue;
            }
            const [, target] = order.split(":");
            if (order.startsWith("before:")) {
                graph.get(rule).add(target);
                indegree.set(target, ((_a = indegree.get(target)) !== null && _a !== void 0 ? _a : 0) + 1);
            }
            else if (order.startsWith("after:")) {
                (_b = graph.get(target)) === null || _b === void 0 ? void 0 : _b.add(rule);
                indegree.set(rule, ((_c = indegree.get(rule)) !== null && _c !== void 0 ? _c : 0) + 1);
            }
        }
        for (const [node, degree] of indegree.entries())
            if (degree === 0)
                queue.push(node);
        const result = [];
        while (queue.length > 0) {
            queue.sort((a, b) => {
                var _a, _b;
                const aWeight = (_a = numericWeights.get(a)) !== null && _a !== void 0 ? _a : Infinity;
                const bWeight = (_b = numericWeights.get(b)) !== null && _b !== void 0 ? _b : Infinity;
                return aWeight - bWeight;
            });
            const node = queue.shift();
            result.push(node);
            for (const neighbor of graph.get(node)) {
                indegree.set(neighbor, indegree.get(neighbor) - 1);
                if (indegree.get(neighbor) === 0) {
                    queue.push(neighbor);
                }
            }
        }
        if (result.length !== Object.keys(rules).length)
            throw new Error("Cycle detected in provided array");
        return result;
    }
}
