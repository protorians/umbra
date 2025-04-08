import {Override, StatefulView, Text} from "@protorians/widgets"

export default class extends StatefulView {

    @Override() body() {
        return Text({
            children: Text({
                children: 'Hello World !!',
                style:{
                    fontSize: '12px',
                    color: 'red',
                }
            })
        })
    }

}