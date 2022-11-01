const VALUES: Record<string, string> = {
  name: "name",
  age: "age",
  address: "address",
};

export function getVal(key: string) {
  if (key in VALUES) {
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
