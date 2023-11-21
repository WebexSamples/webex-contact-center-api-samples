import {nodeResolve} from '@rollup/plugin-node-resolve';

export default {
  input: 'src/rss-widget.js', // the path to the component's JavaScript file
  output: {
    file: 'build/rss-widget.js', // the output file
    format: 'iife', // WxCC Requires iife format javascript
    name: 'RssWidget'
  },
  plugins: [
    nodeResolve() // tells Rollup how to find external modules
  ]
};