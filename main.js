import { HashSet } from "./hashset.js";

let newSet = new HashSet(12, 0.75);

newSet.set("peter");
newSet.set("parker");
newSet.set("kid");
newSet.set("test");
console.log(newSet.keys());