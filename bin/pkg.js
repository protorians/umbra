import {Command} from "commander";
import {TasksManager} from "../library/tasks.manager.js";
import {getCurrentPackageBranch} from "../library/git.utilities.js";

const runner = new Command()
// const directory = process.cwd();


runner.name('package-manager')
    .description('Package manager');


runner
    .command('add')
    .option("-n, --name <string>", "Name of package",)
    .option("-g, --git <string>", "Git URL",)
    .option("-b, --branch <string>", "Branch name(main as default)", "main")
    .action(({name, git, branch}) => {
        (new TasksManager())
            .add('pkg:remote.git', `git remote add ${name} ${git}`)
            .add('pkg:add.subtree', `git subtree add --prefix=packages/${name} ${name} ${branch} --squash`)
            .run()
    })

runner
    .command('push')
    .argument("<string>", "Name of package",)
    .option("-b, --branch <string>", "Branch name(main as default)")
    .action((name, {branch}) => {
        branch = branch || getCurrentPackageBranch(name);
        (new TasksManager())
            .add('pkg:push.one', `git subtree push --prefix=packages/${name} ${name} ${branch}`)
            .run()
    })

runner
    .command('pushes')
    .action(() => {
        (new TasksManager())
            .add('pkg:push.all', `node ./bin/git.pkg.push.js`)
            .run()
    })

runner
    .command('pulls')
    .action(() => {
        (new TasksManager())
            .add('pkg:pull.all', `node ./bin/git.pkg.pull.js`)
            .run()
    })

runner
    .command('pull')
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
            .add('pkg:remove.subtree.dir', `git rm -r --cached packages/${name}`, false)
            .add('pkg:remove.subtree.dir.fs', `rm -rf packages/${name}`, false)
            // .add('pkg:commit.removal', `git add .`, false)
            // .add('pkg:commit.removal', `git commit -m "Remove subtree package: ${name}"`, false);

        if (!opts.keepRemote) {
            tasks.add('pkg:remote.remove', `git remote remove ${name}`, false);
        }

        tasks.run();
    });


runner.parse(process.argv);