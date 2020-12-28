import React from 'react'
import { useTraversal } from '../contexts'
import { Modal } from '../components/modal'
import { useCrudContext } from '../hooks/useCrudContext'

export function AddItem(props) {
  const Ctx = useTraversal()
  const { post } = useCrudContext()
  const { type } = props
  const { getForm } = Ctx.registry

  const Form = getForm(type)

  const setActive = () => {
    Ctx.cancelAction()
  }

  async function doSubmit(data) {
    const form = Object.assign(
      {},
      { '@type': type },
      data.formData ? data.formData : data
    )

    const { isError, errorMessage } = await post(form)
    if (!isError) {
      Ctx.flash('Content created!', 'success')
    } else {
      Ctx.flash(`An error has ocurred: ${errorMessage}`, 'danger')
    }

    Ctx.cancelAction()
    Ctx.refresh()
  }

  return (
    <Modal isActive={true} setActive={setActive}>
      <Form
        onSubmit={doSubmit}
        onError={(err) => console.log(err)}
        actionName={'Add ' + type}
        title={'Add ' + type}
        type={type}
      />
    </Modal>
  )
}
