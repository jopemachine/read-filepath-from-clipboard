const { sync, async } = require('./index');

console.log('sync', sync());

(async () => {
    console.log('async', await async());
}) ();