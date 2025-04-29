const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsedArgs = {};
  
  for (let i = 0; i < args.length; i += 2) {
    if (args[i].startsWith('--')) {
      const propName = args[i].slice(2);
      const value = args[i + 1];
      parsedArgs[propName] = value;
    }
  }
  
  for (const [key, value] of Object.entries(parsedArgs)) {
    console.log(`${key} is ${value}`);
  }
};

parseArgs();