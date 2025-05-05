import {Layer, Override, StatefulView, Text} from "@protorians/widgets"
import {testAction} from "../actions/test.action.js";
import {test2Action} from "../actions/test2.action.js";


export default class extends StatefulView {

    @Override() body() {
        return Layer({
            signal: {
                mount: () => {
                    (async () => {
                        const time = Date.now()
                        const action1 = await testAction(time)
                        console.log('Action', action1)
                        const action2 = await test2Action()
                        console.log('Action 2', action2)
                    })()
                },
            },
            children: Text({
                children: 'Hi Vauban',
                style: {
                    color: 'red',
                }
            })
        })
    }

}