export { };
  
declare global {
  interface Array<T> {
    selfConcat(): T
  }
}

Array.prototype.selfConcat = function () {
  if (!Array.isArray(this[0])) {
    return this
  } 

  return this.reduce((acc, curr) => {
    return acc.concat(curr)
  }, [])
}