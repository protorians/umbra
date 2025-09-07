import {execSync} from "child_process";

/**
 * @typedef {{command: string|((TasksManager)=>void), required: boolean}} ITaskOptions
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
        if (this.tasks.size === 0) return this;

        let x = 0;
        for (const [name, task] of [...this.tasks.entries()]) {
            x++;
            try {
                console.warn(`Task :`, name, `[${x}/${this.tasks.size}]`);

                if (typeof task.command === 'function')
                    task.command(this);
                else
                    execSync(`${task.command}`, {stdio: 'inherit'})
            } catch (e) {
                console.error(e)
                if (task.required) process.exit(1);
            }
        }

        console.warn('Total tasks :', this.tasks.size)

        return this;
    }
}