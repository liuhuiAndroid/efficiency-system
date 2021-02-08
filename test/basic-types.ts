let isDone: Boolean = false
let age: number = 10
let firstName: string = 'viking'
let message: string = `Hello, ${firstName}`
let u: undefined = undefined
let n: null = null
let num: number = undefined
let notSure: any = 4
notSure = "maybe a string"

let arrOfNumbers: number[] = [1121, 2, 3]
arrOfNumbers.push(3)

let users: [string, number] = ['viking', 2]
users.push(1)

interface Person {
  readonly id: number
  name: string
  age?: number
}
let viking: Person = {
  id: 1,
  name: 'viking',
  age: 2
}

const add = (x: number, y: number, z?: number) => {
  if (typeof z === "number") {
    return x + y + z
  } else {
    return x + y
  }
}
let result = add(1, 2)
interface ISum {
  (x: number, y: number, z?: number): number
}
let addCopy: (x: number, y: number, z?: number) => number = add
let addCopy2: ISum = add

let str = 'str'
let numberOrString: number | string // union types
numberOrString = 123
numberOrString = 'abc'

function getLength (input: string | number): number {
  const str = input as string
  if (str.length) {
    return str.length
  } else {
    const number = input as number
    return number.toString.length
  }
}

// type guard
function getLength2 (input: string | number): number {
  if (typeof input === 'string') {
    return input.length
  } else {
    return input.toString().length
  }
}

interface Radio {
  switchRadio (trigger: boolean): void
}
interface Battery {
  checkBatteryStaus (): void
}
interface RadioWithBattery extends Radio {
  checkBatteryStaus (): void
}
class Car implements Radio {
  switchRadio (trigger: boolean) {

  }
}
class CellPhone implements RadioWithBattery {
  switchRadio (trigger: boolean) {

  }
  checkBatteryStaus () {

  }
}

enum Direction {
  Up = "UP",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}
console.log(Direction.Left)
console.log(Direction[0])
const value = 'UP'
if (value === Direction.Up) {
  console.log('go up!')
}

function echo<T> (arg: T): T {
  return arg
}
const str1: string = 'str'
const resultT = echo(str1)

function swap<T, U> (tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
const resultTU = swap(['111', 123])
resultTU[0] = 123

interface IWithLength {
  length: number
}
function echoWithArr<T extends IWithLength> (arg: T): T {
  console.log(arg.length)
  return arg
}
const arrs = echoWithArr([1, 2, 3])

// type aliase
let sum: (x: number, y: number) => number
const result3 = sum(1, 2)
type PlusType = (x: number, y: number) => number
let sum2: PlusType
const result4 = sum2(1, 2)

type Directions = 'Up' | 'Down'
let toWhere: Directions = 'Up'
