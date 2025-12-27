function log(event, meta = {}) {
  const entry = {
    event,
    timestamp: new Date().toISOString(),
    ...meta
  };

  console.log(JSON.stringify(entry));
}

module.exports = { log };
