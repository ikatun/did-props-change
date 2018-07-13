const noop = () => null;

export function didPropsChange(classObject: any, key: string, descriptor: object | undefined) {
  if (descriptor === undefined) {
    descriptor = Object.getOwnPropertyDescriptor(classObject, key);
  }

  const existingComponentDidMount = classObject.componentDidMount || noop;

  // tslint:disable-next-line
  classObject.componentDidMount = async function () {
    await existingComponentDidMount.apply(this);
    return classObject[key].apply(this, [null, 'componentDidMount']);
  }

  const existingComponentDidUpdate = classObject.componentDidUpdate || noop;
  // tslint:disable-next-line
  classObject.componentDidUpdate = async function (prevProps: any, prevState: any, snapshot: any) {
    await existingComponentDidUpdate.apply(this, [prevProps, prevState, snapshot]);
    // tslint:disable-next-line:no-console
    if (prevProps !== this.props) {
      return classObject[key].apply(this, [prevProps, 'componentDidUpdate']);
    }
  }

  return descriptor;
}

export default didPropsChange;
