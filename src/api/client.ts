/**
 * API client for Zalex endpoints. Uses config from src/config/env.ts only.
 * Key is sent as query param subscription-key; never logged or exposed in errors.
 */

import {apiBaseUrl, apiSubscriptionKey} from '../config/env'
import type {RequestCertificateBody, RequestCertificateResponse, RequestListItem} from '../types/api'
import {ApiError} from '../types/api'

function buildUrl(path: string): string {
  const url = new URL(path, apiBaseUrl)
  url.searchParams.set('subscription-key', apiSubscriptionKey)
  return url.toString()
}

async function handleResponse<T>(res: Response, parse: (data: unknown) => T): Promise<T> {
  const text = await res.text()
  let body: unknown
  try {
    body = text ? JSON.parse(text) : null
  } catch {
    body = text
  }
  if (!res.ok) {
    throw new ApiError(`API error: ${res.status} ${res.statusText}`, res.status, body)
  }
  return parse(body)
}

export async function postRequestCertificate(body: RequestCertificateBody): Promise<RequestCertificateResponse> {
  const res = await fetch(buildUrl('/request-certificate'), {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  })
  return handleResponse(res, data => {
    const o = data as Record<string, unknown>
    if (o && typeof o.responce === 'string') {
      return {responce: o.responce}
    }
    throw new ApiError('Invalid response shape', res.status, data)
  })
}

export async function getRequestList(): Promise<RequestListItem[]> {
  const res = await fetch(buildUrl('/request-list'), {method: 'GET'})
  return handleResponse(res, data => {
    if (!Array.isArray(data)) {
      throw new ApiError('Expected array', res.status, data)
    }
    return data as RequestListItem[]
  })
}
