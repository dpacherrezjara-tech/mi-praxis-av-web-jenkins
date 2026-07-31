Ext.define('Ext.Praxis.view.payments.DirectSalesForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDirectSalesForm',

    controller: 'DataEntryDirectSalesController',

    requires: [
        'Ext.Praxis.controller.payments.DirectSales.DataEntryDirectSalesController'
    ],

    title: 'Direct Sales Detail',
    header: true,
    height: 850,
    width: 1450,
    border: false,
    resizable: false,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    modal: true,

    defaults: {
        border: false
    },

    items: [
        {
            xtype: 'form',
            id: prototype.id + '-deForm',
            width: 830,
            autoScroll: true,
            bodyStyle: 'background-color: #F4F7FD; padding: 10px;',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-deDetail',
                    title: 'Detail',
                    margin: '0 0 8 0',
                    width: 800,
                    border: true,
                    defaults: {
                        style: 'margin: 3px;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 8 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Ccust', style: 'font-weight:bold;color:#000;', width: 78 },
                                { xtype: 'label', text: '(*)', style: 'font-weight:bold;color:red;', width: 17, autoEl: {tag: 'label', 'data-qtip': 'Primary Key - Read Only'} },
                                { xtype: 'textfield', id: prototype.id + '-deCCUST', readOnly: true, width: 90 },
                                { xtype: 'tbspacer', width: 23 },
                                { xtype: 'label', text: 'Treg', style: 'font-weight:bold;color:#000;', width: 78 },
                                { xtype: 'label', text: '(*)', style: 'font-weight:bold;color:red;', width: 17, autoEl: {tag: 'label', 'data-qtip': 'Primary Key - Read Only'} },
                                { xtype: 'textfield', id: prototype.id + '-deTREG', readOnly: true, width: 90 },
                                { xtype: 'tbspacer', width: 23 },
                                { xtype: 'label', text: 'Adate', style: 'font-weight:bold;color:#000;', width: 78 },
                                { xtype: 'label', text: '(*)', style: 'font-weight:bold;color:red;', width: 17, autoEl: {tag: 'label', 'data-qtip': 'Primary Key - Editable'} },
                                { xtype: 'textfield', id: prototype.id + '-deADATE', width: 90 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 15 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Scountry', style: 'font-weight:bold;color:#000;', width: 78 },
                                { xtype: 'label', text: '(*)', style: 'font-weight:bold;color:red;', width: 17, autoEl: {tag: 'label', 'data-qtip': 'Primary Key - Read Only'} },
                                { xtype: 'textfield', id: prototype.id + '-deSCOUNTRY', readOnly: true, width: 90 },
                                { xtype: 'tbspacer', width: 23 },
                                { xtype: 'label', text: 'Sagent', style: 'font-weight:bold;color:#000;', width: 78 },
                                { xtype: 'label', text: '(*)', style: 'font-weight:bold;color:red;', width: 17, autoEl: {tag: 'label', 'data-qtip': 'Primary Key - Read Only'} },
                                { xtype: 'textfield', id: prototype.id + '-deSAGENT', readOnly: true, width: 90 },
                                { xtype: 'tbspacer', width: 23 },
                                { xtype: 'label', text: 'Scurrency', style: 'font-weight:bold;color:#000;', width: 78 },
                                { xtype: 'label', text: '(*)', style: 'font-weight:bold;color:red;', width: 17, autoEl: {tag: 'label', 'data-qtip': 'Primary Key - Read Only'} },
                                { xtype: 'textfield', id: prototype.id + '-deSCURRENCY', readOnly: true, width: 90 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 15 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Cbatch', style: 'font-weight:bold;color:#000;', width: 78 },
                                { xtype: 'label', text: '(*)', style: 'font-weight:bold;color:red;', width: 17, autoEl: {tag: 'label', 'data-qtip': 'Primary Key - Read Only'} },
                                { xtype: 'textfield', id: prototype.id + '-deCBATCH', readOnly: true, width: 90 },
                                { xtype: 'tbspacer', width: 23 },
                                { xtype: 'label', text: 'Seq', style: 'font-weight:bold;color:#000;', width: 78 },
                                { xtype: 'label', text: '(*)', style: 'font-weight:bold;color:red;', width: 17, autoEl: {tag: 'label', 'data-qtip': 'Primary Key - Read Only'} },
                                { xtype: 'textfield', id: prototype.id + '-deSEQ', readOnly: true, width: 90 },
                                { xtype: 'tbspacer', width: 23 },
                                { xtype: 'label', text: 'Status', style: 'font-weight:bold;color:#000;', width: 78 },
                                { xtype: 'tbspacer', width: 17 },
                                { xtype: 'textfield', id: prototype.id + '-deSTVAL', readOnly: true, width: 90 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Neto', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deNETO', fieldStyle: 'text-align:right', width: 90 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Payamou', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-dePAYAMOU', fieldStyle: 'text-align:right', width: 90 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Sales Date', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deSDATE', width: 90 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 15 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Reference', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deREFERENCE', width: 90 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'SFile', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deSFILE', width: 90 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Npag', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deNPAG', width: 90 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Comments', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textarea', id: prototype.id + '-deCOMMENTS', width: 675, height: 60 }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-deAuditoria',
                    title: 'Auditoria',
                    margin: '0 0 8 0',
                    width: 800,
                    border: true,
                    defaults: {
                        style: 'margin: 3px;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 15 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Creator User', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deUSCR', readOnly: true, width: 90 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Creation Date', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deFECR', readOnly: true, width: 90 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Creation Time', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deHOCR', readOnly: true, width: 90 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 15 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'User Update', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deUSUP', readOnly: true, width: 90 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Update Date', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deFEUP', readOnly: true, width: 90 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Update Time', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deHOUP', readOnly: true, width: 90 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Creation Pgm', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-dePGMCR', readOnly: true, width: 90 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Update Pgm', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-dePGMUP', readOnly: true, width: 90 }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            id: prototype.id + '-deVoucherPanel',
            width: 600,
            flex: 1,
            margin: '0 0 0 10',
            layout: 'fit',
            // iframe nativo, igual patrón que StatementReconciliations (pdfIframeVoucher)
            html: '<iframe id="pdfIframeVoucherDS" src="" width="100%" height="100%" frameborder="0" style="border:1px solid #ccc;"></iframe>'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            items: [
                {
                    text: 'Update',
                    id: prototype.id + '-deBtnUpdate',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id + '-deBtnClose',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]

});
