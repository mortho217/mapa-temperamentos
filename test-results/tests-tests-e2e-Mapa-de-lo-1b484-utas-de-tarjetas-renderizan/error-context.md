# Page snapshot

```yaml
- generic [active]:
  - alert [ref=e1]
  - dialog "Failed to compile" [ref=e4]:
    - generic [ref=e5]:
      - heading "Failed to compile" [level=4] [ref=e7]
      - generic [ref=e8]:
        - generic [ref=e11]: "./app/globals.css.webpack[javascript/auto]!=!./node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[13].oneOf[12].use[2]!./node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[13].oneOf[12].use[3]!./app/globals.css Error: Cannot find module 'tailwindcss' Require stack: - C:\\Users\\PC02\\Documents\\temperamentos\\VS CODE\\node_modules\\next\\dist\\build\\webpack\\config\\blocks\\css\\plugins.js - C:\\Users\\PC02\\Documents\\temperamentos\\VS CODE\\node_modules\\next\\dist\\build\\webpack\\config\\blocks\\css\\index.js - C:\\Users\\PC02\\Documents\\temperamentos\\VS CODE\\node_modules\\next\\dist\\build\\webpack\\config\\index.js - C:\\Users\\PC02\\Documents\\temperamentos\\VS CODE\\node_modules\\next\\dist\\build\\webpack-config.js - C:\\Users\\PC02\\Documents\\temperamentos\\VS CODE\\node_modules\\next\\dist\\server\\dev\\hot-reloader-webpack.js - C:\\Users\\PC02\\Documents\\temperamentos\\VS CODE\\node_modules\\next\\dist\\server\\lib\\router-utils\\setup-dev.js - C:\\Users\\PC02\\Documents\\temperamentos\\VS CODE\\node_modules\\next\\dist\\server\\lib\\router-server.js - C:\\Users\\PC02\\Documents\\temperamentos\\VS CODE\\node_modules\\next\\dist\\server\\lib\\start-server.js at Array.map (<anonymous>)"
        - contentinfo [ref=e12]:
          - paragraph [ref=e13]:
            - generic [ref=e14]: This error occurred during the build process and can only be dismissed by fixing the error.
```