import {z} from 'zod'

export const requestCertificateSchema = z.object({
  address_to: z
    .string()
    .min(1, 'Address to is required')
    .regex(/^[a-zA-Z0-9\s]+$/, 'Address to must be alphanumeric'),
  purpose: z.string().min(50, 'Purpose must be at least 50 characters'),
  issued_on: z
    .string()
    .min(1, 'Issued on is required')
    .refine(val => {
      const d = new Date(val)
      d.setHours(0, 0, 0, 0)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return d > today
    }, 'Issued on must be a future date'),
  employee_id: z.string().min(1, 'Employee ID is required').regex(/^\d+$/, 'Employee ID must be numeric only'),
})

export type RequestCertificateFormValues = z.infer<typeof requestCertificateSchema>
