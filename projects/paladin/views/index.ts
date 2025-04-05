import {Layer, Override, StatefulView, Text} from "@protorians/widgets"

export default class extends StatefulView {
    @Override() body() {
        return Layer({
            children: Text({
                children: 'Hello'
            })
        })
    }
}