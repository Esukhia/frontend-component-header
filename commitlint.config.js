module.exports = {
  extends: ['@commitlint/config-conventional'],
  // Pre-existing commit from before this repo enforced conventional commits;
  // rewording it would mean rewriting and force-pushing published history.
  ignores: [(message) => message.startsWith('Update header for v8')],
};
