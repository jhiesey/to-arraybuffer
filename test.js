const { Buffer } = require('buffer')
const test = require('tape')

const toArrayBuffer = require('./index.js')

function elementsEqual (ab, buffer) {
  const view = new Uint8Array(ab)
  for (let i = 0; i < view.length; i++) {
    if (view[i] !== buffer[i]) {
      return false
    }
  }
  return true
}

test('Basic behavior', function (t) {
  const buf = Buffer.alloc(10)
  for (let i = 0; i < 10; i++) {
    buf[i] = i
  }

  const ab = toArrayBuffer(buf)

  t.equals(ab.byteLength, 10, 'correct length')
  t.ok(elementsEqual(ab, buf), 'elements equal')
  t.end()
})

test('Behavior when input is a subarray 1', function (t) {
  const origBuf = Buffer.alloc(10)
  for (let i = 0; i < 10; i++) {
    origBuf[i] = i
  }
  const buf = origBuf.slice(1)

  const ab = toArrayBuffer(buf)

  t.equals(ab.byteLength, 9, 'correct length')
  t.ok(elementsEqual(ab, buf), 'elements equal')
  t.notOk(ab === buf.buffer, 'the underlying ArrayBuffer is not returned when incorrect')
  t.end()
})

test('Behavior when input is a subarray 2', function (t) {
  const origBuf = Buffer.alloc(10)
  for (let i = 0; i < 10; i++) {
    origBuf[i] = i
  }
  const buf = origBuf.slice(0, 9)

  const ab = toArrayBuffer(buf)

  t.equals(ab.byteLength, 9, 'correct length')
  t.ok(elementsEqual(ab, buf), 'elements equal')
  t.notOk(ab === buf.buffer, 'the underlying ArrayBuffer is not returned when incorrect')
  t.end()
})
