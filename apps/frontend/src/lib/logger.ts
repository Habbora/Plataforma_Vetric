export function ts() {
  return new Date().toISOString()
}

export function log(...args: any[]) {
  console.log(`[${ts()}]`, ...args)
}

export function warn(...args: any[]) {
  console.warn(`[${ts()}]`, ...args)
}

export function error(...args: any[]) {
  console.error(`[${ts()}]`, ...args)
}
