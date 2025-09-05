import {Command} from "commander";
import {TasksManager} from "../library/tasks.manager.js";
import {getCurrentPackageBranch} from "../library/git.utilities.js";

const runner = new Command()
const directory = process.cwd();


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
        // console.log('TASK', `Pushing package ${name} to ${branch} branch...`)
        (new TasksManager())
            .add('pkg:pushing', `git subtree push --prefix=packages/${name} ${name} ${branch}`)
            .run()
    })

runner
    .command('pushes')
    .action(() => {
        (new TasksManager())
            .add('pkg:pushing', `node ./bin/git-push-packages.js`)
            .run()
    })


runner.parse(process.argv);