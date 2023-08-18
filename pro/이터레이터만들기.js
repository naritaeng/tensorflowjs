const range = { from: 1, to: 7 }

// range[Symbol.iterator] = null 배열일 때는 바보가 됨.
range[Symbol.iterator] = function () {
  // iterator 객체를 반환
  return {
    current: this.from,
    last: this.to,
    next() {
      if (this.current <= this.last) {
        return { value: this.current++, done: false }
      } else {
        return { value: undefined, done: true }
      }
    }
  }
}

// iterable 한지 테스트 해보기
for (const n of range) console.log(n)

// coroutine 테스트 해보기
const iter = range[Symbol.iterator]()
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
