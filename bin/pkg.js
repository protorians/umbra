import {Command} from "commander";
import {TasksManager} from "../library/tasks.manager.js";
import {
    ensureRemote,
    getCurrentPackageBranch,
    initNewerPackage, stashAfter,
    stashBefore,
    subtreeAddOrPull
} from "../library/git.utilities.js";

const runner = new Command()

runner.name('package-manager')
    .description('Package manager');


runner
    .command('add')
    .alias('a')
    .argument("<string>", "Name of package",)
    .option("-g, --git <string>", "Git URL", null)
    .option("-b, --branch <string>", "Branch name(main as default)", "main")
    .option("--newer", "Create a new package")
    .action((name, {git, branch, newer}) => {
        const gitUrl = git || `https://github.com/protorians/${name}.git`;
        (new TasksManager())
            .add('pkg:add.dir.safe', `mkdir -p packages/${name}`)
            .add('pkg:remote.ensure', () => ensureRemote(name, gitUrl))
            .add('pkg:stash.before', (tm) => stashBefore(tm))
            .add('pkg:subtree.add.or.pull', () => subtreeAddOrPull(name, branch))
            .add('pkg:newer.init', () => initNewerPackage(newer))
            .add('pkg:stash.after', (tm) => stashAfter(tm))
            .run();
    })

runner
    .command('push')
    .argument("<string>", "Name of package",)
    .alias('ps')
    .option("-b, --branch <string>", "Branch name(main as default)")
    .action((name, {branch}) => {
        branch = branch || getCurrentPackageBranch(name);
        (new TasksManager())
            .add('pkg:push.one', `git subtree push --prefix=packages/${name} ${name} ${branch} | true`)
            .run()
    })

runner
    .command('pushes')
    .alias('psh')
    .action(() => {
        (new TasksManager())
            .add('pkg:push.all', `node ./bin/git.pkg.push.js`)
            .run()
    })

runner
    .command('pulls')
    .alias('pls')
    .action(() => {
        (new TasksManager())
            .add('pkg:pull.all', `node ./bin/git.pkg.pull.js`)
            .run()
    })

runner
    .command('pull')
    .alias('pl')
    .argument("<string>", "Name of package",)
    .option("-b, --branch <string>", "Branch name(main as default)")
    .action((name, {branch}) => {
        const branchArg = branch ? ` ${branch}` : '';
        (new TasksManager())
            .add('pkg:pull.one', `node ./bin/git.pkg.pull.one.js ${name} ${branchArg}`)
            .run()
    })

runner
    .command('remove')
    .alias('rm')
    .argument("<string>", "Name of package")
    .option("-b, --branch <string>", "Branch name(main as default)")
    .option("--keep-remote", "Keep the git remote (do not remove it)")
    .action((name, opts) => {
        const tasks = new TasksManager();
        tasks
            .add('pkg:remove.subtree.dir', `git rm -r --cached packages/${name} | true`, false)
            .add('pkg:remove.subtree.dir.fs', `rm -rf packages/${name} | true`, false)
            .add('pkg:commit.removal', `git add .`, false)
            .add('pkg:commit.removal', `git commit -m "Remove subtree package: ${name}"`, false);

        if (!opts.keepRemote) {
            tasks.add('pkg:remote.remove', `git remote remove ${name}`, false)
                .fallback(() => {
                    console.log(`Remote ${name} not found`)
                })
            ;
        }

        tasks.run();
    });

runner
    .command('rename')
    .alias('rn')
    .argument('<string>', 'Current name of the subtree (and git remote)')
    .option('-t, --to <string>', 'New name for the subtree (and git remote)')
    .option('-g, --git <string>', 'New Git URL for the remote')
    .action((name, {to, git}) => {
        const tasks = new TasksManager();

        tasks
            .add('pkg:stash.before', (tm) => stashBefore(tm))

        if (to && to !== name) {
            tasks
                .add('pkg:rename.dir', `git mv packages/${name} packages/${to}`, true)
                .add('pkg:rename.remote', `git remote rename ${name} ${to}`, false)
                .add('pkg:commit.rename', `git add .`, false)
                .add('pkg:commit.rename', `git commit -m "Rename subtree: ${name} -> ${to}" | true`, false);
            name = to;
        }

        if (git) {
            tasks.add('pkg:remote.ensure', () => ensureRemote(name, git));
        }

        tasks.add('pkg:stash.after', (tm) => stashAfter(tm));

        tasks.run();
    });


runner.parse(process.argv);