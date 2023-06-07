// rollup.config.js
import path from "path";
import copy from 'rollup-plugin-copy';
import css from "rollup-plugin-import-css";
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import zip from 'rollup-plugin-zip'

const inputDirJoin = (rest) => {
  const dir = "src";
  if (!rest) {
    return dir;
  }
  return path.join(dir, rest);
};
const outputDirJoin = (rest) => {
  const dir = "/mnt/d/Workspace/dev_browser-ext_gushiwen-delads";
  if (!rest) {
    return dir;
  }
  return path.join(dir, rest);
};

const pordOutputDirJoin = (rest) => {
  const dir = "dist/browser-ext_gushiwen-delads";
  if (!rest) {
    return dir;
  }
  return path.join(dir, rest);
};

const copyStatic = () => copy({
  targets: [
    { src: inputDirJoin('manifest.json'), dest: outputDirJoin() },
    { src: inputDirJoin('images/**/*'), dest: outputDirJoin('images') }
  ]
})

export default {
  watch: {
    include: "src/**"
  },
	input: {
    "scripts/content": inputDirJoin("scripts/content.js")
  },
	output: [
		{
			format: 'cjs',
      dir: outputDirJoin(),
      plugins: [terser()]
		},
    {
			format: 'cjs',
      dir: pordOutputDirJoin(),
      plugins: [terser()]
		},
	],
  plugins: [
    nodeResolve(),
    copy({
      targets: [
        { src: inputDirJoin('manifest.json'), dest: outputDirJoin() },
        { src: inputDirJoin('images/**/*'), dest: outputDirJoin('images') },
        { src: inputDirJoin('manifest.json'), dest: pordOutputDirJoin() },
        { src: inputDirJoin('images/**/*'), dest: pordOutputDirJoin('images') }
      ]
    }),
    css()
  ]
};
