export class FadeAnimation {
    entry(duration) {
        return {
            from: {
                opacity: '0',
            },
            to: {
                opacity: '1',
            },
            duration: duration || 200,
        };
    }
    exit(duration) {
        return {
            from: {
                opacity: '1',
            },
            to: {
                opacity: '0',
            },
            duration: duration || 200,
        };
    }
}
