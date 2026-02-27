import {Button} from 'primereact/button'
import {Column} from 'primereact/column'
import {DataTable} from 'primereact/datatable'
import {Dropdown} from 'primereact/dropdown'
import {InputText} from 'primereact/inputtext'
import {ProgressSpinner} from 'primereact/progressspinner'
import {useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {useToast} from '../../../contexts/toast-context'
import type {AppDispatch, RootState} from '../../../store'
import type {RequestWithId} from '../../../store/slices/requestsSlice'
import {fetchRequestList, setSelectedId} from '../../../store/slices/requestsSlice'
import {ViewRequestDialog} from '../request-list-datatable/ViewRequestDialog'

function formatDate(val: string | undefined): string {
  if (!val) return '—'
  try {
    const d = new Date(val)
    return isNaN(d.getTime()) ? val : d.toLocaleDateString()
  } catch {
    return val
  }
}

export function RequestListDatatable() {
  const dispatch = useDispatch<AppDispatch>()
  const {show} = useToast()
  const {items, loading, error} = useSelector((s: RootState) => s.requests)

  const [filterRefNo, setFilterRefNo] = useState('')
  const [filterAddressTo, setFilterAddressTo] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const statusOptions = useMemo(() => {
    const statuses = new Set<string>()
    items.forEach(item => {
      const s = (item.status ?? '').toString()
      if (s) statuses.add(s)
    })
    return Array.from(statuses)
      .sort()
      .map(s => ({label: s, value: s}))
  }, [items])

  useEffect(() => {
    dispatch(fetchRequestList())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      show({severity: 'error', summary: 'Error', detail: error})
    }
  }, [error, show])

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const refMatch =
        !filterRefNo || (item.reference_no ?? item._id).toString().toLowerCase() === filterRefNo.trim().toLowerCase()
      const addressMatch =
        !filterAddressTo || item.address_to.toLowerCase().includes(filterAddressTo.trim().toLowerCase())
      const statusMatch = !filterStatus || (item.status ?? '').toString() === filterStatus
      return refMatch && addressMatch && statusMatch
    })
  }, [items, filterRefNo, filterAddressTo, filterStatus])

  function openDialog(id: string) {
    dispatch(setSelectedId(id))
  }

  return (
    <>
      <div className="flex flex-column gap-2 mb-3">
        <span className="font-semibold">Filters</span>
        <div className="grid gap-2 align-items-end">
          <div className="col-12 md:col-3 flex flex-column gap-1">
            <label htmlFor="filter-ref" className="text-sm">
              Reference No.
            </label>
            <InputText
              id="filter-ref"
              value={filterRefNo}
              onChange={e => setFilterRefNo(e.target.value)}
              placeholder="Reference No."
              className="w-full"
            />
          </div>
          <div className="col-12 md:col-3 flex flex-column gap-1">
            <label htmlFor="filter-address" className="text-sm">
              Address to
            </label>
            <InputText
              id="filter-address"
              value={filterAddressTo}
              onChange={e => setFilterAddressTo(e.target.value)}
              placeholder="Address to"
              className="w-full"
            />
          </div>
          <div className="col-12 md:col-3 flex flex-column gap-1">
            <label htmlFor="filter-status" className="text-sm">
              Status
            </label>
            <Dropdown
              inputId="filter-status"
              value={filterStatus}
              options={statusOptions}
              onChange={e => setFilterStatus((e.value ?? '') as string)}
              placeholder="Status"
              showClear
              className="w-full"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <ProgressSpinner />
      ) : (
        <DataTable
          value={filteredItems}
          sortField="issued_on"
          sortOrder={-1}
          removableSort
          scrollHeight="60vh"
          tableStyle={{minWidth: '50rem'}}
          emptyMessage="No requests found."
        >
          <Column
            header=""
            body={(row: RequestWithId) => (
              <Button
                type="button"
                icon="pi pi-eye"
                text
                rounded
                aria-label="View request"
                onClick={() => openDialog(row._id)}
              />
            )}
          />
          <Column
            field="reference_no"
            header="Reference No."
            body={(row: RequestWithId) => row.reference_no ?? row._id}
            sortable={false}
          />
          <Column field="address_to" header="Address to" sortable={false} />
          <Column
            field="purpose"
            header="Purpose"
            body={(row: RequestWithId) => (row.purpose.length > 50 ? `${row.purpose.slice(0, 50)}…` : row.purpose)}
            sortable={false}
          />
          <Column
            field="issued_on"
            header="Issued on"
            body={(row: RequestWithId) => formatDate(row.issued_on)}
            sortable
          />
          <Column field="status" header="Status" sortable body={(row: RequestWithId) => row.status ?? '—'} />
        </DataTable>
      )}
      <ViewRequestDialog />
    </>
  )
}
