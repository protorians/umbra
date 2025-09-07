import {Command} from "commander";
import {TasksManager} from "../library/tasks.manager.js";
import {getCurrentPackageBranch} from "../library/git.utilities.js";

const GIT_BOILERPLATE_REPO_URL = "https://github.com/protorians/package-boilerplate.git";

const runner = new Command()


runner.name('package-manager')
    .description('Package manager');


runner
    .command('add')
    .alias('a')
    .argument("<string>", "Name of package",)
    .option("-g, --git <string>", "Git URL",)
    .option("-b, --branch <string>", "Branch name(main as default)", "main")
    .action((name, {git, branch}) => {
        (new TasksManager())
            .add('pkg:add.dir', `mkdir packages/${name}`)
            .add('pkg:add.dir.fs', `mkdir -p packages/${name}`)
            .add('pkg:initialization', `cd packages/${name} && git clone ${GIT_BOILERPLATE_REPO_URL} . && pnpm install && cd ../../`)
            .add('pkg:remote.git', `git remote add ${name} ${git}`)
            .add('pkg:add.subtree', `git subtree add --prefix=packages/${name} ${name} ${branch} --squash | true`)
            .run()
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
        // .add('pkg:commit.removal', `git add .`, false)
        // .add('pkg:commit.removal', `git commit -m "Remove subtree package: ${name}"`, false);

        if (!opts.keepRemote) {
            tasks.add('pkg:remote.remove', `git remote remove ${name}`, false);
        }

        tasks.run();
    });


runner.parse(process.argv);