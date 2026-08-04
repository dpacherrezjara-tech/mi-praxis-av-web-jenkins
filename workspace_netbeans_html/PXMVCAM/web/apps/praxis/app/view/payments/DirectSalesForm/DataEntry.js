Ext.define('Ext.Praxis.view.payments.DirectSalesForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDirectSalesForm',

    controller: 'DataEntryDirectSalesController',

    requires: [
        'Ext.Praxis.controller.payments.DirectSales.DataEntryDirectSalesController'
    ],

    title: 'Direct Sales Detail',
    header: true,
    bodyStyle: 'background-color: #F4F7FD; padding: 10px;',
    height: 850,
    width: 1560,
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
            width: 950,
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
                    width: 930,
                    border: true,
                    defaults: {
                        style: 'margin: 3px;',
                        border: false,
                        bodyStyle: 'background-color: #F4F7FD;'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 8 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', html: 'Customer <span style="color:red;">(*)</span>', style: 'font-weight:bold;color:#000;', width: 95, autoEl: {tag: 'label', 'data-qtip': 'Primary Key'} },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-deCCUST',
                                    width: 180,
                                    allowBlank: false,
                                    queryMode: 'local',
                                    editable: true,
                                    typeAhead: true,
                                    selectOnFocus: true,
                                    autoSelect: true,
                                    caseSensitive: false,
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: '729', name: 'TAMPA'},
                                            {code: '133', name: 'LACSA'},
                                            {code: '134', name: 'AVIANCA'},
                                            {code: '202', name: 'TACA'},
                                            {code: '547', name: 'AEROGAL'}
                                        ]
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', html: 'Treg <span style="color:red;">(*)</span>', style: 'font-weight:bold;color:#000;', width: 95, autoEl: {tag: 'label', 'data-qtip': 'Primary Key'} },
                                { xtype: 'textfield', id: prototype.id + '-deTREG', allowBlank: false, readOnly: true, width: 180 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', html: 'Adate <span style="color:red;">(*)</span>', style: 'font-weight:bold;color:#000;', width: 110, autoEl: {tag: 'label', 'data-qtip': 'Primary Key'} },
                                { xtype: 'textfield', id: prototype.id + '-deADATE', allowBlank: false, maskRe: /[0-9]/, maxLength: 8, minLength: 8, enforceMaxLength: true, width: 180 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 15 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', html: 'Country <span style="color:red;">(*)</span>', style: 'font-weight:bold;color:#000;', width: 95, autoEl: {tag: 'label', 'data-qtip': 'Primary Key'} },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-deSCOUNTRY',
                                    width: 180,
                                    listConfig: {minWidth: 230},
                                    allowBlank: false,
                                    queryMode: 'local',
                                    editable: true,
                                    typeAhead: true,
                                    selectOnFocus: true,
                                    autoSelect: true,
                                    caseSensitive: false,
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    valueField: 'A006PAIS',
                                    displayField: 'A006NOMBRE'
                                },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', html: 'Agent <span style="color:red;">(*)</span>', style: 'font-weight:bold;color:#000;', width: 95, autoEl: {tag: 'label', 'data-qtip': 'Primary Key'} },
                                { xtype: 'textfield', id: prototype.id + '-deSAGENT', allowBlank: false, maxLength: 8, enforceMaxLength: true, width: 180 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', html: 'Currency <span style="color:red;">(*)</span>', style: 'font-weight:bold;color:#000;', width: 110, autoEl: {tag: 'label', 'data-qtip': 'Primary Key'} },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-deSCURRENCY',
                                    width: 180,
                                    listConfig: {minWidth: 230},
                                    allowBlank: false,
                                    queryMode: 'local',
                                    editable: true,
                                    typeAhead: true,
                                    selectOnFocus: true,
                                    autoSelect: true,
                                    caseSensitive: false,
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    valueField: 'A005KEY',
                                    displayField: 'A005KEY2'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 15 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', html: 'Cbatch <span style="color:red;">(*)</span>', style: 'font-weight:bold;color:#000;', width: 95, autoEl: {tag: 'label', 'data-qtip': 'Primary Key - Auto Generado'} },
                                { xtype: 'textfield', id: prototype.id + '-deCBATCH', readOnly: true, width: 180 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', html: 'Seq <span style="color:red;">(*)</span>', style: 'font-weight:bold;color:#000;', width: 95, autoEl: {tag: 'label', 'data-qtip': 'Primary Key - Auto Generado'} },
                                { xtype: 'textfield', id: prototype.id + '-deSEQ', readOnly: true, width: 180 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Status', style: 'font-weight:bold;color:#000;', width: 110 },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-deSTVAL',
                                    width: 180,
                                    queryMode: 'local',
                                    editable: false,
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: '1', name: 'Match'},
                                            {code: '3', name: 'Pending'},
                                            {code: '5', name: 'Match Manual'}
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', html: 'Neto <span style="color:red;">(*)</span>', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deNETO', fieldStyle: 'text-align:right', width: 180, maskRe: /[0-9.\-]/ },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Pay Amount', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-dePAYAMOU', fieldStyle: 'text-align:right', width: 180, maskRe: /[0-9.\-]/ },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', html: 'Sales Date <span style="color:red;">(*)</span>', style: 'font-weight:bold;color:#000;', width: 110, autoEl: {tag: 'label', 'data-qtip': 'Obligatorio - 8 dígitos numéricos'} },
                                { xtype: 'textfield', id: prototype.id + '-deSDATE', allowBlank: false, maskRe: /[0-9]/, maxLength: 8, minLength: 8, enforceMaxLength: true, width: 180 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 15 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Reference', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deREFERENCE', width: 180 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Npag', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deNPAG', width: 180 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'tbspacer', width: 290 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'File Name', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deSFILE', width: 675 }
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
                    width: 930,
                    border: true,
                    defaults: {
                        style: 'margin: 3px;',
                        border: false,
                        bodyStyle: 'background-color: #F4F7FD;'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 15 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Creator User', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deUSCR', readOnly: true, width: 180 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Creation Date', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deFECR', readOnly: true, width: 180 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Creation Time', style: 'font-weight:bold;color:#000;', width: 110 },
                                { xtype: 'textfield', id: prototype.id + '-deHOCR', readOnly: true, width: 180 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 15 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'User Update', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deUSUP', readOnly: true, width: 180 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Update Date', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-deFEUP', readOnly: true, width: 180 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Update Time', style: 'font-weight:bold;color:#000;', width: 110 },
                                { xtype: 'textfield', id: prototype.id + '-deHOUP', readOnly: true, width: 180 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Creation Pgm', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-dePGMCR', readOnly: true, width: 180 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Update Pgm', style: 'font-weight:bold;color:#000;', width: 95 },
                                { xtype: 'textfield', id: prototype.id + '-dePGMUP', readOnly: true, width: 180 }
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
