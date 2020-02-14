// Polyfill Fetch for Node
import 'isomorphic-fetch';

// Polyfill btoa for node
// @ts-ignore
global.btoa = function btoa(str: string) {
  return Buffer.from(str).toString('base64');
};
