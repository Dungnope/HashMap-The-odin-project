import { HashSet } from "./hashset.js";
import { HashMap } from "./hashmap.js";
let newSet = new HashSet(12, 0.75);

newSet.set("peter");
newSet.set("parker");
newSet.set("kid");
newSet.set("test");
newSet.remove("kid");
console.log(newSet.keys());
newSet.clear();
console.log(newSet.length());

let newMap = new HashMap();
newMap.set("39", "Dio");
newMap.set("232", "Socola");
newMap.set("23", "Nani");
newMap.set("231", "Baka");
newMap.set("242", "Sura");
console.log(newMap.entries());
newMap.remove("23");
newMap.clear();
console.log(newMap.keys());