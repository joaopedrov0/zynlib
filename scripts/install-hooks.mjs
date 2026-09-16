import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const hookSrc = path.join(projectRoot, "scripts", "pre-commit.sh");
const hookDestDir = path.join(projectRoot, ".git", "hooks");
const hookDest = path.join(hookDestDir, "pre-commit");

if (fs.existsSync(hookDestDir)) {
  fs.copyFileSync(hookSrc, hookDest);
  try {
    fs.chmodSync(hookDest, 0o755);
  } catch {
    // Windows filesystem ignores chmod, safe to continue
  }
  console.log("Pre-commit hook installed successfully into .git/hooks/pre-commit");
}
