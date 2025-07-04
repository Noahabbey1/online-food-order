"use client"
import React from "react"
import {Dialog, Portal, createOverlay } from "@chakra-ui/react"
import PropTypes from 'prop-types'

MyDialog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  content: PropTypes.node
}



const dialog = createOverlay<DialogProps>((props) => {
  const { title, description, content, ...rest } = props
  return (
    <Dialog.Root {...rest}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {title && (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body spaceY="4">
              {description && (
                <Dialog.Description>{description}</Dialog.Description>
              )}
              {content}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
})
export default dialog;