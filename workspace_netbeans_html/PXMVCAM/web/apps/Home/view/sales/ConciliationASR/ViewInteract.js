/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : ViewInteract                                      *
 * Created on : 17-10-2016, 10:48:50                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 17-10-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

/* global Ext */

Ext.define('PXMVCAMHome.view.sales.ConciliationASR.ViewInteract', {
    extend: 'Ext.window.Window',
    title: 'Transaction Source',
    bodyStyle: 'background: transparent',
    header: true,
    width: 770,
    height: 600,
    border: false,
    resizable: false,
    layout: {
        type: 'border'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: 'vConciliationASR-ViewInteract-center',
            border: false,
            padding: '5px 5px 5px 5px',
            items: [
                {
                    xtype: 'textarea',
                    id: 'vConciliationASR-ViewInteract-txaSource',
                    fieldStyle: 'font-size:14px;font-weight:bold;font-family:Courier New;text-align:left;background:white;color:#0b333c;',
                    grow: true,
                    readOnly: true,
                    width: '100%',
                    height: '100%',
                    anchor: '100%'
                }
            ],
            bbar: [
                {
                    xtype: 'button',
                    id: 'vConciliationASR-ViewInteract-btnClose',
                    icon: 'resources/img/botones/cancel.png',
                    scale: 'medium',
                    text: 'Close',
                    height: 30
                }
            ]
        }
    ]
});
