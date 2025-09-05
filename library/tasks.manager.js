import {execSync} from "child_process";

/**
 * @typedef {{command: string, required: boolean}} ITaskOptions
 */

/**
 * The `TasksManager` class provides functionality to manage and execute a collection of tasks.
 */
export class TasksManager {
    /**
     *
     * @type {Map<string, ITaskOptions>}
     */
    tasks = new Map();


    /**
     *
     * @param {string} name
     * @param {string} command
     * @param {?boolean} required
     * @returns {TasksManager}
     */
    add(name, command, required = false) {
        this.tasks.set(name, {command, required});
        return this;
    }

    /**
     *
     * @param {string} name
     * @returns {TasksManager}
     */
    remove(name) {
        this.tasks.delete(name);
        return this;
    }

    /**
     *
     * @returns {TasksManager}
     */
    run() {
        console.warn('Tasks :', this.tasks.size)
        if (this.tasks.size === 0) return this;

        let x = 0;
        for (const [name, task] of [...this.tasks.entries()]) {
            x++;
            try {
                console.warn(`Task :`, name, `[${x}/${this.tasks.size}]`);
                execSync(`${task.command}`, {stdio: 'inherit'})
            } catch (e) {
                console.error(e)
                if (task.required) process.exit(1);
            }
        }
        return this;
    }
}