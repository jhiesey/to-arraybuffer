/** @param {ArrayBufferView} buf */
module.exports = buf => {
  if (buf instanceof ArrayBuffer) return buf

  if (!ArrayBuffer.isView(buf)) throw new Error('Argument must be a ArrayBufferView')

  // If the buffer isn't a subarray, return the underlying ArrayBuffer
  // Otherwise we need to get a proper copy
  return buf.byteLength === buf.buffer.byteLength
	  ? buf.buffer
    : buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
}
