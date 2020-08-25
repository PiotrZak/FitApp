import React, {useState, useEffect} from 'react';

export const Plans = () => {

    function sayHello() {
        console.log("Hello");
    }

    return (
        <div className="container">
            <h1>Plans</h1>

            <br/><br/>

            <button className="btn btn--primary btn--sm" onClick={sayHello}>Default</button>
            <button className="btn btn--primary btn--sm" onClick={sayHello}>Pressed</button>
            <button className="btn btn--primary btn--sm" onClick={sayHello} disabled>Disabled</button>

            <br/><br/>

            <button className="btn btn--primary btn--sm btn--icon" onClick={sayHello}>Default</button>
            <button className="btn btn--primary btn--sm btn--icon" onClick={sayHello}>Pressed</button>
            <button className="btn btn--primary btn--sm btn--icon" onClick={sayHello} disabled>Disabled</button>

            <br/><br/>

            <button className="btn btn--primary btn--sm btn--icon-dropdown" onClick={sayHello}>Default</button>
            <button className="btn btn--primary btn--md btn--icon-dropdown" onClick={sayHello}>Pressed</button>
            <button className="btn btn--primary btn--lg btn--icon-dropdown" onClick={sayHello}>Disabled</button>

            <Button type="primary" size="md" value="Default" />

        </div>
    );
}

