import { 
  ITEMS_PANELS_SELECTORS, 
} from '../elements/panels-selectors'
import { 
  EDITABLE_FORM_SELECTORS, 
  FORM_SELECTORS,
  USER_FORM_SELECTORS
} from '../elements/form-types-selectors'
import { NOTIFICATION_SELECTOR } from '../elements/notification-selectors'
import { ACTION_SELECTORS } from '../elements/actions-selectors'
import { BREADCRUMB_SELECTORS } from '../elements/breadcrumb-selectors'

describe('test content', function () {
  beforeEach('clear', function () {
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.autologin()
    cy.visit('/db/container/')
    cy.get(ITEMS_PANELS_SELECTORS.table)
      .should('contain', 'Groups')
      .should('contain', 'Users')
  })
  it('creates a folder as Admin, then deletes it', function () {

    // Create Folder
    cy.addContent('Test folder', 'test-folder', 'btnAddFolder')

    // Delete Folder
    cy.get(`[data-test='${ITEMS_PANELS_SELECTORS.prefixItem}-test-folder']`).within(() => {
      cy.get(ACTION_SELECTORS.delete).click()
    })
    cy.get(ACTION_SELECTORS.confirmModal).click()
    cy.get(NOTIFICATION_SELECTOR).should('contain', 'Items removed!')
  })

  it('creates an item as Admin, modifies it and delete it', function () {

    // Create Item
    cy.intercept(`/db/container/test-item/@canido?permissions=guillotina.AddContent,guillotina.ModifyContent,guillotina.ViewContent,guillotina.DeleteContent,guillotina.AccessContent,guillotina.SeePermissions,guillotina.ChangePermissions,guillotina.MoveContent,guillotina.DuplicateContent,guillotina.ReadConfiguration,guillotina.RegisterConfigurations,guillotina.WriteConfiguration,guillotina.ManageAddons,guillotina.swagger.View`).as('canido')

    cy.addContent('Test Item', 'test-item', 'btnAddItem')


    // Modify Item
    cy.get(`[data-test='${ITEMS_PANELS_SELECTORS.prefixItem}-test-item']`).click()
    cy.wait('@canido')
    cy.get(
      `[data-test='${EDITABLE_FORM_SELECTORS.prefixEditableField}-title']`
    ).click()
    cy.get(
      `[data-test='${EDITABLE_FORM_SELECTORS.prefixEditableField}-title']`
    ).within(() => {
      cy.get(EDITABLE_FORM_SELECTORS.field).clear().type('Test Modified Item')
      cy.get(EDITABLE_FORM_SELECTORS.btnSave).click()
    })
    
    cy.get(NOTIFICATION_SELECTOR).should('contain', 'Field title, updated!')
    cy.get(`[data-test='${BREADCRUMB_SELECTORS.prefixItem}-container']`).click()

    // Delete Item
    cy.get(`[data-test='${ITEMS_PANELS_SELECTORS.prefixItem}-test-item']`).within(() => {
      cy.get(ACTION_SELECTORS.delete).click()
    })
    cy.get(ACTION_SELECTORS.confirmModal).click()
    cy.get(NOTIFICATION_SELECTOR).should('contain', 'Items removed!')
  })

  it('creates a User as Admin, modifies it and delete it', function () {
    cy.get(`[data-test='${ITEMS_PANELS_SELECTORS.prefixItem}-users']`).click()

    // Create User
    cy.get('.level-right > .button').click()
    cy.get(USER_FORM_SELECTORS.username).type('test-user')
    cy.get(USER_FORM_SELECTORS.email).type('test-user@test.test')
    cy.get(USER_FORM_SELECTORS.name).type('Test Name')
    cy.get(USER_FORM_SELECTORS.password).type('TestPassword')
    cy.get(FORM_SELECTORS.containerUser).within(() => {
      cy.get('form').submit()
    })
    cy.get(NOTIFICATION_SELECTOR).should('contain', 'Content created!')

    // Modify Item
    cy.get(`[data-test='${ITEMS_PANELS_SELECTORS.prefixItem}-test-user']`).click()
    cy.get(USER_FORM_SELECTORS.username).type('Test Modified User', {
      force: true,
    })

    cy.get(USER_FORM_SELECTORS.btnUpate).click()
    cy.get(NOTIFICATION_SELECTOR).should('contain', 'Data updated')
    cy.get(`[data-test='${BREADCRUMB_SELECTORS.prefixItem}-users']`).click()

    // Delete Item
    cy.get(`[data-test='${ITEMS_PANELS_SELECTORS.prefixItem}-test-user']`).within(() => {
      cy.get(ACTION_SELECTORS.delete).click()
    })
    cy.get(ACTION_SELECTORS.confirmModal).click()
    cy.get(NOTIFICATION_SELECTOR).should('contain', 'Items removed!')
  })
})
