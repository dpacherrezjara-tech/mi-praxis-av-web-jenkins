prototype.idDErej = prototype.id + '-RejectHeaderDataEntry';

Ext.define('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.RejectHeaderDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.RejectHeaderDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.HeadersReport.RejectHeaderDataEntryController'
    ],
    controller: 'RejectHeaderDataEntryController',
    title: 'Reject Header - Form',
    header: true,
    width: 600,
    resizable: false,
    layout: 'vbox',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: {
        xtype: 'form',
        layout: {
            type: 'vbox',
            align: 'center'
        },
        border: true,
        width: '100%',
        bodyPadding: 5,
        items: [
            {
                xtype: 'label',
                text: 'Are you sure to Reject Accounting?',
                style: {
                    fontSize: '14px',
                    color: 'red',
                    fontWeight: 'bold',
                    marginTop: '10px',
                    marginBottom: '10px'
                }
            },
            {
                xtype: 'textareafield',
                id: prototype.idDErej + '-textReject',
                fieldLabel: 'Comment',
                labelStyle: 'font-weight:bold;',
                grow: true,
                width: '100%',
                height: 70,
                allowBlank: false,
                value: ''
            },
            {
                xtype: 'form',
                layout: 'hbox',
                id: prototype.idDErej + '-supportFiles',
                width: '100%',
                border: false,
                items: [
                    {
                        xtype: 'filefield',
                        id: prototype.idDErej + '-supportFileField',
                        name: 'files',
                        fieldLabel: 'Supports',
                        labelStyle: 'font-weight:bold;',
                        labelWidth: 100,
                        msgTarget: 'side',
                        allowBlank: false,
                        width: '100%',
                        buttonText: 'Select Files...',
                        listeners: {
                            afterrender: function (field) {
                                // Accedemos directamente al input para agregar atributo 'multiple'
                                field.fileInputEl.dom.setAttribute('multiple', 'multiple');
                            },
                            change: 'selectFile'
                        }
                    }
                ]
            },
            {
                xtype: 'grid',
                border: false,
                hidden:true,
                id: prototype.idDErej + '-gridSupports',
                emptyText: 'No documents available',
                width:'100%',
                maxHeight: 150,
                margin: 3,
                columns: {
                    defaults: {
                        align: 'center',
                        menuDisabled: true,
                        sortable: true
                    },
                    items: [
                        {
                            text: 'RN',
                            locked: true,
                            xtype: 'rownumberer', // Columna de número de fila
                            width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                        },
                        {text: 'File Name', dataIndex: 'FILENAM', flex: 1},
                        {
                            sortable: false,
                            xtype: 'actioncolumn',
                            width: 50,
                            text: 'Del.',
                            align: 'center',
                            items: [
                                {
                                    iconCls: 'prx-icon-image-trash',
                                    tooltip: 'Reject',
                                    handler: 'onDeleteFile'
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '5 0 5 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium',
                margin: '5 0 5 0'
            },
            items: [
                {
                    text: 'Reject',
                    iconCls: 'prx-icon-image-process',
                    listeners: {
                        click: 'onRejectClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDErej + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});