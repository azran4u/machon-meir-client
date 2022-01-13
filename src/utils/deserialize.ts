export function deserialize<T>(serializedJavascript: string): T {
  return eval("(" + serializedJavascript + ")");
}
