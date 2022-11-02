const VALUES = {
  name: "name",
  age: "age",
  address: "address",
};

function isValidKey(key: string): key is keyof typeof VALUES {
  return key in VALUES;
}

export function getVal(key: string) {
  if (isValidKey(key)) {
    return VALUES[key];
  }

  return "";
}

export function move(animal: any) {
  if ("swim" in animal) {
    return animal.swim();
  }

  return animal.fly();
}
