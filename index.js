module.exports = buf => {
	if (buf instanceof ArrayBuffer) return buf

	if (!ArrayBuffer.isView(buf)) throw new Error('Argument must be a ArrayBufferView')

	// If the buffer isn't a subarray, return the underlying ArrayBuffer
	if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
		return buf.buffer
	}

	// Otherwise we need to get a proper copy
	return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
}
