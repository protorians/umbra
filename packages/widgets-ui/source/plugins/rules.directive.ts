import {IRuleOptions, IRulePayload, IRuleCallable, IRuleCallablesMap, IRuleCallables} from "../types/index.js";
import {Compilate} from "./compilate.js";

/**
 * The RulesDirectives class provides a static structure for managing and accessing directives (rule callables)
 * using an alias-keyed map. It allows adding, retrieving, removing, and clearing of directives.
 *
 * This class operates primarily via static methods and maintains its state in a protected static map (`_stack`).
 *
 * Methods:
 * - `directives`: Retrieves all registered directives as an object with alias keys and callable values.
 * - `add(alias, callable)`: Adds a directive (callable function) with a specified alias to the internal stack.
 * - `get(alias)`: Retrieves a callable directive by its alias, if it exists, or returns `undefined`.
 * - `remove(alias)`: Removes a directive associated with a specified alias from the internal stack.
 * - `clear()`: Clears all registered directives from the internal stack.
 */
export class RulesDirectives {

    protected static _stack: IRuleCallablesMap = new Map();

    /**
     * Retrieves the directives as an object consisting of key-value pairs,
     * where each key is derived from the internal stack entries.
     *
     * @return {IRuleCallables} An object containing all directives extracted from the internal stack.
     */
    static get directives(): IRuleCallables {
        const entries: IRuleCallables = {} as IRuleCallables
        for (const [key, value] of this._stack.entries()) entries[key] = value;
        return entries;
    }

    /**
     * Adds a new rule to the internal stack with the specified alias and callable.
     *
     * @param {string} alias - The alias used to reference the rule.
     * @param {IRuleCallable} callable - The callable function or object representing the rule logic.
     * @return {typeof this} Returns the current class to allow method chaining.
     */
    static add(alias: string, callable: IRuleCallable): typeof this {
        this._stack.set(alias, callable);
        return this;
    }

    /**
     * Retrieves a rule callable associated with the given alias.
     *
     * @param {string} alias - The alias for which the rule callable is being retrieved.
     * @return {IRuleCallable | undefined} The rule callable associated with the alias, or undefined if not found.
     */
    static get(alias: string): IRuleCallable | undefined {
        return this._stack.get(alias);
    }

    /**
     * Removes an entry from the internal stack associated with the provided alias.
     *
     * @param {string} alias - The alias of the entry to be removed from the stack.
     * @return {typeof this} The current class type, enabling method chaining.
     */
    static remove(alias: string): typeof this {
        this._stack.delete(alias);
        return this;
    }

    /**
     * Clears the stack and resets it to an empty state.
     *
     * @return {typeof this} Returns the current class for chaining methods.
     */
    static clear(): typeof this {
        this._stack.clear();
        return this;
    }
}

/**
 * Retrieves the set of rule callables.
 *
 * @return {IRuleCallables} The set of rule callables defined in RulesDirectives.
 */
export function getRules(): IRuleCallables {
    return RulesDirectives.directives;
}

/**
 * Retrieves a rule based on the provided alias.
 *
 * @param {string} alias - The alias of the rule to retrieve.
 * @return {IRuleCallable | undefined} The rule corresponding to the given alias, or undefined if no matching rule is found.
 */
export function getRule(alias: string): IRuleCallable | undefined {
    return RulesDirectives.get(alias);
}

/**
 * Adds a new rule to the RulesDirectives using the provided options.
 *
 * @param {IRuleOptions} options - The configuration object containing the rule alias and callable function.
 * @returns {typeof addRule} The function itself to allow chaining.
 */
export function addRule(options: IRuleOptions): typeof addRule {
    Compilate.setRulePriority(options.alias, options.order || 0);
    RulesDirectives.add(options.alias, (payload: IRulePayload) =>
        options.callable(payload));
    return addRule;
}

/**
 * Removes a rule associated with the given alias.
 * This method interacts with the RulesDirectives to remove the specified rule.
 *
 * @param {string} alias - The alias of the rule to be removed.
 * @return {function} Returns the `removeRule` function for potential chaining or reuse.
 */
export function removeRule(alias: string): typeof removeRule {
    RulesDirectives.remove(alias);
    return removeRule;
}

/**
 * Clears all existing rules from the RulesDirectives storage.
 * Resets any previously set rules to an empty state.
 *
 * @return {void} No return value as the function performs a clearing operation.
 */
export function clearRules(): void {
    RulesDirectives.clear();
}