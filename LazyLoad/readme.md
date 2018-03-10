# Instructions

Dinamic import for lazy loading:
```
import("zxcvbn").then((zxcvbn) => {
    this.zxcvbn = zxcvbn;
    this.setPasswordStrength(this.props.values.password);
});
```

Import modules from libs(if can), less bundle size:
```
import Grid  from 'react-bootstrap/lib/Grid';
```

For lazy routing component:
```
./core/AsyncComponent.tsx
```

# TODO
Test style component. Maybe need recreate webpack for this.