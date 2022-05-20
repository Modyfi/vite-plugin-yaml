/**
 * Import a directory of YAML files as JSON
 */
export function importContent() {
  const contentModules = import.meta.globEager('./content/**/*.{yml,yaml}');

  if (!contentModules) throw new Error('Could not find any content files');

  return Object.entries(contentModules).map(([path, module]) => {
    // Mild guard against malformed content
    if (
      !module ||
      !module.default?.id ||
      typeof module.default.id !== 'number'
    ) {
      throw new Error(
        `Invalid content: ${path}\n${JSON.stringify(module, null, 2)}`
      );
    }

    return module.default;
  });
}
