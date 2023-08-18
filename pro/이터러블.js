const arr = ['사과', '딸기', '포도', '배']

for (const a of arr) {
  console.log(a)
}
for (const b in arr) {
  console.log(b)
}

console.log(Symbol.iterator in arr) // 이터러블하다.
