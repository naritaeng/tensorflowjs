const arr = ['사과', '딸기', '포도', '배']

const iter = arr[Symbol.iterator]()

console.log(iter.next())
console.log('쉬었다가자1')
console.log(iter.next())
console.log('쉬었다가자2')
console.log(iter.next())
console.log('쉬었다가자3')
console.log(iter.next())
console.log('쉬었다가자4')
console.log(iter.next())