# fractal configs

functions and objects

```javascript
const config = (args) => ({
    a: {
        x: 01,
        y: 02,
        z: 03,
    },
    b: (b) => ({
        i: 11 * b.expandme,
        j: 12,
        k: (args) => ({
            l: 21,
            m: 22,
        })
    })
})
```

```javascript
config({
    a: {
        z: 33,
    },
    b: () => ({
        expandme: 3
    }),
    b: {
        i: 111,
        j: 112,
        k: {
            l: 221,
            m: 222,
        }
    }
    
})
```

- start with default config
- 
