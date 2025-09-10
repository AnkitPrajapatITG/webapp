const notyf = new Notyf({
    duration: 0, // default duration for all toasts
    ripple: true,   // ripple effect
    dismissible: true, // add close button
    position: { x: 'right', y: 'top' },
    types: [
        {
            type: 'loading',
            background: 'linear-gradient(90deg, #64748b, #475569)', // gray

        }
    ]
});

export default notyf;