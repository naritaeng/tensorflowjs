/* 원시타입 */

/* 
number
string
boolean
null
undefined
symbol (ES6)=>
일반적으로 심볼타입은 객체의 프로퍼티키를 고유하게 설정
프로퍼티키의 충돌을 방지
*/

/* 객체 타입 */

//object

// 이터러블, 이터레이터, 제너레이터
// 이터러블 - 이터레이터를 리턴하는 [Symbol.iterator]()를 가진 값
// 이터레이터 - {value,done} 객체를 리턴하는 next()를 가진 값
// 이터러블/이터레이터 프로토콜 - 이터러블을 for...of, 전개 연산자 등과 함께
//                              동작하도록 한 규약



const obj = {}

const sb1 = Symbol()
const sb2 = Symbol('hi')
const sb3 = Symbol('hello')

obj[sb1] = '첫 번째 심볼 ""'
obj[sb2] = '두 번째 심볼 hi'
obj[sb3] = '세 번째 심볼 hello'

console.log(obj)

console.log(obj[sb2])

console.log(Array.prototype[Symbol.iterator])