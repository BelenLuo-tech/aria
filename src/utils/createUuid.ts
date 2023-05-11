export function createUniqueString() {
  const timestamp = String(+new Date())
  const randomNum = parseInt(String((1 + Math.random()) * 65536))
  return Number(randomNum + timestamp).toString(32)
}