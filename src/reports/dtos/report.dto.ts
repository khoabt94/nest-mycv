import { Expose, Transform } from "class-transformer"

export class ReportDto {
  @Expose()
  id: string

  @Expose()
  price: number

  @Expose()
  make: string

  @Expose()
  model: string

  @Expose()
  year: number

  @Expose()
  lat: number

  @Expose()
  lng: number

  @Expose()
  milage: number

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: string
}