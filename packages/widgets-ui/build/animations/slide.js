export class SlideAnimation {
    entry(duration) {
        return {
            from: {
                opacity: '0',
                transform: 'translateY(70%)'
            },
            to: {
                opacity: '1',
                transform: 'translateY(0%)'
            },
            duration: duration || 200,
        };
    }
    exit(duration) {
        return {
            from: {
                opacity: '1',
                transform: 'translateY(0%)'
            },
            to: {
                opacity: '0',
                transform: 'translateY(70%)'
            },
            duration: duration || 200,
        };
    }
}
