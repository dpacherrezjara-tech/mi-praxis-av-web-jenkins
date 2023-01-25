/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.discharges.NoShowForm.NoShowFormDetXmlTicket', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id04 + '-dataEntry',
    controller: prototype.id04 + '-noShowFormDetXmlTicketController',
    requires: [
        'Ext.Praxis.controller.discharges.NoShow.NoShowFormDetXmlTicketController',
        'Ext.Praxis.view.discharges.NoShowForm.InfoGridDetXmlTicket'
    ],
    title: 'Ticket XML-Sabre',
    width: 850,
    height: 550,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id04 + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    border: true,
                    margin: '3 3 3 3',
                    width: 840,
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '0 0 0 0',
                            border: false,
                            defaults: {
                                margin: '2 2 2 2'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935CCIA',
                                    fieldLabel: 'Ticket', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 80,
                                    width: 120, fieldStyle: 'font-size:12px;text-align:center',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-TICKET_NUMBER',
                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 2,
                                    width: 110, fieldStyle: 'font-size:12px;text-align:left',
                                    padding: '0 0 0 2',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935SEQ',
                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 2,
                                    padding: '0 0 0 5',
                                    width: 30, fieldStyle: 'font-size:12px;text-align:left',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935TCPNS',
                                    fieldLabel: 'T. Cpns', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                    width: 90, fieldStyle: 'font-size:12px;text-align:right',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935FLAG',
                                    fieldLabel: 'Cnj', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 30,
                                    //padding:'0 0 0 5',
                                    width: 80, fieldStyle: 'font-size:12px;text-align:center',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935FPROC',
                                    fieldLabel: 'Fecha', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                    width: 140, fieldStyle: 'font-size:12px;text-align:center',
                                    readOnly: true
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '0 0 0 0',
                            border: false,
                            defaults: {
                                margin: '2 2 2 2'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935TRNCU',
                                    fieldLabel: 'Transacción', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 80,
                                    width: 140, fieldStyle: 'font-size:12px;text-align:center',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935TDOC',
                                    fieldLabel: 'T.Doc.', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 40,
                                    width: 100, fieldStyle: 'font-size:12px;text-align:center',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935AGENT',
                                    fieldLabel: 'Estación', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 55,
                                    width: 140, fieldStyle: 'font-size:12px;text-align:center',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935FECVT',
                                    fieldLabel: 'F. Venta', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 55,
                                    width: 140, fieldStyle: 'font-size:12px;text-align:center',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935PNR',
                                    fieldLabel: 'PNR', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 40,
                                    width: 120, fieldStyle: 'font-size:12px;text-align:center',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935PNRSP',
                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 2,
                                    width: 30, fieldStyle: 'font-size:12px;text-align:center',
                                    padding: '0 0 0 2',
                                    readOnly: true
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '0 0 0 0',
                            border: false,
                            defaults: {
                                margin: '2 2 2 2'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935FRESV',
                                    fieldLabel: 'F. Reserva', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 80,
                                    width: 160, fieldStyle: 'font-size:12px;text-align:center',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935CODIT',
                                    fieldLabel: 'Tour Number', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                                    width: 200, fieldStyle: 'font-size:12px;text-align:center',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935ORIG',
                                    fieldLabel: 'Origen-Destino', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                    width: 190, fieldStyle: 'font-size:12px;text-align:center',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935ITTY',
                                    fieldLabel: 'Tipo Itin.', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 80,
                                    width: 120, fieldStyle: 'font-size:12px;text-align:center',
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '0 0 0 0',
                            border: false,
                            defaults: {
                                margin: '2 2 2 2'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935PAX',
                                    fieldLabel: 'Pax', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 80,
                                    width: 300, fieldStyle: 'font-size:12px;text-align:left',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935TPAX',
                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 2,
                                    width: 40, fieldStyle: 'font-size:12px;text-align:center',
                                    readOnly: true, padding: '0 0 0 2'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935PCITY',
                                    fieldLabel: 'Work Location', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 110,
                                    width: 190, fieldStyle: 'font-size:12px;text-align:left',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935CIUVT',
                                    fieldLabel: 'Home Location', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 110,
                                    width: 150, fieldStyle: 'font-size:12px;text-align:left',
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '0 0 0 0',
                            border: false,
                            defaults: {
                                margin: '2 2 2 2'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935PSVTA',
                                    fieldLabel: 'Pais', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 80,
                                    width: 120, fieldStyle: 'font-size:12px;text-align:left',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935CPUI',
                                    fieldLabel: 'Coupon Text', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                    width: 190, fieldStyle: 'font-size:12px;text-align:center',
                                    readOnly: true, padding: '0 0 0 2'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935INCLT',
                                    fieldLabel: 'Inclusive Tran.', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                    width: 180, fieldStyle: 'font-size:12px;text-align:left',
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '0 0 0 0',
                            border: false,
                            defaults: {
                                margin: '2 2 2 2'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935ENDOR',
                                    fieldLabel: 'Endorsements', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                    width: 800, fieldStyle: 'font-size:12px;text-align:left',
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id04 + '-A3935FRCA',
                                    fieldLabel: 'Fare Calculation', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                    width: 800, fieldStyle: 'font-size:12px;text-align:left',
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id04 + 'contenedor-grid',
                            layout: 'fit',
                            width: 840,                            
                            height: 350,
                            defaults: {
                                margin: '2 2 2 2',
                                border: false
                            },
                            items: [
                                {
                                    xtype: prototype.id04 + '-infoGridDetXmlTicket'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            border: false,
            ui: 'footer',
            margin: '1 1 1 1', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id04 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id04 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id04 + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id04 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {
                    xtype: 'label',
                    labelAlign: 'center',
                    width: 150,
                    hidden: true,
                    padding: '2px 5px 2px 3px',
                    html: '<strong style="color:#AC4546;font-size:13px;">(*)Required Fields</strong>'

                }
            ]
        }
    ]
});
