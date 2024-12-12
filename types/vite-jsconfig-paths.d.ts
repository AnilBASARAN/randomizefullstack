// types/vite-jsconfig-paths.d.ts
declare module 'vite-jsconfig-paths' {
    import { Plugin } from 'vite';
    const jsconfigPaths: () => Plugin;
    export default jsconfigPaths;
  }
  