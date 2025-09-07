export function sortRules(rules) {
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
            indegree.set(target, (indegree.get(target) ?? 0) + 1);
        }
        else if (order.startsWith("after:")) {
            graph.get(target)?.add(rule);
            indegree.set(rule, (indegree.get(rule) ?? 0) + 1);
        }
    }
    for (const [node, degree] of indegree.entries())
        if (degree === 0)
            queue.push(node);
    const result = [];
    while (queue.length > 0) {
        queue.sort((a, b) => {
            const aWeight = numericWeights.get(a) ?? Infinity;
            const bWeight = numericWeights.get(b) ?? Infinity;
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
