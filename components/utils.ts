const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const onSubmit = async (values: any) => {
  await sleep(300)
  window.alert(JSON.stringify(values, (_, value) => value, 2))
}
