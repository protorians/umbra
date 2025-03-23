
export type QuadrilateralArray<T> = [T, T, T, T] | [T, T, T] | [T, T] | [T]
export type IQuadrilateralKey = 'top' | 'bottom' | 'left' | 'right'
export type IQuadrilateral<T> = {
  [K in IQuadrilateralKey]?: T
}
