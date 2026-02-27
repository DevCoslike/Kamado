import {zodResolver} from '@hookform/resolvers/zod'
import {Button} from 'primereact/button'
import {Calendar} from 'primereact/calendar'
import {InputText} from 'primereact/inputtext'
import {InputTextarea} from 'primereact/inputtextarea'
import {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'

import {ApiError, postRequestCertificate} from '../../api'
import {useToast} from '../../contexts/toast-context'
import {formatDateForApi} from './formatDateForApi'
import type {RequestCertificateFormValues} from './requestCertificateSchema'
import {requestCertificateSchema} from './requestCertificateSchema'

export function RequestCertificateForm() {
  const {show} = useToast()
  const navigate = useNavigate()

  const {
    control,
    formState: {errors, isSubmitting},
    getValues,
    handleSubmit,
    register,
  } = useForm<RequestCertificateFormValues>({
    resolver: zodResolver(requestCertificateSchema),
    mode: 'onSubmit',
    defaultValues: {
      address_to: '',
      purpose: '',
      issued_on: '',
      employee_id: '',
    },
  })

  const [allFilled, setAllFilled] = useState(false)
  function checkFilled() {
    const v = getValues()
    setAllFilled(Boolean(v.address_to?.trim() && v.purpose?.trim() && v.issued_on && v.employee_id?.trim()))
  }

  async function onSubmit(values: RequestCertificateFormValues) {
    try {
      const res = await postRequestCertificate({
        address_to: values.address_to,
        purpose: values.purpose,
        issued_on: formatDateForApi(values.issued_on),
        employee_id: values.employee_id,
      })
      if (res.responce === 'Ok') {
        show({severity: 'success', summary: 'Success', detail: 'Request submitted successfully.'})
        navigate('/requests')
      }
    } catch (err) {
      const message = err instanceof ApiError ? err.message : String(err)
      show({severity: 'error', summary: 'API Error', detail: message})
    }
  }

  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-3" noValidate>
      <div className="grid gap-3">
        <div className="col-12 md:col-3 flex flex-column gap-1">
          <label htmlFor="address_to">Address to *</label>
          <InputText
            id="address_to"
            {...register('address_to', {onChange: checkFilled})}
            className={`w-full ${errors.address_to ? 'p-invalid' : ''}`}
            aria-invalid={!!errors.address_to}
          />
          <span className="form-error-slot">
            {errors.address_to && <small className="p-error">{errors.address_to.message}</small>}
          </span>
        </div>

        <div className="col-12 md:col-3 flex flex-column gap-1">
          <label htmlFor="issued_on">Issued on * (future dates only)</label>
          <Controller
            control={control}
            name="issued_on"
            render={({field}) => (
              <Calendar
                id="issued_on"
                value={field.value ? new Date(field.value) : null}
                onChange={e => {
                  field.onChange(e.value ? (e.value as Date).toISOString() : '')
                  checkFilled()
                }}
                minDate={minDate}
                dateFormat="dd/mm/yy"
                className={`w-full ${errors.issued_on ? 'p-invalid' : ''}`}
                aria-invalid={!!errors.issued_on}
              />
            )}
          />
          <span className="form-error-slot">
            {errors.issued_on && <small className="p-error">{errors.issued_on.message}</small>}
          </span>
        </div>

        <div className="col-12 md:col-3 flex flex-column gap-1">
          <label htmlFor="employee_id">Employee ID *</label>
          <InputText
            id="employee_id"
            {...register('employee_id', {onChange: checkFilled})}
            className={`w-full ${errors.employee_id ? 'p-invalid' : ''}`}
            aria-invalid={!!errors.employee_id}
          />
          <span className="form-error-slot">
            {errors.employee_id && <small className="p-error">{errors.employee_id.message}</small>}
          </span>
        </div>
      </div>

      <div className="col-12 flex flex-column gap-1">
        <label htmlFor="purpose">Purpose * (min 50 characters)</label>
        <InputTextarea
          id="purpose"
          {...register('purpose', {onChange: checkFilled})}
          rows={4}
          className={`w-full ${errors.purpose ? 'p-invalid' : ''}`}
          aria-invalid={!!errors.purpose}
        />
        <span className="form-error-slot">
          {errors.purpose && <small className="p-error">{errors.purpose.message}</small>}
        </span>
      </div>

      <Button type="submit" label="Submit" loading={isSubmitting} disabled={!allFilled} />
    </form>
  )
}
