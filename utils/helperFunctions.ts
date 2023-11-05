export function replaceBetween(
    origin: any,
    startIndex: any,
    endIndex: any,
    insertion: any
  ) {
    return (
      origin?.substring(0, startIndex) + insertion + origin?.substring(endIndex)
    );
  }