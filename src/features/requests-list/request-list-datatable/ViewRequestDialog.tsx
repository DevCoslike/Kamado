import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'
import {InputTextarea} from 'primereact/inputtextarea'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {useToast} from '../../../contexts/toast-context'
import type {RootState} from '../../../store'
import type {RequestWithId} from '../../../store/slices/requestsSlice'
import {setSelectedId, updateRequestPurpose} from '../../../store/slices/requestsSlice'

function formatDate(val: string | undefined): string {
  if (!val) return '—'
  try {
    const d = new Date(val)
    return isNaN(d.getTime()) ? val : d.toLocaleDateString()
  } catch {
    return val
  }
}

export function ViewRequestDialog() {
  const dispatch = useDispatch()
  const {show} = useToast()
  const {items, selectedId} = useSelector((s: RootState) => s.requests)
  const selected = selectedId ? items.find(it => it._id === selectedId) : null

  if (!selected) return null

  return (
    <ViewRequestDialogInner
      key={selected._id}
      selected={selected}
      onHide={() => dispatch(setSelectedId(null))}
      onConfirmPurpose={purpose => {
        if (!selectedId) return
        dispatch(updateRequestPurpose({id: selectedId, purpose}))
        show({severity: 'success', summary: 'Updated', detail: 'Purpose updated.'})
      }}
    />
  )
}

type ViewRequestDialogInnerProps = {
  selected: RequestWithId
  onHide: () => void
  onConfirmPurpose: (purpose: string) => void
}

function ViewRequestDialogInner({selected, onHide, onConfirmPurpose}: ViewRequestDialogInnerProps) {
  const [purposeDraft, setPurposeDraft] = useState(selected.purpose)
  const isNew = (selected.status ?? '').toString() === 'New'

  const isDone = (selected.status ?? '').toString() === 'Done'

  return (
    <Dialog
      header="View request"
      visible
      onHide={onHide}
      style={{width: '100vw', height: '100vh', maxWidth: '100vw', maxHeight: '100vh'}}
      contentStyle={{height: 'calc(100vh - 120px)', overflow: 'auto'}}
      closable
      dismissableMask
      blockScroll
      footer={
        <div className="flex gap-2">
          {isNew && <Button label="Confirm" icon="pi pi-check" onClick={() => onConfirmPurpose(purposeDraft)} />}
          <Button label="Close" icon="pi pi-times" onClick={onHide} />
        </div>
      }
    >
      <div className="grid">
        <div className="col-12 md:col-6 flex flex-column gap-2">
          <div>
            <span className="font-semibold block mb-1">Reference No.</span>
            <span>{selected.reference_no ?? selected._id}</span>
          </div>
          <div>
            <span className="font-semibold block mb-1">Address to</span>
            <span>{selected.address_to}</span>
          </div>
          <div>
            <span className="font-semibold block mb-1">Purpose</span>
            {isNew ? (
              <InputTextarea
                value={purposeDraft}
                onChange={e => setPurposeDraft(e.target.value)}
                rows={4}
                className="w-full"
              />
            ) : (
              <span>{selected.purpose}</span>
            )}
          </div>
          {isDone && (
            <div>
              <span className="font-semibold block mb-1">Issued on</span>
              <span>{formatDate(selected.issued_on)}</span>
            </div>
          )}
          <div>
            <span className="font-semibold block mb-1">Status</span>
            <span>{selected.status ?? '—'}</span>
          </div>
        </div>
        <div className="col-12 md:col-6 flex flex-column gap-2">
          <span className="font-semibold">Document</span>
          {isDone ? (
            <div
              className="flex align-items-center justify-content-center border-1 surface-border border-round p-4"
              style={{minHeight: '200px'}}
            >
              <p className="text-color-secondary m-0">Certificate PDF would be displayed here (no backend PDF API).</p>
            </div>
          ) : (
            <div
              className="flex align-items-center justify-content-center border-1 surface-border border-round p-4"
              style={{minHeight: '200px'}}
            >
              <p className="text-color-secondary m-0">Certificate is yet to be issued.</p>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  )
}
