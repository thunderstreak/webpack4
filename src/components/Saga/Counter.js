import React from 'react';
export default function ({ value, onIncrement, onDecrement, onIncrementAsync, onDecrementAsync }) {
    return (
        <div>
            <button onClick={onIncrementAsync}>
                Increment after 1 second
            </button>
            <button onClick={onDecrementAsync}>
                onDecrement after 1 second
            </button>
            <button onClick={onIncrement}>
                Increment
            </button>
            <button onClick={onDecrement}>
                Decrement
            </button>
            <hr />
            <div>
                Clicked: {value} times
            </div>
        </div>
    );
}
