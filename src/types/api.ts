/**
 * API request/response types for Zalex request-certificate and request-list.
 */

export interface RequestCertificateBody {
  address_to: string
  purpose: string
  issued_on: string
  employee_id: string
}

export interface RequestCertificateResponse {
  responce: string
}

export interface RequestListItem {
  address_to: string
  purpose: string
  issued_on: string
  employee_id: string
  reference_no?: string
  status?: string
  [key: string]: unknown
}

export class ApiError extends Error {
  readonly status?: number
  readonly body?: unknown
  constructor(message: string, status?: number, body?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}
