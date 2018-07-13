# props-did-change
Additional react lifecycle hook called when component is mounted or component's props are changed.
Works both with typescript and javascript.

Useful when you want to sync some data with an API on both `componentDidMount` and `componentDidUpdate` lifecycle hooks.

## Installation
```
npm install props-did-change
```

## Typescript Example
```JSX
import propsDidChange from 'props-did-change';
import * as React from 'react';

export class CountPrinter extends React.Component<{
  count: number;
}> {
  @propsDidChange
  public propsDidChange(prevProps: any, type: string) {
    console.log('prevProps', prevProps); // prints old props on update or null on mount
    console.log('this.props', this.props); // prints current props
    console.log('props change type', type) // prints 'componentDidMount' or 'componentDidUpdate'

    /* ...
       you can initiate your API calls here
       ...
     */
  }

  public render() {
    return this.props.count;
  }
}
```

## Interoperation with existing componentDidMount and componentDidUpdate
If you implement your own `componentDidMount` and `componentDidUpdate`, they will be called and awaited __before__ `propsDidChange` method is called.

## Note
You can name your new lifecycle method whatever you want, you just have to decorate it with `@propsDidChange`.
