/** 对象合并
 * @description 把来源数据，不存在目标字典的数据不允许被合并到目标字典中，如果目标字典中没有的字段合并时会被忽略合并
 * @param { object<T> } target 目标字典
 * @param { object<S> } source 来源数据
 * @param { string[] } extraKeys 需要额外添加到 target 中的数据
 * */
export function assign<T, S>(target: object & T, source: object & S, extraKeys: string[] = []) {
  for (const [key, value] of Object.entries(source)) {
    if (key in target || extraKeys.includes(key)) {
      Reflect.set(target, key, value)
    }
  }
  return target
}
