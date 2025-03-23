
export function CompareDateTime(from: string, to: string) {

  const _from = Date.parse(from)

  const _to = Date.parse(to)

  return _from < _to ? true : (

    _from == _to ? null : false

  )

}
