import { Expose, Transform } from "class-transformer"
import { User } from "src/users/user.entity"
import { JoinColumn } from "typeorm"

export class ReportDto {
  @Expose()
  id: number

  @Expose()
  approved: boolean

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