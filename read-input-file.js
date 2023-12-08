import fs from 'fs'
export const fileToString = name => fs.readFileSync('./' + name).toString();