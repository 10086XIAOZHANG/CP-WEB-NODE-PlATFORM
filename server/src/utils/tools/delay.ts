
export const Delay = (ms: number = 0): Promise<void> => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, ms)
})
